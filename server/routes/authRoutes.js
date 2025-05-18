const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { isAuth } = require("../middlewares/auth/isAuth");


router.post("/register", authController.register);
router.post("/login", authController.login);

router.get(
  "/is-logged-in",
  isAuth,
  authController.isLoggedIn
)
module.exports = router;
