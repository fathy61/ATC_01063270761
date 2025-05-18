const AboutUs = require("../models/aboutUs");

exports.getAboutUs = async (req, res) => {
  try {
    const { language } = req.query;
    const aboutUs = await AboutUs.findOne({ language }).select("-__v -createdAt -updatedAt");
    res.status(200).json({
      message: "About Us fetched successfully",
      data: aboutUs,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.addAboutUs = async (req, res) => {
  try {
    const { title, description, language } = req.body;
    const aboutUs = await AboutUs.findOne({ language });
    if (aboutUs) {
      aboutUs.title = title;
      aboutUs.description = description;
      req.body.title2 ? (aboutUs.title2 = req.body.title2) : null;
      req.body.description2
        ? (aboutUs.description2 = req.body.description2)
        : null;
      req.body.title3 ? (aboutUs.title3 = req.body.title3) : null;
      req.body.description3
        ? (aboutUs.description3 = req.body.description3)
        : null;
      await aboutUs.save();
      return res.status(200).json({
        message: "About Us updated successfully",
        data: aboutUs,
        error: false,
      });
    } else if (!aboutUs) {
      const newAboutUs = new AboutUs({ title, description, language });

      req.body.title2 ? (newAboutUs.title2 = req.body.title2) : null;
      req.body.description2
        ? (newAboutUs.description2 = req.body.description2)
        : null;
      req.body.title3 ? (newAboutUs.title3 = req.body.title3) : null;
      req.body.description3
        ? (newAboutUs.description3 = req.body.description3)
        : null;

      await newAboutUs.save();
      res.status(201).json({
        message: "About Us added successfully",
        data: newAboutUs,
        error: false,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, error: true });
  }
};

