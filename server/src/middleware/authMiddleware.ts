import * as globalTypes from "../types/global";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { Request, Response, NextFunction } from "express";

// just returns the account details
const checkAuth = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers["authorization"]?.split(" ")[1];

        if (token) {
            try {
                const decode = jwt.verify(
                    token,
                    process.env.ACCESS_TOKEN_SECRET!
                ) as {
                    _id: string;
                };
                req.user =
                    (await User.findById(decode._id).select("-password")) ||
                    null;
                next();
            } catch (error) {
                req.user = null;
                next();
            }
        } else {
            req.user = null;
            next();
        }
    }
);

export default checkAuth;
