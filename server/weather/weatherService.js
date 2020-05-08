const fetch = require('node-fetch');

const { WEATHER_API_KEY } = process.env;

const getWeather = async ({ country, city }) => {
    if(!WEATHER_API_KEY) {
        throw Error('Missing weather-service API Key, see Setup in README');
    }

    const url = new URL('https://api.openweathermap.org/data/2.5/weather')
    url.searchParams.append('APPID', WEATHER_API_KEY);
    url.searchParams.append('q', `${city},${country}`);

    const response = await fetch(url.href);

    if (!response.ok) {
        if (response.status === 404) { 
            return { status: response.status, message: 'Could not find city / country' }
        }

        return { status: 500, message: 'Something went wrong, please try again later.'}
    }

    const data = await response.json();
    const description = data.weather[0].description

    return { status: 200, message: description };
}

module.exports = {
    getWeather,
};
