//IMporting Express for Easy API functions building
const Express = require('express');
//Router for API functions
const router = Express.Router();
//Mongoose Model for Structuring The data that to ber flowed in and database
const Cart = require('../../Models/CartScheme');
const Order = require('../../Models/OrdersScheme')
const Product = require('../../Models/ProductScheme')

// END POINT 1 : TO GET ALL THE PRODUCTS FROM CART THAT IS AVAILABLE IN THE
// DATABASE
router.get('/', (req, res, next) => {});

// END POINT 2 : TO GET THE SPECIFIC CART PRODUCT BY ID THAT IS AVAILABLE IN THE
// DATABASE
router.get('/:orderId', (req, res, next) => {});

//END POINT 3 : TO ADD THE PRODUCT TO THE CART AVAILABLE IN THE DATABASE
router.post('/', (req, res, next) => {});

// END POINT 4 : TO DELETE THE SPECIFIC CART ITEM BY ID THAT IS AVAILABLE IN THE
// DATABASE
router.delete('/:orderId', (req, res, next) => {});

module.exports = router