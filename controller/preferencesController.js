
import preferenceModel from "../models/preferenceModel.js";

// Handle the creation of user preferences

export const getPreferenceController = async (req, res) => {
    try {
        // Extract user input from the request body
        const { userId } = req.params;

        // Check if the user has already reached the maximum limit of preferences
        const getAllPref = await preferenceModel.find({ user: userId });

        res.status(201).json({ message: "Preference listed" });
    } catch (error) {
        // Handle errors
        console.error("Error in getting preferences:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createPreferenceController = async (req, res) => {
    // console.log(req.params.userId);
    try {
        // Extract user ID from request parameters (assuming it's a valid ObjectId)
        const userId = req.params.userId;

        // Extract city and weather from request body
        const { city, weather } = req.body;

        // Check if the user has already reached the maximum limit of preferences
        const existingPreferences = await preferenceModel.find({ user: userId });


        // Create a new preference with the user ID (assuming it's a valid ObjectId)
        const newPreference = await new preferenceModel({
            user: userId,
            city,
            weather
        }).save();

        // Send a success response
        res.status(201).json({ message: "Preference created successfully", preference: newPreference });
    } catch (error) {
        // Handle errors
        console.error("Error creating preference:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const updatePreferencesController = async (req, res) => {
    try {
        const { userId } = req.params;// Get the preference ID from request parameters
        const updates = req.body; // Get the updates from request body

        // Find preference by ID and update it with the provided updates
        const updatedPreference = await preferenceModel.findByIdAndUpdate(id, updates, { new: true });
        print("updatedPreference: " + updatedPreference)
        if (!updatedPreference) {
            return res.status(404).json({ error: 'Preference not found' });
        }

        // Return the updated preference
        res.status(200).json(updatedPreference);
    } catch (error) {
        console.error('Error updating preferences:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Delete preferences by ID
export const deletePreferencesController = async (req, res) => {
    try {
        const { userId } = req.params; // Get the preference ID from request parameters

        // Find preference by ID and delete it
        const deletedPreference = await preferenceModel.findByIdAndDelete(id);

        if (!deletedPreference) {
            return res.status(404).json({ error: 'Preference not found' });
        }

        res.status(200).json({ message: 'Preference deleted successfully' });
    } catch (error) {
        console.error('Error deleting preferences:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

