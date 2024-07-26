import axios from 'axios';
import { setupCache, buildStorage, buildMemoryStorage, canStale } from 'axios-cache-interceptor';
import { client } from '../storages/redis/redis';
import config from '../config/config';
import ApiError from './apiError';
import httpStatus from 'http-status';

const cachedAxios = setupCache(axios.create(), {
  ttl: 60000, // 1 minutes for default
  interpretHeader: false,
  storage:
    !config.redis || config.redis === ''
      ? buildMemoryStorage()
      : buildStorage({
          async set(key, value, currentRequest) {
            let expire = new Date().getTime();
            if (value.state === 'loading') {
              if (currentRequest?.cache && typeof currentRequest?.cache?.ttl === 'number') {
                expire += currentRequest.cache.ttl;
              } else {
                expire += 60 * 1000; // otherwise set to 1 minute for fail safe
              }
            } else if ((value.state === 'stale' && value.ttl) || (value.state === 'cached' && !canStale(value))) {
              expire = value.createdAt + value.ttl!;
            } else {
              expire += 60 * 1000; // otherwise set to 1 minute for fail safe
            }
            await client.set(`axios-cache-${key}`, JSON.stringify(value), {
              PXAT: expire,
            });
          },
          async find(key) {
            return client.get(`axios-cache-${key}`).then((result) => result && JSON.parse(result));
          },
          async remove(key) {
            await client.del(`axios-cache-${key}`);
          },
        }),
});

const getHypixelAPIError = function getHypixelAPIError(error: any): ApiError {
  if (error.response.status === 404) {
    return new ApiError(httpStatus.NOT_FOUND, 'The requested resource does not exist', 'RESOURCE_NOT_FOUND_HYPIXEL');
  } else if (error.response.status === 429) {
    return new ApiError(
      httpStatus.TOO_MANY_REQUESTS,
      'Getting rate limited while trying to request data from hypixel API',
      'GLOBAL_RATE_LIMITED_HYPIXEL',
      { global: true },
    );
  } else if (error.response.status === 502) {
    return new ApiError(
      httpStatus.BAD_GATEWAY,
      'Hypixel API is currently experiencing some technical issues, try again later',
      'BAD_GATEWAY_HYPIXEL',
    );
  } else if (error.response.status === 503 || error.response.status === 521) {
    return new ApiError(httpStatus.SERVICE_UNAVAILABLE, 'Hypixel API is currently in maintenance mode, try again later', 'BAD_GATEWAY_HYPIXEL');
  } else if (error.response.status === 504) {
    return new ApiError(httpStatus.GATEWAY_TIMEOUT, 'Getting timed out while trying to request data from hypixel API', 'TIMED_OUT_HYPIXEL');
  } else {
    return new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Unknown error occured while trying to request data from hypixel API', 'UNKNOWN_ERROR');
  }
};

export default {
  async getMojang(uuid: string) {
    try {
      const res = await cachedAxios({
        url: `https://playerdb.co/api/player/minecraft/${uuid}`,
        method: 'GET',
        cache: {
          ttl: config.axiosCache.mojangTTL,
        },
      });
      return {
        uuid: res.data.data.player.raw_id,
        username: res.data.data.player.username,
      };
    } catch (error) {
      /* empty */
    }
    try {
      const res = await cachedAxios({
        url: `https://api.ashcon.app/mojang/v2/user/${uuid}`,
        method: 'cachedAxios',
        cache: {
          ttl: config.axiosCache.mojangTTL,
        },
      });
      return {
        uuid: res.data.uuid.replace(/-/g, ''),
        username: res.data.username,
      };
    } catch (error: any) {
      if (error.response.status === 400) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.response.data.reason, 'INVALID_USER_FORMAT_ASHCON_MOJANG', { details: { uuid } });
      } else if (error.response.status === 404) {
        throw new ApiError(httpStatus.NOT_FOUND, error.response.data.reason, 'USER_NOT_FOUND_ASHCON_MOJANG', { details: { uuid } });
      } else if (error.response.status === 429) {
        throw new ApiError(
          httpStatus.TOO_MANY_REQUESTS,
          'Getting rate limited while trying to request data from ashcon API',
          'GLOBAL_RATE_LIMITED_ASHCON_MOJANG',
          { global: true },
        );
      } else if (error.response.status === 502) {
        throw new ApiError(
          httpStatus.BAD_GATEWAY,
          'Ashcon API is currently experiencing some technical issues, try again later',
          'BAD_GATEWAY_ASHCON_MOJANG',
        );
      } else if (error.response.status === 504) {
        throw new ApiError(httpStatus.GATEWAY_TIMEOUT, 'Getting timed out while trying to request data from ashcon API', 'TIMED_OUT_ASHCON_MOJANG');
      }
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Unknown error occured while trying to request data from ashcon API', 'UNKNOWN_ERROR');
    }
  },
  async getHypixelPlayer(uuid: string) {
    try {
      const response = await cachedAxios({
        url: `https://api.hypixel.net/v2/player?uuid=${uuid}`,
        method: 'GET',
        cache: {
          ttl: config.axiosCache.hypixelTTL,
        },
        headers: {
          'API-Key': config.apikey,
        },
      });
      return response.data;
    } catch (error: any) {
      throw getHypixelAPIError(error);
    }
  },
  async getHypixelSkyblockProfiles(uuid: string) {
    try {
      const response = await cachedAxios({
        url: `https://api.hypixel.net/v2/skyblock/profiles?uuid=${uuid}`,
        method: 'GET',
        cache: {
          ttl: config.axiosCache.hypixelTTL,
        },
        headers: {
          'API-Key': config.apikey,
        },
      });
      return response.data;
    } catch (error: any) {
      throw getHypixelAPIError(error);
    }
  },
  async getHypixelSkyblockMuseum(profileId: string) {
    try {
      const response = await cachedAxios({
        url: `https://api.hypixel.net/v2/skyblock/museum?profile=${profileId}`,
        method: 'GET',
        cache: {
          ttl: config.axiosCache.hypixelTTL,
        },
        headers: {
          'API-Key': config.apikey,
        },
      });
      return response.data;
    } catch (error: any) {
      throw getHypixelAPIError(error);
    }
  },
  async getHypixelGuild(uuid: string) {
    try {
      const response = await cachedAxios({
        url: `https://api.hypixel.net/v2/guild?player=${uuid}`,
        method: 'GET',
        cache: {
          ttl: config.axiosCache.hypixelTTL,
        },
        headers: {
          'API-Key': config.apikey,
        },
      });
      return response.data;
    } catch (error: any) {
      throw getHypixelAPIError(error);
    }
  },
};
