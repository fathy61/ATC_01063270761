const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
    language:{
        type: String,
        enum: ["en", "ar"],
        required: [true, "language is required"]
    },
    title: {
        type: String,
        default: "",
        required: [true, "title is required" ],
    },
    description: {
        type: String,
        default: "",
        required: [true, "description is required" ]
    },
    title2:{
        type: String,
        default: "",
    },
    description2:{
        type: String,
        default: "",
    },
    title3:{
        type: String,
        default: "",
    },
    description3:{
        type: String,
        default: "",
    },
    phoneNumber: {
        type: String,
        default: "",
    },

}, { timestamps: true });

const AboutUs = mongoose.model('AboutUs', aboutUsSchema);

module.exports = AboutUs;
