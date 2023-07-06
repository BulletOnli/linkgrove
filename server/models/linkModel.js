const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a Title"],
    },
    url: {
        type: String,
        required: [true, "Please add a URL"],
    },
    thumbnail: {
        url: {
            type: String,
        },
        id: {
            type: String,
        },
    },
    likes: {
        type: Number,
        default: 0,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("Link", linkSchema);
