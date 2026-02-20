import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import session from "express-session";

import User from "../models/user.model.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";

AdminJS.registerAdapter(AdminJSMongoose);

const admin = new AdminJS({
    resources: [User, Student, Teacher],
    rootPath: "/admin",
});

const buildAdminRouter = () =>
    AdminJSExpress.buildAuthenticatedRouter(
        admin,
        {
            authenticate: async (email, password) => {
                const user = await User.findOne({ email });

                if (user && user.role === "admin") {
                    return user;
                }
                return null;
            },
            cookieName: "adminjs",
            cookiePassword: "supersecret",
        },
        null,
        {
            resave: false,
            saveUninitialized: true,
            secret: "supersecret",
        }
    );

export { admin, buildAdminRouter };