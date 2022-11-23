//FOR CONNECTING MONGODATABASE
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://username:password@cluster0.ez75xfb.mongodb.net/pizzabuddy?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Error occured");
      console.log("Sorry we got error" + err);
    } else {
      console.log("CONNECTED");
    }
  }
);
