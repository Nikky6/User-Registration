const redis = require('redis');
const dotenv = require('dotenv').config();
const port = process.env.REDIS_PORT

const redisClient = redis.createClient({ port });

redisClient.on("error", (err) => console.log("Redis Client Error", err));

module.exports = redisClient