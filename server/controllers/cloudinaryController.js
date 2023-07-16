const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary");

const getImg = asyncHandler(async (imgId) => {
    try {
        return await cloudinary.v2.api.resource_by_asset_id([imgId]);
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

const deleteImg = asyncHandler(async (imgId) => {
    const img = await getImg(imgId);
    try {
        return await cloudinary.v2.api.delete_resources([img.public_id], {
            type: "upload",
            resource_type: "image",
        });
    } catch (error) {
        throw new Error("Delete img failed");
    }
});

module.exports = { getImg, uploadImg, deleteImg };
