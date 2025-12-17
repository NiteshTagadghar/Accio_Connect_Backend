const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const ALL_BATCH = {
    OBH_1 : "OBH_1",
    OBH_2 : "OBH_2",
    OBH_3 : "OBH_3"
}


const LOCATION = ["hyderabad","noida","pune","chennai","bengaluru"]

const COURSE_TYPE = ["mern",'java',"da"]


// Sign Up
async function singUp(req, res, next) {
    const body = req.body
    const batch = body.batch
    const location = body.centreLocation
    const courseType = body.courseType

    // Verify email exists in accio database
    // To be done

    // Verify batch in system
    if(!ALL_BATCH[batch]){
      return  res.err(400,"Given batch doesnt exists")
    }

    console.log(LOCATION,location,!LOCATION.includes(location),'location details')
    // Verify location of centres from system
    if(!LOCATION.includes(location)){
        return res.err(400,"Centre not present in given location")
    }

    // Verify course type
    if(!COURSE_TYPE.includes(courseType)){
        return res.err(400,"Course type invalid")
    }

    console.log(body)

    // If password not filled
    if (!body.password) {
        return res.err(400, 'Password is required')
    }

    try {
        const hashedPassword = await bcrypt.hash(body.password, 10)


        const userExists = await User.findOne({ email: body.email })

        if (userExists) {
            return res.err(400, "User already exists")
        }

        // Update password to hashed password
        // body.password = hashedPassword

        console.log(body,'body to create a new user')



        const newUser = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phoneNumber: body.phoneNumber,
            password: hashedPassword,
            batch : body.batch,
            centreLocation : body.centreLocation,
            courseType : body.courseType,
            isInstructor : body.isInstructor || false,
            profilePicture : body.profilePicture
        })

        // const newUser = await User.create(body)

        if (newUser) {
            res.success(201, 'User created successfully', newUser)
        }
    } catch (err) {
        next({message : err.message})
    }


}

// Sign in
async function signIn(req, res, next) {
    const { email, password } = req.body

    if (!email) {
        res.err(400, "Provide email")
    }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            res.err(404, "User not found")
        }


        // Step 1 : Check if valid password
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            next({ status: 401, message: "Incorrect password" })
        }

        // Step 2 : Generate a token using jwt
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        )

        console.log(token, 'token generated from jwt')

        // Step 3 : Send token in cookies where js wont be able to read cookies
        // res.cookie('accioConnect-token', token, {
        //     httpOnly: true,
        //     secure: false,
        //     sameSite: "none"

        // })

        console.log("step 3 worked fine")


        // Dont return password to client

        // Step 4 : Success call
        res.success(200, "ok", user)




    } catch (err) {
        next({})
    }




}

// Profile
async function profile( req, res, next) {
    console.log("calling profile", req.userDecoded)

    try {
        // Step 1 : Find user by id take it from authorize
        const user = await User.findById(req.userDecoded.id, '-password')


        // Step 2 : return user details but not password
        res.success(200, "ok", user)

    } catch (err) {
        next({})
    }

}

module.exports = { singUp, signIn, profile }






/* 
1. Only people connected to accio will be able to use Accio_Connect
2. Two types of posts Referal Posts, General feed/posts
3. User can send/get connect request
4. Users will be able to chat with each other after they are connected
5. Both type of posts will have like and comment features
6. User will be able to see everyones post doesnt matter if connected or not
7. Search bar to search user
8. User should be able to add either of them in post image, video, blog/text
9. User should be able to see the online status of other users
10. User should see his own profile as well as others profile
11. User can block the comment section while creating post and can also delete post
12. Admin can delete anyones post/ comment/ user/ 
13. Admint dashboard where admin can see reported users/ post with user comments why user reported and counts
14. Add fiel in User model isPlaced : boolean, placedInfo : {orgName:String,role/designation:String,package?:Number, }, createdAt : timestamp
    User will add all placed details including offer letter sends request to admin to verify once verified all placed users will be seen by tick batch
15. Profile visit count



Flow chart
Step 1 : Sign up page 
         Only people/users present inside acciojob database can signup and use accio_connect

Step 2 : Sign in page
         Include token authentication and password hashing

Step 3 : User lands on home page
         User should see header section with Logo, Search bar, Theme toggle, Profile Section
         User should see all the posts in body section 
         Side bar should contain these modules chat, referal posts, create posts
         Right side of posts can display recently placed students

Step 4 : Once clicked on profile
         Profile page should open and user should be able to see only users posts/other info

Step 5 : Once clicked on create post
         A pop up should be opened with form
         Ask Type of post, if general give drop down to select which post image, video, blog, give input box to type caption, give option to block comment section and like section
         if referal post, org name, role name, location, text area as same as blog (if user wants to share more ifno)

Step 6 : Once clicked on chat 
         Open a chat page where user can see all other existing users
         User will be able to chat only with connected users
         If not connected user will see only name and profile image and a connect button once clicked a connect request will be gone to the other user

Step 7 : Once clicked on referal posts
         User should see only referal posts in body and within the same page 
         Give an option to diselect the referal posts













PHASE - 1

Sign Up
Sing In
Home page (All posts, Profile posts, Search, Theme)(Side bar, Referal posts,Create New Post )(Posts with like and comment)

*/




