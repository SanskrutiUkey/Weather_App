import cityModel from "../models/cityModel.js";

export const getCityController = async (req, res) => {
    try {
        // Extract user input from the request body
        const { userId } = req.params;

        // Check if the user has already reached the maximum limit of preferences
        const getAllCity = await cityModel.find({ user: userId });

        res.status(201).json({ message: "Cities listed", getAllCity });
    } catch (error) {
        // Handle errors
        console.error("Error in getting cities:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createCityController = async (req, res) => {

    try {
        const userId = req.params.userId;
        console.log("UserId ", userId);

        const { city } = req.body;

        // Create a new preference with the user ID (assuming it's a valid ObjectId)
        const newCity = await new cityModel({
            user: userId,
            city
        }).save();

        // Send a success response
        res.status(201).json({ message: "City created successfully", city: newCity });
    } catch (error) {
        // Handle errors
        console.error("Error creating city:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteCityController = async (req, res) => {
    try {

        const userId = req.params.userId;
        const { city } = req.body; // Assuming you pass the city name in the request body
        // Find and delete the city preference based on both user ID and city name

        const deletedCity = await cityModel.findOneAndDelete({ user: userId, city: city });

        if (deletedCity) {
            res.status(200).json({ message: "City preference deleted successfully", deletedCity });
        } else {
            res.status(404).json({ message: "City preference not found" });
        }
    } catch (error) {
        // Handle errors
        console.error("Error deleting city preference:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

