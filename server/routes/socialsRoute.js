const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/authMiddleware");
const { createSocials } = require("../controllers/socialsController");

router.post("/", createSocials);

module.exports = router;
