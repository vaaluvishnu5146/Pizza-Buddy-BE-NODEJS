const Express = require("express");
const res = require("express/lib/response");
//Requiring Mongooose functions for Accesing mongoose functionalities and API
const mongoose = require("mongoose");
//Router for API functions
const router = Express.Router();
const Fooditem = require("../../Models/Product.model");

router.get("/", (req, res) => {
  console.log("HIT");
  Fooditem.find().then((data) => {
    if (data.length <= 0) {
      return res.status(200).json({
        message: "No data found",
        data: [],
      });
    }
    return res.status(200).json({
      message: "Food items fetched",
      data: data,
    });
  });
});

router.post("/", (req, res) => {
  const { body } = req;
  console.log(body);
  const FoodItem = new Fooditem({
    name: body.name,
    description: body.description,
    actualPrice: body.actualPrice,
    image: body.image,
    isActive: body.isActive,
    isVeg: body.isVeg,
    isNonVeg: body.isNonVeg,
  });
  FoodItem.save()
    .then((response) =>
      res.status(200).json({
        data: response,
        message: "Product successfully created",
        status: "200",
      })
    )
    .catch((e) => {
      res.status(401).json({
        error: e,
        message: "Data is in-valid",
        status: "401",
      });
    });
  //   return res.json({
  //     data: [],
  //     message: "GET REQUESTED HITTED",
  //   });
});

module.exports = router;
