const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const OrderSchema = mongoose.Schema({
  id: Schema.Types.ObjectId,
  time: { type: Date, default: Date.now },
  orderedBy: { type: Schema.ObjectId, ref: "User" },
  // productId: mongoose.Schema.Types.ObjectId,
  product: { type: Schema.ObjectId, ref: "Product" },
  orderDetails: { type: Schema.ObjectId, ref: "Cart" },
  paymentMode: { type: String, required: true, default: "COD" },
  isPaid: { type: Boolean, default: false, required: true },
  isOrderCompleted: { type: Boolean, default: false, required: true },
  tracking: {
    isOrderAccepted: { type: Boolean, default: false },
    isOrderProcessed: { type: Boolean, default: false },
    isOrderPacked: { type: Boolean, default: false },
    isOrderShipped: { type: Boolean, default: false },
    isOrderDelivered: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model("Order", OrderSchema);
