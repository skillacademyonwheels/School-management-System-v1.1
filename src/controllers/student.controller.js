// import { ApiResponse } from "../utils/api-response.js";
// import { asyncHandler } from "../utils/async-handler.js";

// export const getStudentDashboard = asyncHandler(async (req, res) => {
//     res.status(200).json(
//         new ApiResponse(200, {
//             studentId: req.user.id,
//             message: "Welcome to Student Dashboard 🎓"
//         })
//     );
// });

// import Student from "../models/student.model.js";
// import Attendance from "../models/attendance.model.js";
// import Marks from "../models/marks.model.js";
// import { ApiResponse } from "../utils/api-response.js";
// import { asyncHandler } from "../utils/async-handler.js";

// export const getStudentDashboard = asyncHandler(async (req, res) => {

//     const userId = req.user.id;

//     // Fetch student profile
//     const student = await Student.findOne({ user: userId })
//         .populate("user", "-password");

//     if (!student) {
//         return res.status(404).json(
//             new ApiResponse(404, null, "Student profile not found")
//         );
//     }

//     // Attendance
//     const totalAttendance = await Attendance.countDocuments({ student: userId });
//     const presentCount = await Attendance.countDocuments({
//         student: userId,
//         status: "present"
//     });

//     const attendancePercentage =
//         totalAttendance > 0
//             ? ((presentCount / totalAttendance) * 100).toFixed(2)
//             : 0;

//     // Marks
//     const marks = await Marks.find({ student: userId });

//     const totalMarksObtained = marks.reduce(
//         (sum, m) => sum + m.marksObtained,
//         0
//     );

//     const totalMaxMarks = marks.reduce(
//         (sum, m) => sum + m.totalMarks,
//         0
//     );

//     res.status(200).json(
//         new ApiResponse(200, {
//             profile: student,
//             attendancePercentage,
//             totalMarksObtained,
//             totalMaxMarks
//         }, "Dashboard fetched")
//     );
// });

import User from "../models/user.model.js";
import Student from "../models/student.model.js";
import Attendance from "../models/attendance.model.js";
import Marks from "../models/marks.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

/* ===========================
   REGISTER STUDENT
=========================== */
export const registerStudent = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password,
        className,
        section,
        rollNumber,
        parentName,
        contactNumber
    } = req.body;

    // 1️⃣ Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "Email already registered"));
    }

    // 2️⃣ Create user
    const user = await User.create({
        name,
        email,
        password,
        role: "student"
    });

    // 3️⃣ Create student profile
    const student = await Student.create({
        user: user._id,
        className,
        section,
        rollNumber,
        parentName,
        contactNumber
    });

    res.status(201).json(
        new ApiResponse(201, student, "Student registered successfully")
    );
});


/* ===========================
   STUDENT DASHBOARD
=========================== */
export const getStudentDashboard = asyncHandler(async (req, res) => {

    const userId = req.user.id;

    // 🔹 Fetch student profile
    const student = await Student.findOne({ user: userId })
        .populate("user", "-password");

    if (!student) {
        return res.status(404).json(
            new ApiResponse(404, null, "Student profile not found")
        );
    }

    // 🔹 Attendance (IMPORTANT FIX BELOW)
    const totalAttendance = await Attendance.countDocuments({
        student: student._id
    });

    const presentCount = await Attendance.countDocuments({
        student: student._id,
        status: "present"
    });

    const attendancePercentage =
        totalAttendance > 0
            ? ((presentCount / totalAttendance) * 100).toFixed(2)
            : 0;

    // 🔹 Marks (IMPORTANT FIX BELOW)
    const marks = await Marks.find({
        student: student._id
    });

    const totalMarksObtained = marks.reduce(
        (sum, m) => sum + m.marksObtained,
        0
    );

    const totalMaxMarks = marks.reduce(
        (sum, m) => sum + m.totalMarks,
        0
    );

    res.status(200).json(
        new ApiResponse(200, {
            profile: student,
            attendancePercentage,
            totalMarksObtained,
            totalMaxMarks
        }, "Dashboard fetched")
    );
});