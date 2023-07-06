const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers["authorization"];

    if (authHeader) {
        try {
            token = authHeader.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findOne(decode._id).select("-password");

            next();
        } catch (error) {
            throw new Error("Not Authorized, Token expired");
        }
    } else {
        res.status(401);
        throw new Error("Not Authorized");
    }
});

module.exports = protect;
