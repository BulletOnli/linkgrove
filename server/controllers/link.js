const asyncHandler = require("express-async-handler");
const Link = require("../models/linkModel");
const { uploadImg, getImg, deleteImg } = require("./cloudinary");

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

    const thumbnail = {
        url: img.url,
        id: img.asset_id,
    };

    const newLink = await Link.create({
        title,
        url,
        thumbnail,
        github,
        creator: req.user.id,
    });

    res.status(201).json(newLink);
});

const deleteLink = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        // delete img in both cloudinary and local
        await deleteImg(id);
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
    const { title, url, github } = req.body;
    const { id } = req.params;

    try {
        // upload new Img
        const img = await uploadImg(req.file);
        // delete old img in both cloudinary and local
        await deleteImg(id);
        // update the link
        await Link.findByIdAndUpdate(id, {
            title,
            url,
            github,
            thumbnailId: img.asset_id,
            thumbnailUrl: img.url,
        });

        res.status(200).json({
            message: "Link updated successfully!",
        });
    } catch (error) {
        res.status(404);
        throw new Error("Link not found!");
    }
});

module.exports = { getLink, createLink, deleteLink, updateLink };
