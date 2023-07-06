const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createLink, deleteLink, updateLink } = require("../controllers/link");
const protect = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

router.post("/link", protect, upload.single("file"), createLink);
router.delete("/link/:id", deleteLink);
router.put("/link/:id", upload.single("file"), updateLink);

module.exports = router;
