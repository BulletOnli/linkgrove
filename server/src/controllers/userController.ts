import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Socials from "../models/socialsModel";
import User from "../models/userModel";
import Link from "../models/linkModel";
import { deleteImg, uploadImg } from "../utils/cloudinary";

// Get the user profile regardless of the auth status
// public
export const getUserProfile = asyncHandler(
    async (req: Request, res: Response) => {
        const { username } = req.params;
        const user = await User.findOne({ username }).select("-password");

        if (!user) {
            res.status(404);
            throw new Error("User not Found");
        }

        const links = await Link.find({ creator: user._id });
        const socials = await Socials.findOne({ creator: user._id });

        res.status(200).json({
            user,
            links,
            socials,
        });
    }
);

// details of the account
export const getAccountDetails = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await User.findById(req.user?._id).select("-password");

        res.status(200).json(user);
    }
);

export const updateAccountDetails = asyncHandler(
    async (req: Request, res: Response) => {
        const { username, bio } = req.body;

        try {
            const accountDetails = await User.findById(req.user?._id);

            if (!accountDetails) {
                res.status(404);
                throw new Error("User not found");
            }

            accountDetails.username = username;
            accountDetails.bio = bio;

            if (req.file && accountDetails.profilePic?.id) {
                const img = await uploadImg(req.file);
                // delete previous img
                await deleteImg(accountDetails.profilePic.id);
                const profilePic = {
                    url: img.url,
                    id: img.asset_id,
                };
                accountDetails.profilePic = profilePic;
            }

            await accountDetails.save();
            res.status(200).json(accountDetails);
        } catch (error) {
            res.status(500);
            throw new Error("Updating Failed");
        }
    }
);
