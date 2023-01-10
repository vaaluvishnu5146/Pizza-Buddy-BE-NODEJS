const mongoose = require("mongoose");

const FoodItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  actualPrice: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  isVeg: {
    type: Boolean,
    required: true,
    default: false,
  },
  isNonVeg: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Fooditem", FoodItemSchema);
