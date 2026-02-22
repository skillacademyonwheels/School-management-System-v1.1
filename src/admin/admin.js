import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import session from "express-session";

import User from "../models/user.model.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";

AdminJS.registerAdapter(AdminJSMongoose);

const admin = new AdminJS({
    resources: [
        {
            resource: User,
            options: {
                properties: {
                    password: { isVisible: { list: false, edit: true, show: false } }
                }
            }
        },
        {
            resource: Student,
        },
        {
            resource: Teacher,
        }
    ],
    rootPath: "/admin",
});

const buildAdminRouter = () =>
     AdminJSExpress.buildAuthenticatedRouter(
        admin,
        {
            authenticate: async (email, password) => {
                const user = await User.findOne({ email,role: "admin" });

                if (user && await user.comparePassword(password)) {
                    return user;
                }
                return null;
            },
           
            cookiePassword: process.env.JWT_SECRET || "default-secret-key",
        });

export { admin, buildAdminRouter };