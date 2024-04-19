import "dotenv/config";
import session from "express-session";
import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./social-network/users/routes.js";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb+srv://knoppjulia12:supersecretpassword@cluster0.qtoqtqc.mongodb.net/"
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
    })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "default",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
// CourseRoutes(app);
// ModuleRoutes(app);
app.listen(process.env.PORT || 4000);