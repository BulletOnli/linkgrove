import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import Socials from "../models/socialsModel";
import { generateToken } from "../utils/jwtToken";

export const registerUser = asyncHandler(async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    const user = await User.findOne({ username }).select(["username"]);

    if (user) {
        res.status(403);
        throw new Error("Username already exist!");
    }

    if (password.length < 8) {
        res.status(400);
        throw new Error("Password must be greater than 8 characters");
    }

    if (password !== confirmPassword) {
        res.status(403);
        throw new Error("Password incorrect!");
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

    res.status(201).json({
        user: userDetails,
        token: generateToken(newUser._id.toString()),
    });
});

export const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select([
        "username",
        "password",
    ]);

    if (!user) {
        res.status(403);
        throw new Error("User doesn't exist");
    }

    const userDetails = {
        username: user.username,
        _id: user._id,
    };

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            user: userDetails,
            token: generateToken(user._id.toString()),
        });
    } else {
        res.status(404);
        throw new Error("Incorrect email or password");
    }
});
