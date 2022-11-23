//IMporting Express for Easy API functions building
const Express = require('express');
//Requiring Mongooose functions for Accesing mongoose functionalities and API
const mongoose = require('mongoose');
//Router for API functions
const router = Express.Router();
//Importing Middleware functions
const AuthToken = require('../Middleware/AuthToken')
const UserId = require('../Middleware/UserId')
//Mongoose Model for Structuring The data that to ber flowed in and database
const Order = require('../../Models/OrdersScheme')

const Product = require('../../Models/ProductScheme')

//END POINT 1 : TO GET ALL THE PRODUCTS THAT IS AVAILABLE IN THE DATABASE
router.get('/', (req, res, next) => {

    Order
        .find()
        .populate('product', 'productName price')
        .populate('orderedBy', '_id address email')
        .populate('orderDetails', 'products')
        .then(result => {
            if (result.length <= 0) {
                res
                    .status(200)
                    .json({message: "Sorry no orders found", status: '200'})
            }
            res
                .status(200)
                .json(
                    {message: "Handling simple GET ORDER request is Successfull", status: '200', count: result.length, data: result}
                )
        })
        .catch(error => {
            res
                .status(200)
                .json(
                    {message: "Handling simple GET ORDER request is failed", status: '404', error: error}
                )
        })

    });

//END POINT 1.2 : TO GET ALL THE ORDERS THAT IS COMPLETED AND AVAILABLE IN THE DATABASE
router.get('/completed', (req, res, next) => {

    Order
        .find({"isPaid":true})
        .then(result => {
            if (result.length <= 0) {
                res
                    .status(200)
                    .json({message: "Sorry no orders found", status: '200'})
            }
            res
                .status(200)
                .json(
                    {message: "Handling simple GET ORDER request is Successfull", status: '200', count: result.length, data: result}
                )
        })
        .catch(error => {
            res
                .status(200)
                .json(
                    {message: "Handling simple GET ORDER request is failed", status: '404', error: error}
                )
        })

    });


// END POINT 2 : TO GET THE SPECIFIC PRODUCT BY ID THAT IS AVAILABLE IN THE
// DATABASE
router.post('/:orderId', (req, res, next) => {

    const id = req.params.orderId
        ? req.params.orderId
        : null

    Order
        .findById({_id: id})
        .then(result => {
            res
                .status(200)
                .json(
                    {message: "Successfully retrived the order from the database", data: result}
                )
        })
        .catch(error => {
            res
                .status(200)
                .json({message: "Sorry!! we can't find any order with that id", error: error})
        })
    });

//END POINT 3 : TO POST THE SPECIFIC PRODUCT TO THE DATABASE
router.post('/', AuthToken, UserId, (req, res, next) => {

    // GETTING THE UNIQUR ID FROM THE REQ THAT ATTCHED BY USEID MIDDLEWARE AND
    // ATTACHING IT WITH THE REQ PARAMS ORDEREDBY TO UPDATE THE CART OF THE SPECIFIC
    // USER
    let userId = req.userUniqueId
        ? req.userUniqueId
        : null

    Product
        .findById(req.body.productId)
        .exec()
        .then(result => {
            if (!result) {
                res
                    .status(501)
                    .json({message: "Unable to find the Order with that id", status: '501'})
            }

            const order = new Order(
                {orderedBy: userId, productId: req.body.productId, product: req.body.product, orderDetails: req.body.orderDetails}
            )

            return order.save()

        })
        .then((result) => {
            res
                .status(501)
                .json(
                    {message: "Handling simple Orders POST request is Successfull", status: '201', response: result}
                )
        })
        .catch(error => {
            res
                .status(200)
                .json({message: "Handling simple POST request is Failed", error: error})
        })
    });

// END POINT 4 : TO DELETE THE SPECIFIC PRODUCT BY ID THAT IS AVAILABLE IN THE
// DATABASE
router.delete('/:orderId', (req, res, next) => {

    const id = req.params.orderId
        ? req.params.orderId
        : null

    Order
        .deleteOne({_id: id})
        .then(result => {
            res
                .status(200)
                .json({message: "Handling simple DELETE request is Successfull", data: result})
        })
        .catch(error => {
            res
                .status(200)
                .json({message: "Handling simple DELETE request is Failed", error: error})
        })
    });

// END POINT 5 : TO CHANGE THE SPECIFIC PRODUCT ORDER ACCEPTED STATUS BY ID THAT
// IS AVAILABLE IN THE DATABASE & CHANGING THE STATUS FOR THAT ORDER
router.patch('/tracking/isOrderAccepted/:orderId', (req, res) => {

    const id = req.params.orderId
        ? req.params.orderId
        : null

    Order
        .findByIdAndUpdate({
            _id: id
        }, {
            $set: {
                "tracking.isOrderAccepted": "true"
            }
        }, {
            safe: true,
            upsert: true,
            'new': true
        })
        .exec()
        .then(result => {
            res
                .status(200)
                .json(
                    {message: "Successfully retrived the order from the database", data: result}
                )
        })
        .catch(error => {
            res
                .status(200)
                .json({message: "Sorry!! we can't find any order with that id", error: error})
        })
    });

// END POINT 6 : TO CHANGE THE SPECIFIC PRODUCT ORDER PROCESED STATUS BY ID THAT
// IS AVAILABLE IN THE DATABASE & CHANGING THE STATUS FOR THAT ORDER
router.patch('/tracking/isOrderProcessed/:orderId', (req, res) => {

    const id = req.params.orderId
        ? req.params.orderId
        : null

    Order
        .findByIdAndUpdate({
            _id: id
        }, {
            $set: {
                "tracking.isOrderProcessed": "true"
            }
        }, {
            safe: true,
            upsert: true,
            'new': true
        })
        .exec()
        .then(result => {
            res
                .status(200)
                .json(
                    {message: "Successfully retrived the order from the database", data: result}
                )
        })
        .catch(error => {
            res
                .status(200)
                .json({message: "Sorry!! we can't find any order with that id", error: error})
        })
    });

// END POINT 5 : TO CHANGE THE SPECIFIC PRODUCT ORDER PACKED STATUS BY ID THAT
// IS AVAILABLE IN THE DATABASE & CHANGING THE STATUS FOR THAT ORDER
router.patch('/tracking/isOrderPacked/:orderId', (req, res) => {

    const id = req.params.orderId
        ? req.params.orderId
        : null

    Order
        .findByIdAndUpdate({
            _id: id
        }, {
            $set: {
                "tracking.isOrderPacked": "true"
            }
        }, {
            safe: true,
            upsert: true,
            'new': true
        })
        .exec()
        .then(result => {
            res
                .status(200)
                .json(
                    {message: "Successfully retrived the order from the database", data: result}
                )
        })
        .catch(error => {
            res
                .status(200)
                .json({message: "Sorry!! we can't find any order with that id", error: error})
        })
    });

// END POINT 5 : TO CHANGE THE SPECIFIC PRODUCT ORDER SHIPPED STATUS BY ID THAT
// IS AVAILABLE IN THE DATABASE & CHANGING THE STATUS FOR THAT ORDER
router.patch('/tracking/isOrderShipped/:orderId', (req, res) => {

    const id = req.params.orderId
        ? req.params.orderId
        : null

    Order
        .findByIdAndUpdate({
            _id: id
        }, {
            $set: {
                "tracking.isOrderShipped": "true"
            }
        }, {
            safe: true,
            upsert: true,
            'new': true
        })
        .exec()
        .then(result => {
            res
                .status(200)
                .json(
                    {message: "Successfully retrived the order from the database", data: result}
                )
        })
        .catch(error => {
            res
                .status(200)
                .json({message: "Sorry!! we can't find any order with that id", error: error})
        })
    });

// END POINT 5 : TO CHANGE THE SPECIFIC PRODUCT ORDER DELIVERED STATUS BY ID
// THAT IS AVAILABLE IN THE DATABASE & CHANGING THE STATUS FOR THAT ORDER
router.patch('/tracking/isOrderDelivered/:orderId', (req, res) => {

    const id = req.params.orderId
        ? req.params.orderId
        : null

    Order
        .findByIdAndUpdate({
            _id: id
        }, {
            $set: {
                "tracking.isOrderDelivered": "true",
                isPaid: true,
                isOrderCompleted:true
            }
        }, {
            safe: true,
            upsert: true,
            'new': true
        })
        .exec()
        .then(result => {
            res
                .status(200)
                .json(
                    {message: "Successfully retrived the order from the database", data: result}
                )
        })
        .catch(error => {
            res
                .status(200)
                .json({message: "Sorry!! we can't find any order with that id", error: error})
        })
    });

module.exports = router