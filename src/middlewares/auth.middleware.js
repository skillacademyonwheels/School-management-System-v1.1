import jwt from "jsonwebtoken";

export const verifyStudent = (req, res, next) => {
    const token = req.cookies.studentToken;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "student") {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};