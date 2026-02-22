import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },

        rollNumber: { type: String, required: true },

        className: { type: String, required: true },

        section: { type: String },
        parentName: String,
        contactNumber: String
    },
    { timestamps: true }
);

export default mongoose.model("Student", studentSchema);