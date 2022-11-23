// createdAt: {
//     type: Date,
//     // `Date.now()` returns the current unix timestamp as a number
//     default: Date.now
// }

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = mongoose.Schema({
    title: { type: Schema.Types.String, required: true },
    task: { type: Schema.Types.String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    todoOptions: { isActive: {
        type: Schema.Types.Boolean,
        default: true,
    }, isClosed: {
        type: Schema.Types.Boolean,
        default: false
    }}
  });

  module.exports = mongoose.model("Todo", TodoSchema);
