const express = require("express");
const router = express.Router();
const multer = require("multer");
const { registerUser, loginUser } = require("../controllers/authController");
const {
    getUserProfile,
    getAccountDetails,
    updateAccountDetails,
} = require("../controllers/userController");
const checkAuth = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/profilePics");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/user/:username", getUserProfile); // for specific user

router.get("/details", checkAuth, getAccountDetails);
router.put(
    "/details",
    checkAuth,
    upload.single("profilePic"),
    updateAccountDetails
);

module.exports = router;
