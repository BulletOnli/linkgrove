const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Link = require("../models/linkModel");

const getAccountUser = asyncHandler(async (req, res) => {
    const user = req.user;

    if (!user) {
        res.status(404);
        throw new Error("Please Log in");
    }

    res.status(200).json(user);
});

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

module.exports = { getUserProfile, getAccountUser };
