import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

        rollNumber: { type: String, required: true },
        className: { type: String, required: true },
        section: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("Student", studentSchema);