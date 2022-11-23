//Importing Express for Easy API functions building
const Express = require('express');

//Requiring Mongooose functions for Accesing mongoose functionalities and API
const mongoose = require('mongoose');

//Router for API functions
const router = Express.Router();

//Mongoose Model for Structuring The data that to ber flowed in and database
const Product = require('../../Models/ProductScheme')

//Mongoose Model for Structuring The data that to ber flowed in and database
const User = require('../../Models/User.model')

//Importing Middleware functions
const AuthToken = require('../Middleware/AuthToken')
const UserId = require('../Middleware/UserId')

// END POINT 1 : TO ADD PRODUCT INTO THE WISHLIST STATE THAT IS AVAILABLE IN
// THE DATABASE
router.patch('/:productId', AuthToken, UserId, (req, res, next) => {


    //GETTING THE PRODUCT ID FROM THE POST REQUEST BODY 
    const pro_id = req.params.productId ? req.params.productId : null

    //GETTING THE USER_ID FROM THE MIDDLEWARE THAT PARESES THE TOKEN AND GIVE US THE USER_ID
    const userId = req.userUniqueId

        User
        .find({_id: userId},{$addToSet : {wishlist:pro_id}
        },{safe: true, upsert: true, 'new' : true})
        .exec()
        .then((result) => {
            res
            .status(200)
            .json({message: "product Successfully added to wishlist", data: {
                wishlist: result.wishlist
            }})
        })
        .catch((error) => {
            res
                .status(200)
                .json({message: "Sorry!!! we dont find any product maching the same id", error: error})
        })
    });


// END POINT 2 : TO REMOVE PRODUCT FROM THE WISHLIST STATE THAT IS AVAILABLE IN
// THE DATABASE
router.delete('/:productId', AuthToken, UserId, (req, res, next) => {

    //GETTING THE PRODUCT ID FROM THE POST REQUEST BODY 
    const pro_id = req.params.productId
        ? req.params.productId
        : null

    //GETTING THE USER_ID FROM THE MIDDLEWARE THAT PARESES THE TOKEN AND GIVE US THE USER_ID
    const userId = req
        .userUniqueId

        User
        .findByIdAndUpdate({_id: userId},{$pull : {wishlist:pro_id}
        },{safe: true, upsert: true,'new': true})
        .exec()
        .then((result) => {

            res
            .status(200)
            .json({message: "Handling simple post request is successfull", data: {
                wishlist: result.wishlist
            }})

        })
        .catch((error) => {
            res
                .status(404)
                .json({message: "Sorry!!! we dont find any product maching the same id", error: error})
        })
    });

module.exports = router