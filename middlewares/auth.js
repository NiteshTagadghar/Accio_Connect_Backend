const jwt = require("jsonwebtoken")

function authorize(req,res,next){

    // Step 1 : Get cookie from client
    const token = req.cookies["accioConnect-token"]
    console.log(token,'token in authorze function')

    if(!token){
       return res.err(401,"No token passed")
    }
    // Step 2 : Verfiy token from jwt
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)

    if(!decoded){
       return res.err(403,"Token not valid")
    }


    req.userDecoded = decoded


    // Step 3 : Move next
    next()




}

module.exports = authorize