import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("Trying to connect...");

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected to:", conn.connection.host);
    } catch (error) {
        console.error("Connection Failed ❌");
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDB;