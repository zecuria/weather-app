const getApiKeyManager = ({ keys, limit }) => {
    const apiKeyCache = {}

    keys.forEach(
        (key) => {
            apiKeyCache[key] = { requestCount: 0, resetTime: 0 }
        }
    );

    const { requestLimit, timeLimit } = limit;

    const isRateLimitResetDue = (key, timestamp) => {
        const { resetTime } = apiKeyCache[key];

        return timestamp > resetTime;
    };

    const isApiKeyValid = (key) => Boolean(apiKeyCache[key]);

    const isApiKeyLimitReached = (key, timestamp) => {
        if (isRateLimitResetDue(key, timestamp)) {
            return false;
        }
        const { requestCount } = apiKeyCache[key];

        return requestCount >= requestLimit;
    };

    const useApiKey = (key, timeStamp) => {
        const { requestCount } =  apiKeyCache[key];

        if(isRateLimitResetDue(key, timeStamp)){
            apiKeyCache[key] = { requestCount: 1, resetTime: timeStamp + timeLimit };
        }

        apiKeyCache[key] = {
            ...apiKeyCache[key],
            requestCount: requestCount + 1
        };
    }

    const getApiKeyLimit = key => apiKeyCache[key];

    return {
        isApiKeyValid,
        isApiKeyLimitReached,
        useApiKey,
        getApiKeyLimit,
    };
};

module.exports = getApiKeyManager;
