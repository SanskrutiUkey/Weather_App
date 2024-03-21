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
import webpush from 'web-push';
import subscriptionModel from './models/subscriptionModel.js';
// import { userrId } from './middleware/authMiddleware.js';
import { userrId } from './controller/authController.js';
import path from 'path-browserify';
const app = express()

dotenv.config()
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

// routers
app.use(`/api/auth`, authRoute);
app.use(`/api/cities`, cityRoute);
app.use(`/api/preferences`, preferencesRoute);
console.log("userrId ", userrId);


// Configure web-push with your VAPID keys
const vapidKeys = {
    publicKey: `${process.env.PUBLIC_KEY}`,
    privateKey: `${process.env.PRIVATE_KEY}`
};

webpush.setVapidDetails('mailto:sanskrutiukey@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey);

app.post('/subscribea', async (req, res, next) => {
    try {
        // Create a new subscription
        let userId = userrId.toString();
        console.log("req.body ", req.body)
        const { subscription } = req.body; // Extract subscription and user ID from request body
        const { endpoint, keys } = subscription
        // Save subscription details along with the user ID in your database
        await subscriptionModel.create({ user: userId, endpoint, keys });


        // Send a test notification to the new subscriber
        const options = {
            TTL: 360 // Time-to-live for notification
        };
        await webpush.sendNotification(subscription, JSON.stringify({
            title: `Alert`,
            body: 'Details about the weather alert...',
        }), options);

        res.sendStatus(201); // Subscription created successfully
    } catch (error) {
        console.error('Error subscribing:', error);
        res.sendStatus(500); // Internal server error
    }
});

export const fetchWeatherUpdatesForCities = async () => {
    try {
        let userId = userrId.toString();
        console.log("userId ", userId);
        const response = await axios.get(`http://localhost:8080/api/cities/get-cities/${userId}`);
        const cities = response.data.getAllCity.map(cityData => cityData.city);

        for (const city of cities) {
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${encodeURIComponent(city)}`);
            const { temp_c, humidity, condition } = response.data.current;

            console.log(`Weather in ${city}:`);
            console.log('Temperature:', temp_c, '°C');
            console.log('Humidity:', humidity, '%');
            console.log('Condition:', condition.text);
            console.log('---------------------');

            await compareWeatherWithPreferences(userId, city)

        }
    } catch (error) {
        console.error('Error fetching weather updates:', error);
    }
}
setInterval(() => {
    fetchWeatherUpdatesForCities()
        .then(() => {
            console.log('Weather updates fetched successfully');
        })
        .catch((error) => {
            console.error('Error fetching weather updates:', error);
        });
}, 60000);



export const compareWeatherWithPreferences = async (userId, city) => {
    try {
        console.log("userId ", userId);
        console.log("city ", city);

        const userPreferences = await preferenceModel.find({ user: userId, city });

        console.log("userPreferences ", userPreferences);
        for (const preference of userPreferences) {
            // Create the notification payload
            const subscription = await subscriptionModel.findOne({ user: preference.user });
            console.log("subscription ", subscription);

            if (!subscription || !subscription.endpoint) {
                console.error('Invalid subscription: missing endpoint');
                continue
            }
            const payload = JSON.stringify({
                title: `Alert`,
                body: 'Details about the weather alert...',
            });

            // // Send the notification to the client
            // await webpush.sendNotification(preference.subscription, payload);
            // console.log('Notification sent to user:', preference.user);
            try {
                await webpush.sendNotification(subscription, payload);
                console.log('Notification sent to user:', preference.user);
            } catch (error) {
                console.error('Error sending notification:', error);
            }

        }
    } catch (error) {
        console.error('Error comparing weather updates with preferences:', error);
    }
}

const PORT = process.env.PORT || 8080
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`${process.env.DEV_MODE} Running on Server  ${PORT}`);
    })

})