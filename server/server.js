require('./env');
const http = require('http');
const express = require('express');
const keys = require('./keys');
const apiKeyMiddleware = require('./apiKeyMiddleware/apiKeyMiddleware');

const weatherRouter = require('./weather/weatherRouter');

const router = express();
const server = http.createServer(router);

const { PORT = 3001 } = process.env;

const apiKeyRateLimits = {
    requestLimit: process.env.RATE_LIMIT_REQUESTS || 5,
    timeLimit: process.env.RATE_LIMIT_TIME || 60*60*1000
};

const apiKeyRateLimiter = apiKeyMiddleware(keys, apiKeyRateLimits)

router.get('/weather/:country/:city', apiKeyRateLimiter, weatherRouter);

server.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}...`)
});