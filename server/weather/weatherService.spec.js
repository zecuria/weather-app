jest.mock('node-fetch');
const fetch = require('node-fetch');

describe('weatherService', () => {
    let weatherService;
    let response;

    const description = '-val-desc';
    const weatherData = {
        weather: [{ description }]
    };
    const weatherParams = { country: '-val-country', city: '-val-city'}

    beforeAll(() => {
        response = {
            ok: true,
            status: 200,
            json: jest.fn(() => Promise.resolve(weatherData)),
        };

        fetch.mockImplementation(() => response);
        weatherService = require('./weatherService');
    });

    it('should return a status of 200 with description when the response is valid', async () => {
        const { status, message } = await weatherService.getWeather(weatherParams);
        expect(status).toBe(200);
        expect(message).toBe(description);
    });

    it('should return a status of 404 with description when not found response is returned', async () => {
        response.ok = false;
        response.status = 404;

        const { status, message } = await weatherService.getWeather(weatherParams);
        expect(status).toBe(404);
        expect(message).not.toBeFalsy();
    });

    it('should return a status of 500 with message when invalid response is returned', async () => {
        response.ok = false;
        response.status = 500;

        const { status, message } = await weatherService.getWeather(weatherParams);
        expect(status).toBe(500);
        expect(message).not.toBeFalsy();
    })
});