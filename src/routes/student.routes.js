import express from "express";
import { loginStudent } from "../controllers/auth.controller.js";
import { getStudentDashboard } from "../controllers/student.controller.js";
import { verifyStudent } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Login route
router.post("/login", loginStudent);

// Protected dashboard
router.get("/dashboard", verifyStudent, getStudentDashboard);

router.post("/logout", (req, res) => {
    res.clearCookie("studentToken");
    res.json({ message: "Logged out successfully" });
});

export default router;