
import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: 'Users',
    },
    city: {
        type: String,
        trim: true
    },

    // Add more properties as needed
});

export default mongoose.model('City', citySchema);

