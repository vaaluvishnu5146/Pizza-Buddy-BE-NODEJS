const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//PRODUCT SCHEMA TO HOLD THE ARRAY OF PRODUCT THAT IS TO BE ADDED TO THE CART
const product = new Schema({
    productColor: {
        type: String,
        required: true
    },
    productSize: {
        type: String,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
    }
})

//CART SCHEMA THAT IS GOING TO BE ACCESSED BY THE CONTROLLER TO SUPPLY VALUE
const CartSchema = mongoose.Schema({
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    productdetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required:true
    },
    products: [product]
});

module.exports = mongoose.model('Cart', CartSchema)