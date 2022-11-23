const mongoose = require('mongoose')

const StockScheme = mongoose.Schema({
    skuCode: {
        type: String,
        require: true
    },
    stock: {
        small: { type: Number, required:true },
        medium: { type: Number, required:true },
        large: { type: Number, required:true },
        xlarge: { type: Number, required:true },
        xxlarge: { type: Number, required:true }
    }
});

const Stock = mongoose.Schema({
    small: {type:Number,required:true},
    medium: {type:Number,required:true},
    large: {type:Number,required:true},
    xlarge: {type:Number,required:true},
    xxlarge: {type:Number,required:true}
})

module.exports = mongoose.model('Stock', StockScheme)