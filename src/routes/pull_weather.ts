import express from 'express';
import { Weather } from '../entities/Weather';
import { WeatherDataSource } from '../repository/weather_repository';
import { WeatherData } from '../types/weather_data';

const router = express.Router();

router.get('/api/weather', async (req, res) => {
    const myHeaders = new Headers();
    const key = `${process.env.API_KEY}`
    myHeaders.append("Authorization", "Bearer " + key);

    const latitude = `${process.env.LAT}`;
    const longitude = `${process.env.LON}`;
    const apiUrl = "https://api.solcast.com.au/data/live/radiation_and_weather"
        + "?latitude=" + latitude
        + "&longitude=" + longitude
        + "&output_parameters=air_temp,dni,ghi"
        + "&format=json"
    const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    const weatherData: WeatherData = await fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .catch((error) => console.error(error));

    if (!Array.isArray(weatherData?.estimated_actuals)) {
        return res.status(400).json({ error: 'Invalid data format' });
    }

    const weatherEntities = weatherData?.estimated_actuals.map((actual: any) => {
        return Weather.create({
            air_temp: actual.air_temp,
            dni: actual.dni,
            ghi: actual.ghi,
            period_end: actual.period_end,
            period: actual.period,
        });
    });

    const weatherRepository = WeatherDataSource.getRepository(Weather);
    await weatherRepository.save(weatherEntities);

    return res.json(weatherData);
});

export { router as fetchWeatherRouter };
