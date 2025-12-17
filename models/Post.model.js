const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    contentType: {
        type: String,// img,video,blog
        required: true
    },
    content: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    type: {
        type: String, // referal-post or general-post
        required: true
    },
    isLikeDisabled: {
        type: Boolean
    },
    isCommentDisabled: {
        type: Boolean
    },
    likes: [
        {
            profilePic: { type: String, required: true },
            userName: { type: String, required: true },
            userId: { type: String, required: true }
        }
    ],
    comments: [
        {
            profilePic: { type: String, required: true },
            userName: { type: String, required: true },
            userId: { type: String, required: true },
            comment: { type: String, required: true },
            createdAt: { type: Date, default: Date.now() }

        },

    ]



})

const Post = mongoose.model('Post', postSchema)
