const mongoose = require("mongoose");
const detailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "card",
        required: true
    }

})

const Details = mongoose.model("Details", detailsSchema);
module.exports = Details