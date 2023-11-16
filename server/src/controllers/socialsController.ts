import asyncHandler from "express-async-handler";
import Socials from "../models/socialsModel";

export const getAllSocials = asyncHandler(async (req, res) => {
    const { creator } = req.query;
    try {
        const socialLinks = await Socials.findOne({ creator }).lean();

        res.status(200).json(socialLinks);
    } catch (error) {
        res.status(404);
        throw new Error("Can't find the social links");
    }
});

// create all social links
export const createSocials = asyncHandler(async (req, res) => {
    try {
        const newSocials = await Socials.create({
            creator: req.user?._id,
        });

        res.status(200).json(newSocials);
    } catch (error) {
        res.status(500);
        throw new Error("Server Error!");
    }
});
