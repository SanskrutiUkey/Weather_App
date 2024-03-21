import mongoose from 'mongoose';

const PreferenceSchema = new mongoose.Schema(
    {
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Users',

        // },
        user: {
            type: String,
            required: true
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


