import redis from 'redis';
import config from '../../config/config';

export const client = redis.createClient({
  url: config.redis,
});

client.on('ready', () => {
  console.log('redis is now ready!');
});
