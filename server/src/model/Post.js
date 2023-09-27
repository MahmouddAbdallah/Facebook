const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'user must be here'],
    },
    title: {
        type: String
    },
    photo: {
        type: String
    },
    video: {
        type: String
    },
    like: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    }]
    ,
    comments: {
        type: Array,
        default: [{}]
    }
}, { timestamps: true })
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;