import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

        subject: { type: String, required: true },
        qualification: { type: String },
        experienceYears: Number,
        salary: Number
    },
    { timestamps: true }
);

export default mongoose.model("Teacher", teacherSchema);