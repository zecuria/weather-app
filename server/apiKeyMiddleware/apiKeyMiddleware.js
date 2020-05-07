const getApiKeyManager = require('./getApiKeyManager')

const apiKeyMiddleware = (keys, limit) => {
    const {
        useApiKey,
        isApiKeyLimitReached,
        isApiKeyValid,
        getApiKeyLimit
    } = getApiKeyManager({ keys, limit });

    const getLimitHeaders = (apiKey) => {
        const { requestCount, resetTime } = getApiKeyLimit(apiKey);

        return {
            'X-Rate-Limit-Limit': limit.requestLimit,
            'X-Rate-Limit-Remaining': limit.requestLimit - requestCount,
            'X-Rate-Limit-Reset': resetTime,
        };
    }

    const middelware = (req, res, next) => {
        const apiKey = req.query.apiKey;
        const timeStamp = Date.now();

        if(!apiKey) {
            res.status(401)
            res.json({
                message: 'No API key provided.'
            });
            return;
        }

        if (!isApiKeyValid(apiKey)) {
            res.status(401);
            res.json({
                message: 'Unkown API key provided, please check your API key.'
            });
            return;
        }

        if(isApiKeyLimitReached(apiKey, timeStamp)) {
            res.status(403);
            res.set(getLimitHeaders(apiKey));

            res.json({
                message: 'The API rate limit has been exceeded.'
            });
            return;
        }

        useApiKey(apiKey, timeStamp);

        res.set(getLimitHeaders(apiKey));
        next();
    };

    return middelware;
};

module.exports = apiKeyMiddleware;