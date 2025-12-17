
const mongoose = require('mongoose')

// https://course.acciojob.com/

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePicture : {
        type : String // url
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password : {
        type : String
    },
    batch : {
        type : String, // OBH-5 etc
        required : true
    },
    isInstructor : {
        type : Boolean,
        required : true
    },
    centreLocation : {
        type : String, // Hyd,Noida,Pune,Banglore,Chennai
        required : true
    },
    courseType : {
        type : String, // MERN,JAVA,DA
        required :true
    }
}, { timestamps: true })


// Model
const User = mongoose.model('User', userSchema)

module.exports = User