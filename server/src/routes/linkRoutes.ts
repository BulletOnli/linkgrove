import express from "express";
import multer from "multer";
import {
    createLink,
    deleteLink,
    getAllLinks,
    toggleLike,
    updateLink,
} from "../controllers/linkController";
import checkAuth from "../middleware/authMiddleware";
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

router.get("/all", getAllLinks);

router.post("/create", checkAuth, upload.single("thumbnail"), createLink);
router.put("/update", checkAuth, upload.single("thumbnail"), updateLink);
router.delete("/delete", checkAuth, deleteLink);

router.put("/like", toggleLike);

export default router;
