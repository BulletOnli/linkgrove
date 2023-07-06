const asyncHandler = require("express-async-handler");
const Link = require("../models/linkModel");
const { uploadImg, getImg, deleteImg } = require("./cloudinary");

const createLink = asyncHandler(async (req, res) => {
    if (!req.user) throw new Error("User not Found");
    const { title, url } = req.body;
    const img = await uploadImg(req.file);

    const thumbnail = {
        url: img.url,
        id: img.asset_id,
    };

    const newLink = await Link.create({
        title,
        url,
        thumbnail,
        creator: req.user._id,
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
    const { title, url } = req.body;
    const { id } = req.params;

    try {
        // upload new Img
        const img = await uploadImg(req.file);
        // delete old img in both cloudinary and local
        await deleteImg(id);
        // update the link
        await Link.findByIdAndUpdate(id, {
            title: title,
            url: url,
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

module.exports = { createLink, deleteLink, updateLink };
