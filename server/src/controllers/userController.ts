import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Socials from "../models/socialsModel";
import User from "../models/userModel";
import { deleteImg, uploadImg } from "../utils/cloudinary";

// Get the profile details
export const getUserProfile = asyncHandler(
    async (req: Request, res: Response) => {
        const { username } = req.params;
        const user = await User.findOne({ username })
            .select(["username", "bio", "profilePic"])
            .lean();

        if (!user) {
            res.status(404);
            throw new Error("User not Found");
        }

        const socials = await Socials.findOne({ creator: user._id }).lean();

        res.status(200).json({
            user,
            socials,
        });
    }
);

// details of the account logged in
export const getAccountDetails = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await User.findById(req.user?._id)
            .select("-password")
            .lean();

        res.status(200).json(user);
    }
);

// Update username, bio and social media links
export const updateAccountDetailsAndSocials = asyncHandler(
    async (req: Request, res: Response) => {
        const { socialsId } = req.query;
        const {
            username,
            bio,
            facebook,
            instagram,
            twitter,
            discord,
            reddit,
            telegram,
            tiktok,
            youtube,
            github,
        } = req.body;

        try {
            const accountDetails = await User.findById(req.user?._id).select([
                "username",
                "bio",
                "profilePic",
            ]);
            const accountSocials = await Socials.findById(socialsId);

            if (!accountDetails || !accountSocials) {
                res.status(404);
                throw new Error("User not found");
            }

            accountDetails.username = username;
            accountDetails.bio = bio;

            accountSocials.facebook = facebook;
            accountSocials.instagram = instagram;
            accountSocials.twitter = twitter;
            accountSocials.discord = discord;
            accountSocials.reddit = reddit;
            accountSocials.telegram = telegram;
            accountSocials.tiktok = tiktok;
            accountSocials.youtube = youtube;
            accountSocials.github = github;

            // update profile pic if there is a file in the request
            if (req.file && accountDetails.profilePic?.id) {
                const img = await uploadImg(
                    req.file as {
                        path: string;
                        originalname: string;
                    }
                );

                // delete previous img
                await deleteImg(accountDetails.profilePic.id);
                const profilePic = {
                    url: img.url,
                    id: img.asset_id,
                };
                accountDetails.profilePic = profilePic;
            }

            await accountDetails.save();
            await accountSocials.save();

            res.status(200).json({ message: "Details updated sucessfully" });
        } catch (error) {
            res.status(500);
            throw new Error("Updating Failed");
        }
    }
);
