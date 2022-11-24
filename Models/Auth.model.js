// createdAt: {
//     type: Date,
//     // `Date.now()` returns the current unix timestamp as a number
//     default: Date.now
// }

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthSchema = mongoose.Schema({
  email: { type: Schema.Types.String, required: true },
  password: { type: Schema.Types.String, required: true },
  createdAt: { type: Schema.Types.Date, default: Date.now },
  isAdmin: { type: Schema.Types.Boolean, default: false },
  role: { type: Schema.Types.Array, required: true },
  profile: {
    type: Schema.Types.String,
    required: false,
  },
  town: { type: Schema.Types.String, required: false },
  city: { type: Schema.Types.String, required: false },
  dob: { type: Schema.Types.Date, required: false },
  preferences: { type: Schema.Types.Array, required: false },
});

module.exports = mongoose.model("auth", AuthSchema);
