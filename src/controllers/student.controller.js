import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const getStudentDashboard = asyncHandler(async (req, res) => {
    res.status(200).json(
        new ApiResponse(200, {
            studentId: req.user.id,
            message: "Welcome to Student Dashboard 🎓"
        })
    );
});