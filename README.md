Solink Weather App

The goal of this application is to:
1. Pull in live radiation and weather data (irradiance and temperature) from the Solcast API [https://docs.solcast.com.au/]
at 60 minute intervals.
2. Save the pulled data into a PostgreSQL data using TypeOrm to write to the database

## Prerequisites
- Postgress SQL database running locally

Top setup:
1. Create a .env file in yout root directory which looks as follows:
```bash
DB=database_name
USER=postgres_username
PASS=postgres_password
API_KEY=solcast_api_key
LAT=latitde_coordinate
LON=longitute_coordinate
INT=inverval_in_milliseconds
```
2. Create a Postgress database named the same as you ```database_name``` above that you will use
for the purpose of storing weather data 

To intall and run:
1. ```npm install```
2. ```yarn start```

To view results:
1. Download PGAdmin 4 [https://www.postgresql.org/ftp/pgadmin/pgadmin4/v8.9/windows/] (Windows)
or Postico [https://eggerapps.at/postico/] (Mac) 
2. Connect to your progress database to view your tables
3. Use the following SQL query to view your results
```bash
SELECT * FROM Weather
```

If all is set up correctly, you server will process to pull in live radiation and weather data
at regular intervals and store this data in your specified database.

If you wish to test the endpoint, you can visit it on http://localhost:8080/api/weather
and inspect your terminal to see the pulled data which has been inserted to the database.

Enjoy!