const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    },

    titleAr:{
        type: String,
        required: [true, "Title is required"]
    },

    descriptionAr:{
        type: String,
        required: [true, "Description is required"]
    },

    date:{
        type: Date,
        default: Date.now
    },
    counter:{
        type: Number,
        default: 0
    },
    category:{
        type: String,
        required: [true, "Category is required"],
        enum: ["Ai", "Front End", "Back End", "Flutter", "Others"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    venue: {
        type: String,
        required: [true, "Venue is required"]
    }
})

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;