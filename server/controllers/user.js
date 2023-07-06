const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Link = require("../models/linkModel");

const getUser = asyncHandler(async (req, res) => {
    const { username } = req.params;

    const currentUser = await User.findOne({ username }).select("-password");
    if (!currentUser) {
        res.status(404);
        throw new Error("User not Found");
    }

    const links = await Link.find({ creator: currentUser._id });

    res.status(200).json({
        currentUser,
        links,
    });
});

module.exports = { getUser };
