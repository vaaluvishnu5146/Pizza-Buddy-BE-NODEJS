//IMporting Express for Easy API functions building
const Express = require("express");
//Requiring Mongooose functions for Accesing mongoose functionalities and API
const mongoose = require("mongoose");
//Router for API functions
const router = Express.Router();

//Mongoose Model for Structuring The data that to ber flowed in and database
const User = require("../../Models/User.model");

//REQUIRING BCRYPT FROM NODE
const bcrypt = require("bcrypt");

//REQUIRING JWT LIBARARY TO ASSIGN A TOKEN TO LOGGED IN USER
const JWT = require("jsonwebtoken");

//JWT SECRET KEY
const JWT_SECRET_KEY = "GUVI_LEARNING_FULL_STACK";
//MIDDLEWARE FOR CHECKING USER HAS SENT THE TOKEN
const AuthRoute = require("../Middleware/AuthRoute");
//MIDDLE WARE FOR CHECKING USER SENT TOKEN IS VALID AND MATCHES THE USER
const AuthToken = require("../Middleware/AuthToken");

//END POINT 1 : TO GET ALL THE USERS THAT IS AVAILABLE IN THE DATABASE
router.get("/", (req, res, next) => {
  User.find()
    .then((result) => {
      if (result < 1) {
        res
          .status(404)
          .json({ message: "No Entries!! No users!!", data: result });
      }

      res.status(200).json({
        message: "Handling User GET_REQUEST is Successfull",
        data: result,
      });
    })
    .catch((error) => {
      res
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
        res.status(200).json({ message: "Sorry!! we could'nt find the user" });
      }
      res.status(200).json({
        message: "Handling /:userId GET_REQUEST is Successfull",
        count: result.length,
        data: result,
      });
    })
    .catch((error) => {
      res.status(200).json({
        message: "Handling /:userId GET_REQUEST is Failed",
        error: error,
      });
    });
});

//HELPER FUNCTION TO CHECK WHETHER PASSWORD IS MATCHING
function checkPassword(userEntered, serverFound) {
  let uE = userEntered ? userEntered : null;
  let sE = serverFound ? serverFound : null;
  if (uE === sE) {
    return true;
  }
  return false;
}

//END POINT 3 : TO POST THE SINGLE USER INTO THE DATABASE
router.post("/", (req, res, next) => {
  const email = req.body.email !== "" ? req.body.email : "";
  const password = req.body.password !== "" ? req.body.password : "";

  //CHECKING WHETHER EMAIL IS AVAILABLE IN REQUEST
  if (email === null) {
    res.message = "ERROR: KINDLY ENTER VALID EMAIL";
    return res.json({
      success: false,
      message: "ERROR: KINDLY ENTER VALID EMAIL",
      status: 401,
    });
  }

  //CHECKING WHETHER PASSWORD IS AVAILABLE IN REQUEST
  if (password === null) {
    res.message = "ERROR: KINDLY ENTER PASSWORD";
    return res.json({
      success: false,
      message: "ERROR: KINDLY ENTER PASSWORD",
      status: 401,
    });
  }

  //MOVING ON WITH EMAIL AND CHECKING WHETHER USER IS AVAILABLE IN DATABASE OR NOT
  User.find({ email: email }).then((result) => {
    if (result.length < 1) {
      res.message = "ERROR: KINDLY ENTER VALID EMAIL";
      return res.json({
        success: false,
        message: "ERROR: KINDLY ENTER VALID EMAIL",
        status: 404,
      });
    } else if (!checkPassword(password, result[0].password)) {
      res.message = "ERROR: PASSWORD DONT MATCH";
      return res.json({
        success: false,
        message: "ERROR: PASSWORD DONT MATCH",
        status: 404,
      });
    } else {
      let tokenData = {
        email: result[0].email,
        password: result[0].password,
        role: "user",
      };
      let TokenOptions = {
        expiresIn: "1h",
      };
      const Token = JWT.sign(tokenData, JWT_SECRET_KEY, TokenOptions);
      return res.json({
        success: true,
        message: "Authenticated Succesfully",
        Token,
        status: 200,
      });
    }
  });
});

//END POINT 4: TO CHECK AND VERIFY THE USER TOKEN IS VALID OR NOT
router.post("/verify", AuthToken, (req, res) => {
  let Token = req.headers.authorization;
  res.message = "AUTHORIZATION SUCCESSFULL";
  return res.json({
    code: 200,
    success: true,
    message: "AUTHORIZATION SUCCESSFULL",
    Token,
  });
});

module.exports = router;
