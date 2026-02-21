import { ApiResponse } from "../utils/api-response.js";

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json(
        new ApiResponse(
            statusCode,
            null,
            err.message || "Internal Server Error"
        )
    );
};

export { errorHandler };