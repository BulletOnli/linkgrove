import { deleteImg, uploadImg } from "../utils/cloudinary";
import asyncHandler from "express-async-handler";
import Link from "../models/linkModel";
import { Request, Response } from "express";

export const getAllLinks = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.query;
    const links = await Link.find({ creator: userId });

    res.status(200).json(links);
});

export const createLink = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(404);
        throw new Error("Please log in");
    }

    const { title, url, github } = req.body;

    const img = await uploadImg(
        req.file as {
            path: string;
            originalname: string;
        }
    );

    if (!img) {
        res.status(500);
        throw new Error("Image upload failed");
    }

    const thumbnail = {
        url: img.url,
        id: img.asset_id,
    };

    const newLink = await Link.create({
        title,
        url,
        thumbnail,
        github,
        likes: {},
        creator: req.user?._id,
    });

    res.status(201).json(newLink);
});

export const deleteLink = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.query;

    const link = await Link.findById(id).select("thumbnail");

    if (link && link.thumbnail?.id) {
        // delete img in both cloudinary and local
        await deleteImg(link?.thumbnail?.id);
        // delete link in the db
        await Link.deleteOne({ _id: id });

        res.status(200).json({
            message: "Link deleted!",
        });
    } else {
        res.status(404);
        throw new Error("Link not found");
    }
});

export const updateLink = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.query;
    const { title, url, github } = req.body;

    try {
        const link = await Link.findById(id).select([
            "title",
            "url",
            "github",
            "thumbnail",
        ]);

        if (!link) {
            res.status(404);
            throw new Error("Link not found!");
        }

        link.title = title;
        link.url = url;
        link.github = github;

        if (req.file && link.thumbnail?.id) {
            const img = await uploadImg(req.file);
            // delete previous img
            await deleteImg(link?.thumbnail?.id);

            const thumbnail = {
                url: img.url,
                id: img.asset_id,
            };
            link.thumbnail = thumbnail;
        }

        await link.save();

        res.status(200).json({
            message: "Link updated successfully!",
        });
    } catch (error) {
        res.status(404);
        throw new Error("Link updating failed!");
    }
});

export const toggleLike = asyncHandler(async (req: Request, res: Response) => {
    const { linkId } = req.query;
    const { userId } = req.body;

    const link = await Link.findById(linkId).select(["likes"]);

    if (link && link?.likes) {
        const isLiked = link.likes.get(userId);

        if (isLiked) {
            link.likes.delete(userId);
        } else {
            link.likes.set(userId, true);
        }

        await link.save();
        res.status(200).json({ message: "Like/unlike success" });
    } else {
        res.status(404);
        throw new Error("Link not found");
    }
});
