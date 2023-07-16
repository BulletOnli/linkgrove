const asyncHandler = require("express-async-handler");
const Link = require("../models/linkModel");
const { uploadImg, getImg, deleteImg } = require("./cloudinaryController");

const getLink = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const link = await Link.findById(id);

    res.status(200).json(link);
});

const createLink = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(404);
        throw new Error("Please log in");
    }
    const { title, url, github } = req.body;
    const img = await uploadImg(req.file);

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
        creator: req.user.id,
    });

    res.status(201).json(newLink);
});

const deleteLink = asyncHandler(async (req, res) => {
    const { id } = req.query;
    try {
        const link = await Link.findById(id);
        // delete img in both cloudinary and local
        await deleteImg(link?.thumbnail?._id);
        // delete link in the db
        await Link.findByIdAndDelete(id);

        res.status(200).json({
            message: "Link deleted!",
        });
    } catch (error) {
        res.status(404);
        throw new Error("Link not found!");
    }
});

const updateLink = asyncHandler(async (req, res) => {
    const { id } = req.query;
    const { title, url, github } = req.body;

    try {
        const link = await Link.findById(id);

        if (!link) {
            res.status(404);
            throw new Error("Link not found!");
        }

        link.title = title;
        link.url = url;
        link.github = github;

        if (req.file) {
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

const toggleLike = asyncHandler(async (req, res) => {
    const { linkId } = req.query;
    const { userId } = req.body;

    try {
        const link = await Link.findById(linkId);
        const isLiked = link.likes.get(userId);

        if (isLiked) {
            link.likes.delete(userId);
        } else {
            link.likes.set(userId, true);
        }

        const updatedLink = await Link.findByIdAndUpdate(
            linkId,
            {
                likes: link.likes,
            },
            { new: true }
        );

        res.status(200).json(updatedLink);
    } catch (error) {
        res.status(404);
        throw new Error("Cant like the link");
    }
});

module.exports = { getLink, createLink, deleteLink, updateLink, toggleLike };
