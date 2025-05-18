const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");
const { isAuth } = require("../middlewares/auth/isAuth");
const upload = require("../middlewares/multerMiddleware");


router.get("/", cardController.getCards);
router.get("/home-portfolio", cardController.getHomePortfolio);

router.post("/", isAuth, cardController.addCard);

router.put("/:id", isAuth, cardController.updateCard);

router.post("/upload", upload.single("image"), cardController.uploadFile);

router.post("/apply/:id", isAuth, cardController.apply);

router.delete("/:id", isAuth, cardController.deleteCard);

router.get("/user-cards", isAuth, cardController.getMyCards);

router.get("/:id", cardController.getCardById);

module.exports = router;
