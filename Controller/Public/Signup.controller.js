//IMporting Express for Easy API functions building
const Express = require("express");
//Requiring Mongooose functions for Accesing mongoose functionalities and API
const mongoose = require("mongoose");
//Router for API functions
const router = Express.Router();

//Mongoose Model for Structuring The data that to ber flowed in and database
const Auth = require("../../Models/Auth.model");

//REQUIRING BCRYPT FROM NODE
const bcrypt = require("bcrypt");
// POST - FOR CREATING A NEW USER
// PARAMS NEEDED FOR CREATING NEW USER
// 1. EMAIL - email. 2. PASSWORD - password, 3. ROLES - roles, 4. CREATED AT - createdAt, 5. IS_ADMIN - isAdmin

const getHasedFunction = (password = "", rounds = 5) => {
  return bcrypt.hashSync(password, rounds);
};

router.post("/", (req, res, next) => {
  const { email, password, isAdmin, roles } = req.body;
  Auth.find({ email: email })
    .then((response) => {
      if (response.length > 0) {
        return res.status(303).json({
          message: "Account already exists",
          status: 303,
        });
      } else {
        const user = new Auth({
          email: email,
          password: getHasedFunction(password, 10),
          isAdmin: isAdmin,
          roles: roles,
        });
        user
          .save()
          .then((response) =>
            res.status(200).json({
              success: true,
              message: "User created successfully",
              status: 201,
            })
          )
          .catch((e) =>
            res.status(200).json({
              error: e,
              message: "Creating user account process failure",
              status: 406,
            })
          );
      }
    })
    .catch((e) => console.log(e));
});

module.exports = router;
