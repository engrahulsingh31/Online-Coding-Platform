const { createClient } = require("redis");

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-18472.c74.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 18472
    }
});
module.exports=redisClient