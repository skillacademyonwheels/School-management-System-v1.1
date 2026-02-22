import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyStudent = async(req, res, next) => {
    const token = req.cookies.studentToken;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized - Token Missing"
        });
    }

    try {
        console.log("Verifying with secret:", process.env.JWT_SECRET);
        // Verify the token and decode it
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Fetch user from DB
        const user = await User.findById(decoded.id).select("-password");

        if (user.role !== "student") {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }
        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        console.log("JWT Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Unauthorized - Invalid Token"
        });
    }
};