import express from "express";
const router = express.Router();
import multer from "multer";
import checkAuth from "../middleware/authMiddleware";
import {
    getAccountDetails,
    getUserProfile,
    updateAccountDetailsAndSocials,
} from "../controllers/userController";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/uploads/profilePics");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

router.get("/user/:username", checkAuth, getUserProfile); // for specific user

router.get("/details", checkAuth, getAccountDetails);
router.put(
    "/details/update",
    checkAuth,
    upload.single("profilePic"),
    updateAccountDetailsAndSocials
);

export default router;
