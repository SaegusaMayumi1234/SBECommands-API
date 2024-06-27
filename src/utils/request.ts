import axios from 'axios';
import { setupCache, buildStorage, buildMemoryStorage, canStale } from 'axios-cache-interceptor';
import { client } from '../storages/redis/redis';
import config from '../config/config';

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
              expire += value.ttl!;
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

export default {
  getMojang(uuid: string) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const res = await cachedAxios({
            url: `https://playerdb.co/api/player/minecraft/${uuid}`,
            method: 'GET',
            cache: {
              ttl: config.axiosCache.mojangTTL,
            },
          });
          return resolve({
            uuid: res.data.data.player.raw_id,
            username: res.data.data.player.username,
          });
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
          return resolve({
            uuid: res.data.uuid.replace(/-/g, ''),
            username: res.data.username,
          });
        } catch (error) {
          return reject(error);
        }
      })();
    });
  },
  getHypixelPlayer(uuid: string) {
    return cachedAxios({
      url: `https://api.hypixel.net/v2/player?uuid=${uuid}`,
      method: 'GET',
      cache: {
        ttl: config.axiosCache.hypixelTTL,
      },
      headers: {
        'API-Key': config.apikey,
      },
    });
  },
  getHypixelSkyblockProfiles(uuid: string) {
    return cachedAxios({
      url: `https://api.hypixel.net/v2/skyblock/profiles?uuid=${uuid}`,
      method: 'GET',
      cache: {
        ttl: config.axiosCache.hypixelTTL,
      },
      headers: {
        'API-Key': config.apikey,
      },
    });
  },
  getHypixelSkyblockMuseum(profileId: string) {
    return cachedAxios({
      url: `https://api.hypixel.net/v2/skyblock/museum?profile=${profileId}`,
      method: 'GET',
      cache: {
        ttl: config.axiosCache.hypixelTTL,
      },
      headers: {
        'API-Key': config.apikey,
      },
    });
  },
  getHypixelGuild(uuid: string) {
    return cachedAxios({
      url: `https://api.hypixel.net/v2/guild?player=${uuid}`,
      method: 'GET',
      cache: {
        ttl: config.axiosCache.hypixelTTL,
      },
      headers: {
        'API-Key': config.apikey,
      },
    });
  },
};
