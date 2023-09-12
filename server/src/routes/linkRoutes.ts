import express from "express";
import multer from "multer";
import {
    createLink,
    deleteLink,
    getLink,
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

router.route("/:id").get(getLink);

router.post("/create", checkAuth, upload.single("thumbnail"), createLink);
router.put("/update", upload.single("thumbnail"), updateLink);
router.delete("/delete", deleteLink);

router.put("/like", toggleLike);

export default router;
