import express, { Request, Response } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";
import errorHandler from "./middleware/errorHandler";

import authRoues from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import linkRoutes from "./routes/linkRoutes";
import socialsRoutes from "./routes/socialsRoute";

const port = process.env.PORT || 8081;
const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
app.use(helmet());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json("Hello World");
});

// routes
app.use("/auth", authRoues);
app.use("/users", userRoutes);
app.use("/links", linkRoutes);
app.use("/socials", socialsRoutes);

// Error handler
app.use(errorHandler);

cloudinary.config({
    cloud_name: "dar5mfo5u",
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
        console.log(`Db connected`);
    })
    .catch((err: any) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log(`Server started in ${port}`);
});
