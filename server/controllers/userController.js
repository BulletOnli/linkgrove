const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Link = require("../models/linkModel");
const { uploadImg, deleteImg } = require("./cloudinaryController");

// Get the user profile regardless of the auth status
// public
const getUserProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
        res.status(404);
        throw new Error("User not Found");
    }

    const links = await Link.find({ creator: user._id });

    res.status(200).json({
        user,
        links,
    });
});

// details of the account
const getAccountDetails = asyncHandler(async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { username, bio } = req.body;

    try {
        const account = await User.findById(req.user._id);
        const accountDetails = await User.findByIdAndUpdate(req.user._id, {
            username,
            bio,
        });

        if (req.file) {
            const img = await uploadImg(req.file);
            const profilePic = {
                url: img.url,
                id: img.asset_id,
            };
            account.profilePic = profilePic;

            await account.save();
        }

        res.status(200).json(accountDetails);
    } catch (error) {
        res.status(500);
        throw new Error("Updating Failed");
    }
});

module.exports = { getUserProfile, getAccountDetails, updateAccountDetails };
