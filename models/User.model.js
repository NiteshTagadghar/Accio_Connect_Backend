
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
    },
    isPlaced : {
        type : Boolean, // True if student placed or false
        required : true
    },
    organisationName : {
        type : String // If placed can specify orgnaization name
    },
    role :{
        type : String // If placed what is the current role in organization
    }

}, { timestamps: true })


// Model
const User = mongoose.model('User', userSchema)

module.exports = User