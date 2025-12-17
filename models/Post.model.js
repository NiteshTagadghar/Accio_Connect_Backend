const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    user: {
        type: String, // User Id
        required: true
    },
    contentType: {
        type: String,// img,video,blog
        required: true
    },
    content: {
        type: String, // Add only string for now , the string might include link of video or image
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


// Create one more schema and store postSchema in array will pick in PHASE-2
// const posts = new mongoose.Schema(
// { postId : id,
//  posts : [{},{}],
//  userId : {userDetails},
//  likes : [],
//  comments : [],
//  isLikesDisabled : false,
//  isCommentDisabled : false,
//  type : Srting,
//  caption : String
// })


const Post = mongoose.model('Post', postSchema)
