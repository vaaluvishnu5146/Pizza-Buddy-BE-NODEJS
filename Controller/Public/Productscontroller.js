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



//END POINT 1 : TO GET ALL THE PRODUCTS THAT IS AVAILABLE IN THE DATABASE
router.get('/', (req, res, next) => {
    Product.find().then(result => {
        res
        .status(200)
        .json({message: "Handling simple GET request is Successfull",data:result})
     }).catch(error => {
        res.status(200)
        .json(
            {message: "Handling simple POST request is Failed", error: error}
        )
     })
});


//END POINT 2 : TO GET THE SPECIFIC PRODUCT BY ID THAT IS AVAILABLE IN THE DATABASE
router.get('/:productId', (req, res, next) => {

    const id = req.params.productId ? req.params.productId : null

    Product.findById(id).then(result => {
        res
        .status(200)
        .json({message: "Handling simple GET request is Successfull",data:result})
     }).catch(error => {
        res.status(200)
        .json(
            {message: "Handling simple POST request is Failed", error: error}
        )
     })
});



router.post('/', (req, res, next) => {
    const product = new Product({
        id: new mongoose.Types.ObjectId(),
        productName: req.body.productName,
        stock: req.body.stock,
        skuCode: req.body.skuCode,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        technicalDescription: req.body.technicalDescription,
        imageSrc: req.body.imageSrc,
        imageDetailed: req.body.imageDetailed,
        price: req.body.price,
        ratings: req.body.ratings,
        offer: req.body.offer,
        offerValue: req.body.offerValue,
        new: req.body.new,
        isBestSelling: req.body.isBestSelling,
        isStock: req.body.isStock,
        colors: req.body.colors,
        sizes: req.body.sizes,
        tags: req.body.tags
    })

    product.save().then( result => {
        res.status(201)
        .json(
            {message: "Handling simple POST request is Successfull", status:'201', data: result}
        )
    }).catch(error => {
        res.status(200)
        .json(
            {message: "Handling simple POST request is Failed", error: error}
        )
    })

    
});

//END POINT 4 : TO DELETE THE SPECIFIC PRODUCT BY ID THAT IS AVAILABLE IN THE DATABASE
router.delete('/:productId', (req, res, next) => {

    const id = req.params.productId ? req.params.productId : null

    Product.deleteOne({_id:id}).then(result => {
        res
        .status(200)
        .json({message: "Handling simple DELETE request is Successfull",data:result})
     }).catch(error => {
        res.status(200)
        .json(
            {message: "Handling simple DELETE request is Failed", error: error}
        )
     })
});

//END POINT 5 : TO TOGGLE THE WISHLIST STATE OF A PRODUCT THAT IS AVAILABLE IN THE DATABASE
router.post('/Wishlist/:productId', AuthToken, UserId, (req, res, next) => {

    const id = req.params.productId ? req.params.productId : null



    // Product.findByIdAndUpdate({_id:id}).then(result => {
        
    //  }).catch(error => {
        
    //  })
});

module.exports = router



//    id: {type:mongoose.Schema.Types.ObjectId,required:true,unique:true},
//    productName: {type:String,required:true,unique:true},
//    stock: {type:String,required:true,min:1},
//    skuCode: req.body.skuCode,
//    productDescription: {type:String,required:true},
//    technicalDescription: {type:Array,required:true},
//    imageSrc: {type:String,required:true},
//    imageDetailed: {type:Array,required:true},
//    price: {type:String,required:true},
//    ratings: {type:String,required:true},
//    offer: Boolean,
//    offerValue: String,
//    new: Boolean,
//    isBestSelling: Boolean,
//    isStock: Boolean,
//    colors: Array,
//    tags: Array