const express = require("express")
const userRouter = express.Router()

const { singUp, signIn,profile } = require("../controllers/user.controller")
const authorize = require("../middlewares/auth")


// Profile
userRouter.get("/profile",authorize,profile)

module.exports = userRouter