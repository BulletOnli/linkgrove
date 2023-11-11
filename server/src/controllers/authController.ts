import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import Socials from "../models/socialsModel";
import { getAccessToken, getRefreshToken } from "../utils/jwtToken";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

export const newAccessToken = asyncHandler(
    async (req: Request, res: Response) => {
        if (req.cookies.jwt) {
            const refreshToken = req.cookies.jwt;

            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET!,
                (err: unknown, decoded: any) => {
                    if (err) {
                        res.status(403).clearCookie("jwt", {
                            httpOnly: true,
                            sameSite: "none",
                            secure: true,
                        });
                    } else {
                        res.json({ token: getAccessToken(decoded._id) });
                    }
                }
            );
        } else {
            res.status(401);
            throw new Error("Unauthorized, No Refresh token");
        }
    }
);

export const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { username, password, confirmPassword } = req.body;
        const user = await User.findOne({ username })
            .select(["username"])
            .lean();

        if (user) {
            res.status(403);
            throw new Error("Username already exist!");
        }

        const validate = z.object({
            username: z.string().min(3),
            password: z.string().min(8),
        });
        const validateResults = validate.safeParse(req.body);

        if (!validateResults.success) {
            const error = validateResults.error.errors[0];

            res.status(400);
            throw new Error(
                error.message.replace(/String/g, error.path.toString())
            );
        }

        if (password !== confirmPassword) {
            res.status(400);
            throw new Error("Password don't match");
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            username,
            password: hashedPassword,
            bio: "Bio",
        });

        const userDetails = {
            username: newUser.username,
            _id: newUser._id,
            bio: newUser.bio,
        };

        // create instant document for socials accounts
        await Socials.create({
            creator: newUser._id,
        });

        const refreshToken = getRefreshToken(userDetails._id.toString());

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 1000 * 60 * 60 * 24,
        });

        res.status(201).json({
            user: userDetails,
            token: getAccessToken(newUser._id.toString()),
        });
    }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
        .select(["username", "password"])
        .lean();

    if (!user) {
        res.status(403);
        throw new Error("User doesn't exist");
    }

    const userDetails = {
        username: user.username,
        _id: user._id,
    };

    if (user && (await bcrypt.compare(password, user.password!))) {
        const refreshToken = getRefreshToken(user._id.toString());

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 1000 * 60 * 60 * 24,
        });

        res.status(200).json({
            user: userDetails,
            token: getAccessToken(user._id.toString()),
        });
    } else {
        res.status(404);
        throw new Error("Incorrect email or password");
    }
});
