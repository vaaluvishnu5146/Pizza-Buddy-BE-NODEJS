//IMporting Express for Easy API functions building
const Express = require("express");
//Requiring Mongooose functions for Accesing mongoose functionalities and API
const mongoose = require("mongoose");
//Router for API functions
const router = Express.Router();

//Mongoose Model for Structuring The data that to ber flowed in and database
const Auth = require("../../Models/Auth.model");

//REQUIRING JWT LIBARARY TO ASSIGN A TOKEN TO LOGGED IN USER
const JWT = require("jsonwebtoken");

//JWT SECRET KEY
const JWT_SECRET_KEY = "GUVI_LEARNING_FULL_STACK";

//REQUIRING BCRYPT FROM NODE
const bcrypt = require("bcrypt");
const { response } = require("../../app");

const getHasedFunction = (password = "", rounds = 5) => {
  return bcrypt.hashSync(password, rounds);
};

const checkPasswordMatch = (password = "", hashedpassword = "") => {
  return bcrypt.compareSync(password, hashedpassword);
};

// POST - FOR SIGNIN A NEW USER
// PARAMS NEEDED FOR SIGNING A USER
// 1. EMAIL - email. 2. PASSWORD - password
router.post("/", (req, res, next) => {
  const { email, password } = req.body;
  Auth.find({ email: email })
    .then((response) => {
      if (response.length < 1) {
        return res.status(400).json({
          data: response,
          message: "Account is missing",
          status: 400,
        });
      } else {
        if (!password || !checkPasswordMatch(password, response[0].password)) {
          return res.status(403).json({
            message: "Password is wrong",
            status: 403,
          });
        } else {
          // WE KNOW THAT USER IS EXIST IN DB
          // PASSWORD IS MATCHING
          // SEND A JWT TOKEN TO USER
          let tokenData = {
            email: response[0].email,
            role: response[0].role,
          };
          let TokenOptions = {
            expiresIn: "1h",
          };
          const Token = JWT.sign(tokenData, JWT_SECRET_KEY, TokenOptions);
          return res.status(200).json({
            success: true,
            message: "Authenticated Succesfully",
            Token,
            status: 200,
          });
        }
      }
    })
    .catch((e) => console.log(e));
});

// GET
/*

  QUERY-PARAMS:
  email: test@test.com

*/
router.post("/checkUser", (req, res, next) => {
  const { email } = req.body;
  Auth.find({
    email: email,
  })
    .then((response) => {
      if (response && response.length > 0) {
        const userData = {
          email: response[0].email,
        };
        return res.status(200).json({
          success: true,
          data: userData,
          message: "Account exists",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Account doesn't exists",
        });
      }
    })
    .catch();
});

// POST
// ABILITY TO CHECK WHETHER USER PROVIDED EMAIL IS ALREADY EXISTS
// IF ACCOUNT DOESNT EXISTS -> SEND RESPONSE -> Account doesnt exists
// IF ACCOUNT EXISTS -> GET ->
// NEW PASSWORD -> String -> VARCHAR -> REQUIRED
// USER EMAIL -> Unique -> VARCHAR -> REQUIRED

router.post("/forgotpassword", (req, res, next) => {
  const { email = "", password = "" } = req.body;
  if (password.length < 1) {
    return res.status(200).json({
      message: "Password is not valid",
      success: false,
    });
  }
  try {
    Auth.updateOne(
      { email: email },
      {
        password: getHasedFunction(password, 10),
      },
      (err, docs) => {
        if (err) {
          return res.status(400).json({
            error: err,
            message: "Password couldnt be updated!!!",
          });
        } else {
          return res.status(201).json({
            success: true,
            message: "Password updated successfully!!!",
          });
        }
      }
    );
  } catch (error) {
    return res.status(400).json({
      error: error,
      message: "Password couldnt be updated!!!",
    });
  }
});

router.post("/updateProfile", (req, res, next) => {
  const {
    email = "",
    profile = "",
    town = "",
    city = "",
    dob = "",
    preferences = [],
  } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "No Account found with the given email address",
    });
  }
  try {
    Auth.updateOne(
      { email: email },
      {
        city: city,
        profile: profile,
        town: town,
        dob: dob,
        preferences: preferences,
      }
    )
      .then((response) => {
        return res.status(201).json({
          success: true,
          data: response,
          message: "Profile updated successfully!!!",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error: err,
          message: "Profile couldnt be updated!!!",
        });
      });
  } catch (error) {
    return res.status(400).json({
      error: error,
      message: "Profile couldnt be updated!!!",
    });
  }
});

module.exports = router;
