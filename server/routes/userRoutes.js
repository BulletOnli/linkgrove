const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth");
const { getUserProfile, getAccountUser } = require("../controllers/user");
const checkAuth = require("../middleware/authMiddleware");

router.get("/", checkAuth, getAccountUser);
router.get("/:username", getUserProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
