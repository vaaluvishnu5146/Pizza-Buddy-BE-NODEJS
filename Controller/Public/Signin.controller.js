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

module.exports = router;

// const user = new Auth({
//   email: email,
//   password: getHasedFunction(password, 10),
//   isAdmin: isAdmin,
//   roles: roles,
// });
// user
//   .save()
//   .then((response) =>
//     res.status(200).json({
//       data: response,
//       message: "User created successfully",
//       status: 201,
//     })
//   )
//   .catch((e) =>
//     res.status(200).json({
//       error: e,
//       message: "Creating user account process failure",
//       status: 406,
//     })
//   );
