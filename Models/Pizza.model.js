const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// {
//     Name: ‘Margeretta’, // String
//     Description: ‘Marggreeta pizza description’, // String
//     actualPrice:‘299’, // Number
//     sellingPrice: ‘250’, // Number
//     discount: ‘20%’, // String
//     Size: [SM, MD, LG. XL] // Array
//     Toppings: [SPICY|MUSHROOMS|NOODLES|PANEER|CRUMBS|CHEESE|BLACK OLIVE| BABY CORN'],
//     isNew: true, // Boolean
//     isBestSelling: true, // Boolean
//     isVeg: true, // Boolean
//     isNonVeg: false, // Boolean
//     isActive: true, // Boolean
// }

const PizzaSchema = mongoose.Schema({
  name: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: true },
  actualPrice: { type: Schema.Types.Number, required: true },
  sellingPrice: { type: Schema.Types.Number, required: true },
  discount: { type: Schema.Types.String, required: false },
  sizes: { type: Schema.Types.Array, required: true },
  toppings: {
    type: Schema.Types.Array,
    required: true,
    validate: {
      validator: (data) => data.length > 0,
      message: (props) => {
        console.log(props);
        return `Toppings ${props?.value?.length} is not invalid`;
      },
    },
  },
  isNewOne: { type: Schema.Types.Boolean, default: false },
  isActive: { type: Schema.Types.Boolean, default: false },
  isBestSelling: { type: Schema.Types.Boolean, default: false },
  isVeg: { type: Schema.Types.Boolean, default: false },
  isNonVeg: { type: Schema.Types.Boolean, default: false },
});

module.exports = mongoose.model("Pizza", PizzaSchema);
