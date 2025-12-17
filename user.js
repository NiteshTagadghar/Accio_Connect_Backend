const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const cookieParser = require("cookie-parser")
const dotEnv = require("dotenv")
const User = require('./models/User.model')
const userRouter = require('./routes/user.routes')


const app = express()

dotEnv.config()

app.use(cors({origin : "http://localhost:5173", credentials : true}  ))
app.use(express.json())
app.use(cookieParser())

// Connection to database
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("DB Connected"))
    .catch(err => console.log("DB Connection failed",err))




const PORT = 8000


// Create success and failure middleware
app.use((req, res, next) => {

    // Success response
    res.success = (status, message, data = null) => {
        res.status(status).json({
            success: true,
            message,
            data: { data }
        })
    }

    // Error response
    res.err = (status, message) => {
        res.status(status).json({
            success: false,
            message
        })
    }
    next()

})

// app.use("/auth",authRouter)

// Call routers 
app.use("/user",userRouter)

// app.use("/post",postRouter)




// Sign Up
// app.post('/singUp',
//     async(req,res,next)=>{
//     const body = req.body


//     console.log(body)

//     // If password not filled
//     if(!body.password) {
//         return res.err(400,'Password is required')
//     }

//     try{
//         const hashedPassword = await bcrypt.hash(body.password,10)

//         console.log(hashedPassword,'hashed password')

//         const userExists = await User.findOne({email : body.email})

//         if(userExists){
//             return res.err(400,"User already exists")
//         }

//         const newUser = await User.create({
//             firstName : body.firstName,
//             lastName : body.lastName,
//             email : body.email,
//             phoneNumber : body.phoneNumber,
//             password : hashedPassword
//         })

//         if(newUser){
//             res.success(201,'User created successfully', newUser)
//         }
//     }catch(err){
//         next({})
//     }


// })


// Sign in api
// app.post('/signIn',
//     async(req,res,next)=>{
//     const {email,password} = req.body

//     if(!email){
//         res.err(400,"Provide email")
//     }

//     try{
//         const user = await User.findOne({email})
    
//         if(!user){
//             res.err(404,"User not found")
//         }


//         // Step 1 : Check if valid password
//         const isPasswordValid = await bcrypt.compare(password,user.password)

//         if(!isPasswordValid){
//             next({status : 401,message : "Incorrect password"})
//         }

//         // Step 2 : Generate a token using jwt
//         const token = jwt.sign(
//             {id:user._id,email : user.email},
//             process.env.JWT_SECRET_KEY,
//             {expiresIn : "7d"}
//         )

//         console.log(token,'token generated from jwt')

//         // Step 3 : Send token in cookies where js wont be able to read cookies
//         res.cookie('accioConnect-token',token,{
//             httpOnly : true,
//             secure : false,
//             sameSite : "none" 

//         })

//         console.log("step 3 worked fine")

//         // Step 4 : Success call
//         res.success(200,"ok",user)




//     }catch(err){
//         next({})
//     }




// })

// Authorisation middleware
// function authorize(req,res,next){

//     // Step 1 : Get cookie from client
//     const token = req.cookies["accioConnect-token"]
//     console.log(token,'token in authorze function')

//     if(!token){
//        return res.err(401,"No token passed")
//     }
//     // Step 2 : Verfiy token from jwt
//     const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)

//     if(!decoded){
//        return res.err(403,"Token not valid")
//     }


//     // req.userDecoded = decoded


//     // Step 3 : Move next
//     next(decoded)




// }


// Create api for profile 
// app.get("/profile",authorize,
//     async(userDecoded,req,res,next)=>{
//     console.log("calling profile",req.userDecoded,userDecoded)

//     try{
//         // Step 1 : Find user by id take it from authorize
//         const user = await User.findById(userDecoded.id,'-password')

    
//         // Step 2 : return user details but not password
//         res.success(200,"ok",user)

//     }catch(err){
//         next({})
//     }

// }
// )



// // Create a new user
// app.post('/createUser', async (req, res, next) => {
//     const user = req.body

//     try {


//         const createResponse = await User.create(user)

//         res.success(201, 'ok', createResponse)


//     } catch (err) {
//         console.log('Error while creating user', err, err.message)
//         err.status = 400
//         next(err)
//     }
// })


// // Get all users 
// app.get('/users', async (req, res, next) => {
//     try {
//         const users = await User.find()

//         res.success(200, 'ok', users)
//     } catch (err) {
//         next(err)
//     }
// })


// // Get user by id
// app.get('/user/:id', async (req, res, next) => {
//     const id = req.params.id

//     try {
//         const user = await User.findById(id)

//         if (user) {
//             res.success(200, "ok", user)
//         } else {
//             console.log(user, 'user in else condtion')
//             throw new Error('User not found')
//         }

//     } catch (err) {
//         err.status = 404
//         next(err)
//     }
// })


// // Update user by PUT
// app.put('/updateUser/:id', async (req, res, next) => {
//     const id = req.params.id

//     try {
//         const user = await isUserExists(id)

//         if (!user) {
//             throw new Error('User not found')
//         }
//         const updatedUser = await User.findOneAndReplace({ _id: id }, req.body, { new: true, runValidators: true })

//         res.success(200, 'ok', updatedUser)
//     } catch (err) {
//         err.status = 404

//         next(err)
//     }

// })


// // Update partially
// app.patch('/updateUser/:id', async (req, res, next) => {
//     const id = req.params.id

//     console.log(req.body, 'calling patch')


//     try {

//         const user = await isUserExists(id)

//         if (!user) {
//             throw new Error('User not found')
//         }

//         const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

//         res.success(200, 'ok', updatedUser)

//     } catch (err) {
//         err.status = 404
//         next(err)
//     }
// })

// // Delete user by id
// app.delete('/deleteUser/:id', async (req, res, next) => {
//     const id = req.params.id

//     try {

//         // Check if user exists
//         const user = await isUserExists(id)

//         if (!user) {
//             throw new Error('User not found')
//         }

//         const deltedUser = await User.findByIdAndDelete(id)

//         res.success(200, 'ok', deltedUser)

//     } catch (err) {
//         err.status = 404
//         next(err)
//     }
// })


// // Common function to check if user exists
// async function isUserExists (id){
//     try{
//         const user = await User.findById(id)
//         if(user) {
//             return true
//         }else{
//             return false
//         }
//     }catch(err){
//         return false
//     }
// }


// Error middleware



app.use((err, req, res, next) => {
    console.log('message =>', err.message)
    console.log(err,'error')
    res.err(err.status || 500, err.message || 'Internal Server Error')
    next()
})









app.listen(PORT, () => console.log(`Server running on port ${PORT}`))