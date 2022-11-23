//IMporting Express for Easy API functions building
const Express = require('express');
//Requiring Mongooose functions for Accesing mongoose functionalities and API
const mongoose = require('mongoose');
//Router for API functions
const router = Express.Router();
//Mongoose Model for Structuring The data that to ber flowed in and database
const Product = require('../../Models/ProductScheme')
//Mongoose Model for Structuring The data that to ber flowed in and database
const Stock = require('../../Models/StockScheme')
//REQUIRING MIDDLEARE AuthRoute TO DOUBLE CHECK USER AUTHENTICATION
const AuthRoute = require('../Middleware/AuthRoute')

// END POINT 1 : TO GET THE STOCK OF THE PRODUCT BY ITS ID THAT IS AVAILABLE IN
// THE DATABASE
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
        ? req.params.productId
        : null
    Stock
        .findById(id)
        .select("skucode stock")
        .then(result => {
            res
                .status(200)
                .json({message: "Handling simple GET request is Successfull", data: result})
        })
        .catch(error => {
            res
                .status(200)
                .json({message: "Handling simple POST request is Failed", error: error})
        })
    });

// END POINT 2 : TO POST THE ORDER OF THE PRODUCT BY ID THAT IS AVAILABLE IN THE
// DATABASE
router.patch('/:productId', (req, res, next) => {

    console.log(req.body)

    let id = req.params.productId

    let stock = {
        small: req.body.small,
        medium: req.body.medium,
        large: req.body.large,
        xlarge: req.body.xlarge,
        xxlarge: req.body.xxlarge
    }

    Product
        .findByIdAndUpdate({
            _id: id
        }, {
            $set: {
                stock: stock
            }
        }, {new: true})
        .then(result => {
            res
                .status(201)
                .json(
                    {message: "Handling simple PATCH request is Successfull", status: '201', data: result}
                )
        })
        .catch(error => {
            res
                .status(201)
                .json(
                    {message: "Handling simple PATCH request is Failed", status: '401', error: error}
                )
        })

    });

module.exports = router
