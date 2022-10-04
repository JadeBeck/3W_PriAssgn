const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        writerName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        contents: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("Posts", postsSchema);