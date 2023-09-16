import express from "express";
import {
    loginUser,
    newAccessToken,
    registerUser,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refresh", newAccessToken);

export default router;
