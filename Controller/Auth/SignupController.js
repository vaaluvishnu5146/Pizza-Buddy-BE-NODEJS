//IMporting Express for Easy API functions building
const Express = require("express");
//Requiring Mongooose functions for Accesing mongoose functionalities and API
const mongoose = require("mongoose");
//Router for API functions
const router = Express.Router();

//Mongoose Model for Structuring The data that to ber flowed in and database
const User = require("../../Models/User.model");

//REQUIRING BCRYPT FROM NODE
const bcrypt = require("bcrypt-nodejs");

//END POINT 1 : TO GET ALL THE USERS THAT IS AVAILABLE IN THE DATABASE
router.get("/", (req, res, next) => {
  User.find()
    .then((result) => {
      if (result < 1) {
        return res
          .status(404)
          .json({ message: "No Entries!! No users!!", data: result });
      }

      return res.status(200).json({
        message: "Handling User GET_REQUEST is Successfull",
        data: result,
      });
    })
    .catch((error) => {
      return res
        .status(200)
        .json({ message: "Handling User GET_REQUEST is Failed", error: error });
    });
});

//END POINT 2 : TO GET THE SPECIFIC USER BY ID THAT IS AVAILABLE IN THE DATABASE
router.get("/:userId", (req, res, next) => {
  const id = req.params.userId ? req.params.userId : null;

  User.findById({ _id: id })
    .then((result) => {
      if (!result) {
        return res
          .status(200)
          .json({ message: "Sorry!! we could'nt find the product" });
      }

      return res.status(200).json({
        message: "Handling /:userId GET_REQUEST is Successfull",
        count: result.length,
        data: result,
      });
    })
    .catch((error) => {
      return res.status(200).json({
        message: "Handling /:userId GET_REQUEST is Failed",
        error: error,
      });
    });
});

//END POINT 3 : TO POST THE SINGLE USER INTO THE DATABASE
router.post("/", (req, res, next) => {
  User.find({ email: req.body.email })
    .then((result) => {
      if (result.length >= 1) {
        return res
          .status(303)
          .json({ message: "Sorry the account already exists" });
      }

      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password,
      });

      return user.save();
    })
    .then((result) => {
      return res.status(201).json({
        message: "Handling / POST_REQUEST is Successfull",
        status: "201",
        response: result,
      });
    })
    .catch((error) => {
      return res
        .status(200)
        .json({ message: "Handling / POST_REQUEST is Failed", error: error });
    });
});

// END POINT 4 : TO DELETE THE SPECIFIC USER BY ID THAT IS AVAILABLE IN THE
// DATABASE
router.delete("/:userId", (req, res, next) => {
  const id = req.params.productId ? req.params.productId : null;

  User.deleteOne({ id })
    .then((result) => {
      res.status(200).json({
        message: "Handling /:userId DELETE_REQUEST is successfull",
        data: result,
      });
    })
    .catch((error) => {
      res.status(200).json({
        message: "Handling /:userId DELETE_REQUEST is Failed",
        error: error,
      });
    });
});

module.exports = router;
