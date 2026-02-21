import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import studentRoutes from "./routes/student.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { buildAdminRouter, admin } from "./admin/admin.js";

const app = express();

// CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Body parser
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
    res.send("Server Running 🚀");
});

// ✅ Student Routes
app.use("/student", studentRoutes);

// ✅ AdminJS (AFTER routes is fine)
const adminRouter = buildAdminRouter();
app.use(admin.options.rootPath, adminRouter);

// ✅ Error Handler MUST BE LAST
app.use(errorHandler);

export default app;