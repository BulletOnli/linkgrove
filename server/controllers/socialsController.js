const asyncHandler = require("express-async-handler");
const Socials = require("../models/socialsModel");

// create all social links
const createSocials = asyncHandler(async (req, res) => {
    const newSocials = await Socials.create(req.body);

    if (Object.values(req.body).length === 0) {
        res.status(400);
        throw new Error("Please provide a Link!");
    }

    res.status(200).json(newSocials);
});

module.exports = { createSocials };
