const { BASE_URL = "http://localhost:3000/weather" } = process.env;

const getWeather = async ({ city, country, apiKey }) => {
    const url = new URL(`${BASE_URL}/${country}/${city}`);
    url.searchParams.append('apiKey', apiKey);

    const response = await fetch(url.href);
    const data = await response.json();

    return { success: response.ok, message: data.message }
}

export default getWeather;