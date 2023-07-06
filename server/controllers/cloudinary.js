const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary");
const Link = require("../models/linkModel");
const fs = require("fs");
const path = require("path");

const getImg = asyncHandler(async (id) => {
    try {
        const link = await Link.findById(id);
        return await cloudinary.v2.api.resource_by_asset_id([
            link.thumbnail.id,
        ]);
    } catch (error) {
        throw new Error("Img not Found");
    }
});

const uploadImg = asyncHandler(async ({ path, originalname }) => {
    return await cloudinary.v2.uploader.upload(
        path,
        { public_id: originalname },
        function (error, result) {
            if (error) throw new Error("Img Upload Failed");
            return result;
        }
    );
});

const deleteImg = asyncHandler(async (id) => {
    const img = await getImg(id);

    try {
        // delete img in local
        const filePath = path.join(__dirname, `../uploads/${img.public_id}`);
        fs.unlink(filePath, (err) => {
            if (err) throw new Error("File deleting Failed");
        });

        // delete img in cloudinary
        return await cloudinary.v2.api.delete_resources([img.public_id], {
            type: "upload",
            resource_type: "image",
        });
    } catch (error) {
        throw new Error("Delete img failed");
    }
});

module.exports = { getImg, uploadImg, deleteImg };
