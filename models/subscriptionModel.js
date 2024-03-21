import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({

    user: String,
    endpoint: String,
    keys: mongoose.Schema.Types.Mixed
});

export default mongoose.model('subscription', SubscriptionSchema);
