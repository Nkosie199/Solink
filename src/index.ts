import { createConnection } from 'typeorm';
import express from 'express';
import { fetchWeatherRouter } from './routes/pull_weather';
import dotenv from 'dotenv';
import { Weather } from './entities/Weather';
import axios from 'axios';
dotenv.config()

const app = express();

const main = async () => {
	try {
		await createConnection({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: `${process.env.USER}`,
			password: `${process.env.PASS}`,
			database: `${process.env.DB}`,
			entities: [Weather],
			synchronize: true,
		});
		console.log('Connected to Postgres');

		app.use(express.json());

		app.use(fetchWeatherRouter);

		app.listen(8080, () => {
			console.log('Now running on port 8080');
		});

		const interval: number = parseInt(process.env.INT ?? '3600000', 10);

		setInterval(async () => {
			try {
				const response = await axios.get(`http://localhost:8080/api/weather`);
				console.log('Weather data processed:', response.data);
			} catch (error) {
				console.error('Error processing weather data:', error.message);
			}
		}, interval); // 60 minutes in milliseconds = 3600000
	} catch (error) {
		console.error(error);
		throw new Error('Unable to connect to db');
	}
};

main();
