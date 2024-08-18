const session = require('express-session');
const Redis = require('ioredis');
const RedisStore = require('connect-redis').default; // Import the RedisStore correctly

export default function sessionConfig(){
    const redisClient = new Redis({
        host:process.env.DB_HOST || 'localhost',
        port: 6379
    })
    const store = new RedisStore({client: redisClient})

    const sessionClient = {
        store: store, // No `new` keyword needed in v7.x
        secret: process.env.SESSION_SECRET || 'fallback_secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    }
return session(sessionClient)
};