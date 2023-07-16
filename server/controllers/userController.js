const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Link = require("../models/linkModel");
const Socials = require("../models/socialsModel");
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
    const socials = await Socials.findOne({ creator: user._id });

    res.status(200).json({
        user,
        links,
        socials,
    });
});

// details of the account
const getAccountDetails = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { username, bio } = req.body;

    try {
        const accountDetails = await User.findById(req.user._id);

        accountDetails.username = username;
        accountDetails.bio = bio;

        if (req.file) {
            const img = await uploadImg(req.file);
            // delete previous img
            await deleteImg(accountDetails?.profilePic?.id);

            const profilePic = {
                url: img.url,
                id: img.asset_id,
            };
            accountDetails.profilePic = profilePic;
        }

        await accountDetails.save();

        res.status(200).json(accountDetails);
    } catch (error) {
        res.status(500);
        throw new Error("Updating Failed");
    }
});

module.exports = { getUserProfile, getAccountDetails, updateAccountDetails };
