//REQUIRING JWT LIBARARY TO ASSIGN A TOKEN TO LOGGED IN USER
const JWT = require('jsonwebtoken')
//JWT SECRET KEY
const JWT_SECRET_KEY = "PIZZA_BUDDY_WEBAPP"

module.exports = (req, res, next) => {

    let TOKEN = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';

    if(req.headers.authorization === ""){
        res.message = "ERROR: UNAUTHORIZED ACCESS"
        return res.json({success: false, message: "ERROR: UNAUTHORIZED ACCESS", status: 401})
    }
    try {
        const decodedToken = JWT.verify(TOKEN, JWT_SECRET_KEY)
        req.Token = decodedToken
        next()
    } catch (error) {
        res.message = "ERROR: UNAUTHORIZED ACCESS"
        return res.json({success: false, message: "ERROR: UNAUTHORIZED ACCESS", status: 401})
    }
    
}