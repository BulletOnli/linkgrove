const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/authMiddleware");
const {
    createSocials,
    getAllSocials,
    updateSocials,
} = require("../controllers/socialsController");

router.get("/", getAllSocials);
router.post("/create", checkAuth, createSocials);
router.put("/update", checkAuth, updateSocials);

module.exports = router;
