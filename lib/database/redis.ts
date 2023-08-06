import Redis, { RedisOptions } from 'ioredis';

const redisOptions: RedisOptions = {
  host: 'localhost',
  port: 6379,
};

const redisClient = new Redis(redisOptions);

export default redisClient;
