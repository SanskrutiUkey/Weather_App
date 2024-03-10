import mongoose from 'mongoose';

const PreferenceSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.ObjectId,
            ref: 'Users',

        },
        city: {
            type: String,
            required: true
        },
        weather: {
            type: String,
            required: true
        },
        // Add other preference-related fields here
    });

export default mongoose.model('Preference', PreferenceSchema);


