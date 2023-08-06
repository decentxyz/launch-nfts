import { createClient } from 'redis';

export const RedisClient = createClient({
    password: process.env.REDIS_PASSWORD as string,
    socket: {
        host: process.env.REDIS_HOST as string,
        port: 17996
    }
});