const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const options = new Schema({
  isWelcome: { type: Boolean, default: false },
  isThanks: { type: Boolean, default: false },
});

const ScanInsightsSchema = mongoose.Schema({
  id: Schema.Types.ObjectId,
  customerName: { type: Schema.Types.String, required: true },
  customerId: { type: Schema.Types.String, required: true },
  businessName: { type: Schema.Types.String, required: true },
  businessId: { type: Schema.Types.String, required: true },
  createdAt: { type: Schema.Types.Date, required: true },
  insightOptions: options,
});

module.exports = mongoose.model("Scan", ScanInsightsSchema);
