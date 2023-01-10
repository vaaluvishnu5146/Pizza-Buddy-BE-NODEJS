//FOR CONNECTING MONGODATABASE
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://xxxxxx:xxxxxxxxxx@2000@cluster0.ez75xfb.xxxxxxxx.net/dbName?retryWrites=true&w=majority",
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
