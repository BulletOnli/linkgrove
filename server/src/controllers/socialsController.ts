import asyncHandler from "express-async-handler";
import Socials from "../models/socialsModel";

export const getAllSocials = asyncHandler(async (req, res) => {
    const { creator } = req.query;
    try {
        const socialLinks = await Socials.findOne({ creator });
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

export const updateSocials = asyncHandler(async (req, res) => {
    const { id } = req.query;
    try {
        await Socials.findByIdAndUpdate(id, req.body);

        res.status(200).json("Socials Updated");
    } catch (error) {
        res.status(500);
        throw new Error("Can't update the social link");
    }
});
