const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth");
const { getUser } = require("../controllers/user");
const protect = require("../middleware/authMiddleware");

router.get("/:username", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
