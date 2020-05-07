const apiKeyMiddleware = require('./apiKeyMiddleware');

describe('apiKeyMiddleware', () => {
    let apiKey = 'abcde'
    let limit = { requestLimit: 1, resetTime: 10000}
    let reqMock, resMock, nextMock;

    beforeEach(() => {
        reqMock = {
            query: {
                apiKey
            }
        };
        
        resMock = {
            status: jest.fn(),
            set: jest.fn(),
            json: jest.fn(),
        };

        nextMock = jest.fn();
    });

    it('should give a 401 status response when provided no apiKey query', () => {
        const middelware = apiKeyMiddleware([apiKey], limit);

        reqMock.query = {};
        middelware(reqMock, resMock, nextMock)

        expect(resMock.status).toHaveBeenCalledWith(401)
        expect(resMock.json).toHaveBeenCalled()
    });

    it('should give a 401 response when provided with an invalid apiKey', () => {
        const middelware = apiKeyMiddleware([apiKey], limit);

        reqMock.query.apiKey = '12345';
        middelware(reqMock, resMock, nextMock)

        expect(resMock.status).toHaveBeenCalledWith(401)
        expect(resMock.json).toHaveBeenCalled()
    });

    it('should give a 403 response with rate headers when rate limit has been exceeded', () => {
        const middelware = apiKeyMiddleware(
            [apiKey],
            limit,
        );

        middelware(reqMock, resMock, nextMock)
        // run second time to go over limit
        middelware(reqMock, resMock, nextMock)

        expect(resMock.status).toHaveBeenCalledWith(403);

        expect(resMock.set).toHaveBeenCalled();
        expect(resMock.set.mock.calls[1][0]).toHaveProperty('X-Rate-Limit-Limit');
        expect(resMock.set.mock.calls[1][0]).toHaveProperty('X-Rate-Limit-Remaining');
        expect(resMock.set.mock.calls[1][0]).toHaveProperty('X-Rate-Limit-Reset');

        expect(resMock.json).toHaveBeenCalled()
    });

    it('should add rate headers and call next when valid apiKey is provided', () => {
        const middelware = apiKeyMiddleware([apiKey], limit);

        middelware(reqMock, resMock, nextMock)

        expect(resMock.set).toHaveBeenCalled();
        expect(resMock.set.mock.calls[0][0]).toHaveProperty('X-Rate-Limit-Limit');
        expect(resMock.set.mock.calls[0][0]).toHaveProperty('X-Rate-Limit-Remaining');
        expect(resMock.set.mock.calls[0][0]).toHaveProperty('X-Rate-Limit-Reset');

        expect(nextMock).toHaveBeenCalled();
    });
});