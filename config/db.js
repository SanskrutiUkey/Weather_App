import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB is on ${con.connection.host}`);
    }
    catch (error) {
        console.log(`Error in MongoDB: ${error}`);
    }
}

export default connectDB;