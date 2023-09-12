import express from "express";
import {
    createSocials,
    getAllSocials,
    updateSocials,
} from "../controllers/socialsController";
import checkAuth from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getAllSocials);
router.post("/create", checkAuth, createSocials);
router.put("/update", checkAuth, updateSocials);

export default router;
