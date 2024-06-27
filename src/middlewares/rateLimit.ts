import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';

import { client } from '../storages/redis/redis';
import config from '../config/config';

export function createRateLimit(key: string, maxRateLimit: number) {
  return rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: maxRateLimit,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      status: 429,
      reason: 'Too many requests, please try again later.',
      code: 'PARTIAL_RATE_LIMITED',
      global: false,
    },
    store: new RedisStore({
      sendCommand: (...args) => client.sendCommand(args),
      prefix: `rl:${key}`,
    }),
  });
}

export const generalSBECommands = createRateLimit('generalsbecommands', config.rateLimit.generalSBECommands);

export const pcheckSBECommands = createRateLimit('pchecksbecommands', config.rateLimit.pcheckSBECommands);
