const express = require("express")
const userRouter = express.Router()

const { singUp, signIn,profile } = require("../controllers/user.controller")
const authorize = require("../middlewares/auth")


console.log("executing router")
// Sign up
userRouter.post("/signUp",singUp)

// Sign in
userRouter.post("/signIn",signIn)

// Profile
userRouter.get("/profile",authorize,profile)

module.exports = userRouter