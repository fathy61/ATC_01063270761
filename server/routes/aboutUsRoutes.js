const express = require("express");
const router = express.Router();
const aboutUsController = require("../controllers/aboutUsController");



router.get("/", aboutUsController.getAboutUs);
router.post("/", aboutUsController.addAboutUs);

module.exports = router;
 