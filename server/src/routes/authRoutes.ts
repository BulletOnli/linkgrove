import express from "express";
import {
    loginUser,
    logoutUser,
    newAccessToken,
    registerUser,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/refresh", newAccessToken);

export default router;
