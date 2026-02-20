import express from 'express';
import cors from "cors";
// const express = require('express')
const app = express();



// Cors Configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.get("/", (req, res) => {
    res.send("Server Running 🚀");
});



//Basic Configuration
app.use(express.json({ limit: "16kb" }));


export default app;
