const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
};

const registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) throw new Error("Username already exist!");

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
        username,
        password: hashedPassword,
    });

    res.status(201).json({
        message: "Registration Successful!",
        user: newUser._id,
        token: generateToken(),
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) throw new Error("Username doesn't exist");

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            message: "Login success",
            user: user._id,
            token: generateToken(),
        });
    } else {
        res.status(401);
        throw new Error("Login Failed, Not Authorized");
    }
});

module.exports = { registerUser, loginUser };
