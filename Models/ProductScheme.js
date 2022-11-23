const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        small: {
            type: Number,
            required: true
        },
        medium: {
            type: Number,
            required: true
        },
        large: {
            type: Number,
            required: true
        },
        xlarge: {
            type: Number,
            required: true
        },
        xxlarge: {
            type: Number,
            required: true
        }
    },
    skuCode: {
        type: String,
        required: true,
        unique: true
    },
    productDescription: {
        type: String,
        required: true
    },
    technicalDescription: {
        type: Array,
        required: true
    },
    imageSrc: {
        type: String,
        required: true
    },
    imageDetailed: {
        type: Array,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    ratings: {
        type: String,
        required: true
    },
    offer: Boolean,
    offerValue: String,
    new: Boolean,
    isBestSelling: Boolean,
    isStock: Boolean,
    colors: Array,
    sizes: Array,
    tags: Array
});

module.exports = mongoose.model('Product', ProductSchema)

// {    "id": "1",    "productName": "Basic White Round Neck",    "stock": "50",
// "skuCode": "BRN001",    "productDescription": "Basic White Round Neck T-Shirt
// is made using finely knitted threads, biowashed Fabric and Sewed with great
// care. Also it has our brand logo print at the left chest",
// "technicalDescription": [        "0.5 mm Dail", "Inspired vector icons",
// "Very modern style"    ],    "imageSrc":
// "https://cdn.shopify.com/s/files/1/0065/0887/1732/products/3_2ce81626-b847-4fc5-a1e2-bf9e85fc79dd_large.jpg?v=1550384423",
// "imageDetailed": [
// "https://cdn.shopify.com/s/files/1/0065/0887/1732/products/3_2ce81626-b847-4fc5-a1e2-bf9e85fc79dd_large.jpg?v=1550384423",
// "https://cdn.shopify.com/s/files/1/0065/0887/1732/products/3_2ce81626-b847-4fc5-a1e2-bf9e85fc79dd_large.jpg?v=1550384423",
// "https://cdn.shopify.com/s/files/1/0065/0887/1732/products/3_2ce81626-b847-4fc5-a1e2-bf9e85fc79dd_large.jpg?v=1550384423",
// "https://cdn.shopify.com/s/files/1/0065/0887/1732/products/3_2ce81626-b847-4fc5-a1e2-bf9e85fc79dd_large.jpg?v=1550384423",
// "https://cdn.shopify.com/s/files/1/0065/0887/1732/products/3_2ce81626-b847-4fc5-a1e2-bf9e85fc79dd_large.jpg?v=1550384423"
// ],    "price": "299",    "ratings": "3",    "offer": true,    "offervalue":
// "20%",    "new": false,    "isBestSelling": false,    "isStock": true,
// "colors": [        "green", "yellow", "black", "red"    ],    "tags":
/* // ["Fashion", "Men", "Women", "Winter", "red"] } -blue: #007bff;
--indigo:
 * #6610f2;
--purple: #6f42c1;
--pink: #e83e8c;
--red: #dc3545;
--orange:
 * #fd7e14;
--yellow: #ffc107;
--green: #28a745;
--teal: #20c997;
--cyan:
 * #17a2b8;
--white: #fff;
--gray: #868e96;
--gray-dark: #343a40;
--primary:
 * #007bff;
--secondary: #868e96;
--success: #28a745;
--info: #17a2b8;
 * --warning: #ffc107;
--danger: #dc3545;
--light: #f8f9fa;
 */