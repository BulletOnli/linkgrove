const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
    createLink,
    deleteLink,
    updateLink,
    getLink,
} = require("../controllers/link");
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

router.post("/", checkAuth, upload.single("thumbnail"), createLink);
router
    .route("/:id")
    .get(getLink)
    .delete(deleteLink)
    .put(upload.single("thumbnail"), updateLink);

module.exports = router;
