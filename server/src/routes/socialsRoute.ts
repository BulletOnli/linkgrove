import express from "express";
import { createSocials, getAllSocials } from "../controllers/socialsController";
import checkAuth from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getAllSocials);
router.post("/create", checkAuth, createSocials);

export default router;
