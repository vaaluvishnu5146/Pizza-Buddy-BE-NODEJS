// THIS MIDDLEWARE IS USED TO EXRACT THE EMAIL, PASSWORD, USER ROLE 
// FROM THE 'req.Token' from AUTHTOKEN MIDDLEWARE. AND FIND THE _id
// OF THE USER TO USE THE USER ID TO RETRIVE THE CART ITEMS
const User = require('../../Models/User.model')

module.exports = (req, res, next) => {

    let email = req.Token.email ? req.Token.email : null
    if (email === "") {
        res.message = "ALAS: TOKEN DOESNT HAVE ANY DETAILS"
        return res.json(
            {success: false, message: "ALAS: TOKEN DOESNT HAVE ANY DETAILS", status: 401}
        )
    }
    else {

        User
            .find({email: email})
            .exec()
            .then((result) => {
                req.userUniqueId = result[0]._id
                next()
            }).catch(error=>{
                console.log(error)
            })
        //req.userUniqueId = decodedToken
        
     }
}