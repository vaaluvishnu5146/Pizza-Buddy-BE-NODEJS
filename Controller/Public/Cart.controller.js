//IMporting Express for Easy API functions building
const Express = require('express');
//Router for API functions
const router = Express.Router();
//Importing Middleware functions
const AuthToken = require('../Middleware/AuthToken')
const UserId = require('../Middleware/UserId')
//Mongoose Model for Structuring The data that to ber flowed in and database
const Cart = require('../../Models/CartScheme');
const Order = require('../../Models/OrdersScheme')
const Product = require('../../Models/ProductScheme')

// END POINT 1 : TO GET ALL THE PRODUCTS FROM CART THAT IS AVAILABLE IN THE
// DATABASE IRRESPECTIVE OF USER
router.get('/', (req, res, next) => {

    Cart
        .find()
        .populate('orderedBy','email')
        .populate('productdetails','productName price imageSrc')
        .then((result) => {
            if (result.length > 0) {
                res
                    .status(200)
                    .json(
                        {message: "Cart Items Retrived Successfully", status: 200, data: result, count: result.length}
                    )
            } else {
                res
                    .status(401)
                    .json(
                        {message: "Sorry There are no items in your cart", status: 401, data: result}
                    )
            }
        })
        .catch((error) => {
            res
                .status(404)
                .json(
                    {message: "Sorry!! we are  some internal error", status: 404, data: error}
                )
        })

    });

// END POINT 2 : TO GET THE PRODUCTS FOR USER BY USERID PASSED THROUGH PARAMS
router.get('/userCart', AuthToken, UserId, (req, res, next) => {

    let id = req.userUniqueId
        ? req.userUniqueId
        : null

    Cart
        .find({orderedBy: id})
        .populate('orderedBy')
        .populate('productdetails','productName price imageSrc')
        .then((result) => {
            if (result.length > 0) {
                res.message = "Hurrah!! Cart items retrived successfully"
                res.status = 200
                return res.json(
                    {success: true, message: "Hurrah!! Cart items retrived successfully", status: 200, count: result.length, data: result}
                )

            } else {
                res.message = "Notice: Kindly add Items to your cart"
                res.status = 201
                return res
                    .json({message: "Notice: Kindly add Items to your cart", status:201, data: result})
            }
        })
        .catch((error) => {
            return res
                .status(401)
                .json({message: "Alas!! Currently we face some internal error", error: error})
        })

    });

//END POINT 3 : TO ADD THE PRODUCT TO THE CART MODEL AVAILABLE IN THE DATABASE
router.post('/', AuthToken, UserId, (req, res, next) => {

    //GETTING THE UNIQUR ID FROM THE REQ THAT ATTCHED BY USEID MIDDLEWARE
    //AND ATTACHING IT WITH THE REQ PARAMS ORDEREDBY TO UPDATE THE CART OF THE SPECIFIC USER
    let id = req.userUniqueId
        ? req.userUniqueId
        : null

    //GETTING THE PRODUCTID OF THE USER CHOOSEN PRODUCT FROM THE { REQ > PRODUCTS > PRODUCTID }
    //AND ATTACHING IT WITH THE REQ PARAMS PRODUCTS TO UPDATE THE CART OF THE SPECIFIC USER
    let productId = req.body.products.productId
        ? req.body.products.productId
        : null


    console.log(productId)
    Product
        .find({_id:productId})
        .exec()
        .then((result) => {
            console.log(result)
            if (result.length < 1) {
                return res
                    .status(401)
                    .json({message: "Alas!! We can't find any product", status: 401, data: result})
            } else {
                let cart = new Cart({
                    orderedBy: id,
                    productdetails: productId,
                    products: {
                        productColor: req.body.products.productColor,
                        productSize: req.body.products.productSize,
                        productQuantity: req.body.products.productQuantity
                    }
                })
                cart
                    .save()
                    .then((result) => {
                        return res
                            .status(201)
                            .json(
                                {message: "Hurrah!! Item Added To cart Successfully", status: 200, data: result}
                            )
                    })
            }
        })
        .catch((error) => {
            return res
                .status(401)
                .json(
                    {message: "Alas!! Currently we face some internal error", status: 401, error: error}
                )
        })
    });

router.patch('/:productId', (req, res) => {})

// END POINT 4 : TO DELETE THE SPECIFIC CART ITEM BY ID THAT IS AVAILABLE IN THE
// DATABASE
router.delete('/:productId', (req, res, next) => {

    let id = req.params.productId
        ? req.params.productId
        : null

    Cart
        .deleteOne({_id: id})
        .then((result) => {
            res
                .status(201)
                .json(
                    {message: "Hurrah!! Product deleted successfully", statusCode: 401, data: result}
                )
        })
        .catch((error) => {
            res
                .status(404)
                .json({message: "Alas!! we face some internal error", data: error})
        })

    });

module.exports = router