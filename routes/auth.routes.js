const express = require("express")
const authRouter = express.Router()


const {signUp,signIn} = require("../controllers/user.controller")

// Sign Up
authRouter.post("/signUp",signUp)
// Route = http://localhost:8000/auth/signUp


// Sign In
authRouter.post("/signIn",signIn)
// Route = http://localhost:8000/auth/signIn



module.exports = authRouter