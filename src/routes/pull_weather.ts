import express from 'express';
import { Weather } from '../entities/Weather';
import { promises as fs } from 'fs';
import { WeatherDataSource } from '../repository/weather_repository';
//import path from 'path';

const router = express.Router();

router.get('/api/weather', async (req, res) => {
    /*const myHeaders = new Headers();
    const key = `${process.env.API_KEY}`
    myHeaders.append("Authorization", "Bearer " + key);
    myHeaders.append("Cookie", "ss-id=XAsctJRAnbRXj3ONapR7; ss-opt=temp; ss-pid=17kqMzeaycMxGNUf5gwU");

    const apiUrl = "https://api.solcast.com.au/data/live/radiation_and_weather?latitude=-33.856784&longitude=151.215297&output_parameters=air_temp,dni,ghi&format=json"
    const requestOptions: RequestInit = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(apiUrl, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

    const response = await fetch(apiUrl);
    
    if (!response.ok) {
        return res.status(response.status).json({ error: `API request failed with status ${response.status}` });
    }*/

    //const filePath = path.join(__dirname, 'data', 'weather.json');
    const response = await fs.readFile('weather.json', 'utf-8');
    let weatherData = JSON.parse(response);

    if (!Array.isArray(weatherData.estimated_actuals)) {
        return res.status(400).json({ error: 'Invalid data format' });
    }

    const weatherEntities = weatherData.estimated_actuals.map((actual: any) => {
        return Weather.create({
            air_temp: actual.air_temp,
            dni: actual.dni,
            ghi: actual.ghi,
            period_end: actual.period_end,
            period: actual.period,
        });
    });

    const weatherRepository = WeatherDataSource.getRepository(Weather);
    let savedWeather = await weatherRepository.save(weatherEntities);
    console.log('Saved weather: ', savedWeather);

    return res.json(weatherData);
});

export { router as fetchWeatherRouter };
