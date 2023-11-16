const redis = require("redis");
const RedisStore = require("connect-redis").default;
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});

redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
    client: redisClient,
});

const sessionConfig = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    },
    store: redisStore
};

module.exports = sessionConfig;
