const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
    createLink,
    deleteLink,
    updateLink,
    getLink,
    toggleLike,
} = require("../controllers/linkController");
const checkAuth = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
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

module.exports = router;
