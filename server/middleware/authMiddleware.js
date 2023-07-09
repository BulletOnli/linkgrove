const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const checkAuth = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers["authorization"];

    if (authHeader) {
        try {
            token = authHeader.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode._id).select("-password");
            next();
        } catch (error) {
            req.user = {};
            next();
        }
    } else {
        req.user = {};
        next();
    }
});

module.exports = checkAuth;
