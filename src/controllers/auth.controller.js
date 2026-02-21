import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const loginStudent = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // For debugging: Log the email received in the request
    console.log("Email from request:", email);
    console.log("Password from request:", password);

    const user = await User.findOne({ email });

    // For debugging: Log the user found in the database
    console.log("User found in DB:", user);

    if (!user || user.role !== "student") {
        return res
            .status(401)
            .json(new ApiResponse(401, null, "Invalid credentials"));
    }

    const isMatch = await user.comparePassword(password);
    // For debugging: Log the result of password comparison
    console.log("Password match result:", isMatch);

    if (!isMatch) {
        return res
            .status(401)
            .json(new ApiResponse(401, null, "Invalid credentials"));
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("studentToken", token, {
        httpOnly: true,
        secure: false, // true in production (https)
        sameSite: "lax" });

    res
        .status(200)
        .json(new ApiResponse(200, { userId: user._id }, "Login successful"));
});



// For testing without DB
// export const loginStudent = asyncHandler(async (req, res) => {
//     console.log("LOGIN CONTROLLER HIT");
//     res.json({ working: true });
// });