import express from "express"
import { createPreferenceController, getPreferenceController, updatePreferencesController, deletePreferencesController } from "../controller/preferencesController.js"
import { fetchWeatherUpdatesForCities, compareWeatherWithPreferences } from '../server.js';
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router()
const app = express()
router.get('/get-pref/:userId', authMiddleware, getPreferenceController)
router.post('/create-pref/:userId', authMiddleware, createPreferenceController)
router.put('/edit-pref/:userId', authMiddleware, updatePreferencesController)
router.delete('/delete-pref/:userId', authMiddleware, deletePreferencesController)


// Define a route for fetching weather updates
router.get(`/fetch-weather-updates`, async (req, res) => {
    try {
        // Call the function to fetch weather updates for cities
        await fetchWeatherUpdatesForCities();

        // Respond with a success message
        res.status(200).json({ message: 'Weather updates fetched successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error fetching weather updates:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Define a route for handling weather updates and comparing with user preferences
router.post('/handle-weather-updates', async (req, res) => {
    try {
        // Call the function to compare weather updates with user preferences
        await compareWeatherWithPreferences();

        // Respond with a success message
        res.status(200).json({ message: 'Weather updates compared with preferences' });
    } catch (error) {
        // Handle errors
        console.error('Error comparing weather updates with preferences:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router;