const weatherService = require('./weatherService');

const getWeather = async (req, res, next) => {
    const { country, city } = req.params;

    const { status, message } = await weatherService.getWeather({
        country,
        city
    });

    res.status(status);
    res.json({
        message,
    });
};

module.exports = getWeather;