const getApiKeyManager = require('./getApiKeyManager');

describe('getApiKeyManager', () => {
    const apiKey = 'stub_key'
    const keys = [apiKey]
    let limit = { requestLimit: 1, timeLimit: 1 }

    describe('isApiKeyValie', () => {
        const { isApiKeyValid } = getApiKeyManager({ keys, limit });

        it('should return true if key is valid', () => {
            const result = isApiKeyValid(apiKey);
            expect(result).toBe(true);
        });

        it('should return false if key is not valid', () => {
            const result = isApiKeyValid('invalid_key');
            expect(result).toBe(false);
        });
    });

    describe('isApiKeyLimitReached', () => {
        it('should return true if the api key limit has been reached', () => {
            const { isApiKeyLimitReached } = getApiKeyManager({
                keys,
                limit: { ...limit, requestLimit: 0 },
            });

            const result = isApiKeyLimitReached(apiKey, 0);
            expect(result).toBe(true);
        });

        it('should return false if the api key limit has not been reached', () => {
            const { isApiKeyLimitReached } = getApiKeyManager({
                keys,
                limit: { ...limit, requestLimit: 1 },
            });

            const result = isApiKeyLimitReached(apiKey, 0);
            expect(result).toBe(false);
        });

        it('should return false if the rate limit is to be reset.', () => {
            const { isApiKeyLimitReached } = getApiKeyManager({
                keys,
                limit,
            });

            const result = isApiKeyLimitReached(apiKey, 1);
            expect(result).toBe(false);
        });
    });

    describe('getApiKeyLimit', () => {
        it('should get the current key limit for the ApiKey', () => {
            const { getApiKeyLimit } = getApiKeyManager({ keys, limit });

            expect(getApiKeyLimit(apiKey)).toEqual({
                requestCount: 0,
                resetTime: 0
            });
        });
    });

    describe('useApiKey', () => {
        it('should increase request count when useApiKey is called', () => {
            const { getApiKeyLimit, useApiKey } = getApiKeyManager({ keys, limit });

            useApiKey(apiKey, 2);

            expect(getApiKeyLimit(apiKey)).toEqual({
                requestCount: 1,
                resetTime: 3,
            });
        });
    })
});