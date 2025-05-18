const Card = require("../models/card");
const Details = require("../models/details");
const deleteImage = require("../utils/deleteImage");

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find().select('-__v -createdAt -updatedAt');

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const cardsWithUrl = cards.map((card) => {
      const obj = card.toObject();
      obj.imageUrl = `${baseUrl}/uploads/${card.image}`;
      return obj;
    });

    res.status(200).json({
      message: "Cards fetched successfully",
      data: cardsWithUrl,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.getHomePortfolio = async (req, res) => {
  try {
    const cards = await Card.find({}).sort({ createdAt: 1 }).limit(6).select('-__v -createdAt -updatedAt');

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const cardsWithUrl = cards.map((card) => {
      const obj = card.toObject();
      obj.imageUrl = `${baseUrl}/uploads/${card.image}`;
      return obj;
    });

    res.status(200).json({
      message: "Cards fetched successfully",
      data: cardsWithUrl,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.addCard = async (req, res) => {
  try {
    const { title, description, image, titleAr, descriptionAr, date, category, price, venue } = req.body;
    const newCard = new Card({ title, description, image, titleAr, descriptionAr, date, category, price, venue });
    await newCard.save();
    res.status(201).json({
      message: "Card added successfully",
      data: newCard,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, titleAr, descriptionAr, date, category, price, venue } = req.body;
    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: "Card not found", error: true });
    }
    if(card.image !== image){
      deleteImage(card.image)
    }
    card.title = title;
    card.description = description;
    card.image = image;
    card.titleAr = titleAr;
    card.descriptionAr = descriptionAr;
    card.date = date;
    card.category = category;
    card.price = price;
    card.venue = venue;
    await card.save();
    res.status(200).json({
      message: "Card updated successfully",
      data: card,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: "Card not found", error: true });
    }

    await Card.findByIdAndDelete(id);
    deleteImage(card.image);

    res.status(200).json({
      message: "Card deleted successfully",
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.apply = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    console.log(userId);
    console.log(id);
    const newDetails = new Details({ userId, cardId: id });
    await newDetails.save();
    const card = await Card.findById(id);
    card.counter += 1;
    await card.save();
    res.status(201).json({
      message: "Details added successfully",
      data: newDetails,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    return res
      .status(200)
      .json({
        message: "File Successfully Uploaded",
        image: req.file.filename,
      }); 
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getMyCards = async (req, res) => {
  try {
    const userId = req.user.id;
    const details = await Details.find({ userId }).select('-__v -createdAt -updatedAt');
    
    res.status(200).json({
      message: "Details fetched successfully",
      data: details,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
}

exports.getCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id).select('-__v -createdAt -updatedAt');

        const baseUrl = `${req.protocol}://${req.get("host")}`;

      const obj = card.toObject();
      obj.imageUrl = `${baseUrl}/uploads/${card.image}`;

    
    res.status(200).json({
      message: "Card fetched successfully",
      data: obj,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
}