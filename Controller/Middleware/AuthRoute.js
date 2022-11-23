//REQUIRING JWT LIBARARY TO ASSIGN A TOKEN TO LOGGED IN USER
const JWT = require('jsonwebtoken')
//JWT SECRET KEY
const JWT_SECRET_KEY = "LEOTHUNDRA_HANDGRIP_FASHION_WEBAPP"

module.exports = (req, res, next) => {

    const TOKEN = req.Token
    console.log(Token)
    try {
        next()
    } catch (error) {
        return res
            .status(401)
            .json({"success":false, code:401, message: "Un-Authorised Access", token: TOKEN})
    }

}