import "reflect-metadata";
import { DataSource } from 'typeorm';
import { Weather } from '../entities/Weather';

export const WeatherDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: `${process.env.USER}`,
    password: `${process.env.PASS}`,
    database: 'typeorm',
    synchronize: true,
    logging: true,
    entities: [Weather],
    migrations: [],
    subscribers: [],
});

WeatherDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
