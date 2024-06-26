import redis from 'redis';
import config from '../../config/config';
import logger from '../../utils/logger';

export const client = redis.createClient({
  url: config.redis,
});

client.on('ready', () => {
  logger.info('redis is now ready!');
});
