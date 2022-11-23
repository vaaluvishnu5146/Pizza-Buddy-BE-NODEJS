//IMporting Express for Easy API functions building
const Express = require("express");
//Requiring Mongooose functions for Accesing mongoose functionalities and API
const mongoose = require("mongoose");
//Router for API functions
const router = Express.Router();
const Pizza = require("../../Models/pizzaSchema");

//END POINT 1 : TO GET ALL THE PIZZAS THAT IS AVAILABLE IN THE 'PIZZA' COLLECTION DATABASE
router.get("/", (req, res, next) => {
  Pizza.find()
    .then((result) => {
      console.log(result);
      if (result.length <= 0) {
        return res
          .status(200)
          .json({ message: "Sorry no data found", status: 200 });
      }
      res
        .status(200)
        .json({
          message: "Handling simple GET ORDER request is Successfull",
          status: 200,
          count: result.length,
          data: result,
        });
    })
    .catch((error) => {
      res
        .status(200)
        .json({
          message: "Handling simple GET ORDER request is failed",
          status: "404",
          error: error,
        });
    });
});

module.exports = router;

// Pizza
//         .find()
//         .then(result => {
//             if (result.length <= 0) {
//                 res
//                     .status(200)
//                     .json({message: "Sorry no orders found", status: '200'})
//             }
//             res
//                 .status(200)
//                 .json(
//                     {message: "Handling simple GET ORDER request is Successfull", status: '200', count: result.length, data: result}
//                 )
//         })
//         .catch(error => {
//             res
//                 .status(200)
//                 .json(
//                     {message: "Handling simple GET ORDER request is failed", status: '404', error: error}
//                 )
//         })
