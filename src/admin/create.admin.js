import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await User.create({
    name: "Super Admin",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin",
});

console.log("Admin created ✅");
process.exit();