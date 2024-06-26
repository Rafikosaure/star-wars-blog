const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    likes: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Like" 
        }
    ],
    createdAt: {
        timestamps: { createdAt: true }
    }
});

module.exports = mongoose.model("Comment", commentSchema);