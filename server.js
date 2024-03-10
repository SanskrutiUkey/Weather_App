import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoute from './routes/authRoute.js';
import preferencesRoute from './routes/preferencesRoute.js';
import cityRoute from './routes/cityRoute.js';
import connectDB from './config/db.js';
import axios from 'axios';
import OneSignal from 'onesignal-node';
import preferenceModel from './models/preferenceModel.js';
import { authMiddleware } from './middleware/authMiddleware.js';

const app = express()

dotenv.config()
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
// routers

app.use(`/api/cities`, cityRoute);
app.use(`/api/auth`, authRoute);
app.use(`/api/preferences`, preferencesRoute);


// List of cities selected by the user (replace with actual data)

const oneSignalClient = new OneSignal.Client({
    // userAuthKey: process.env.ONE_SIGNAL_USER_AUTH_KEY,
    app: { appAuthKey: process.env.ONE_SIGNAL_APP_AUTH_KEY, appId: process.env.ONE_SIGNAL_APP_ID }
});

// Function to fetch weather updates for multiple cities
export const fetchWeatherUpdatesForCities = async () => {

    try {
        // const response = await axios.get(`http://localhost:8080/api/cities/get-cities/${userId}`);

        // // Extract cities array from response data
        // const cities = response.data.getAllCity.map(cityData => cityData.city);

        const cities = ['New York', 'London', 'Paris', 'Tokyo'];
        const userId = '65eb2b384691c5f58c3334a4';
        // Iterate over each city
        for (const city of cities) {
            // Make GET request to weather API endpoint for the current city
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${encodeURIComponent(city)}`);

            // Extract relevant data from API response
            const { temp_c, humidity, condition } = response.data.current;

            // Process and use the weather data as needed (e.g., update application state or database)
            console.log(`Weather in ${city}:`);
            console.log('Temperature:', temp_c, '°C');
            console.log('Humidity:', humidity, '%');
            console.log('Condition:', condition.text);
            console.log('---------------------');

            await compareWeatherWithPreferences(userId, city, condition.text)
        }
    } catch (error) {
        console.error('Error fetching weather updates:', error);
    }
}

export const compareWeatherWithPreferences = async (userId, city, weather) => {
    try {
        // Fetch all user preferences for the given city and weather
        const userPreferences = await preferenceModel.find({ user: userId, city, weather });

        // Iterate over each preference
        for (const preference of userPreferences) {
            const notification = new OneSignal.Notification({
                contents: {
                    en: `Weather alert: ${weather} in ${city}`
                },
                include_player_ids: [preference.userPlayerId] // User's OneSignal player ID
            });

            // Send notification
            const response = await oneSignalClient.createNotification(notification);
            console.log('Notification sent:', response.body);


        }
    } catch (error) {
        console.error('Error comparing weather updates with preferences:', error);
    }
}


// Schedule polling function to run every 15 minutes (900,000 milliseconds)
// setInterval(fetchWeatherUpdatesForCities(), 2400000);

// Schedule polling function to run every 15 minutes (900,000 milliseconds)
setInterval(() => {
    fetchWeatherUpdatesForCities()
        .then(() => {
            console.log('Weather updates fetched successfully');
        })
        .catch((error) => {
            console.error('Error fetching weather updates:', error);
        });
}, 2400000);




const PORT = process.env.PORT || 8080
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`${process.env.DEV_MODE} Running on Server  ${PORT}`);
    })

})