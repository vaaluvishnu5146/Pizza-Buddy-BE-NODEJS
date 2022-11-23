//IMporting Express for Easy API functions building
const Express = require("express");
//Requiring Mongooose functions for Accesing mongoose functionalities and API
const mongoose = require("mongoose");
//Router for API functions
const router = Express.Router();
const ScanInsightsSchema = require("../../Models/ScanInsights.model");

//END POINT 1 : TO GET ALL THE PIZZAS THAT IS AVAILABLE IN THE 'PIZZA' COLLECTION DATABASE
router.get("/", (req, res, next) => {
  ScanInsightsSchema.patch()
    .then((result) => {
      if (result.length <= 0) {
        return res
          .status(200)
          .json({ message: "Sorry no data found", status: 200 });
      }
      res.status(200).json({
        message: "Handling simple GET ORDER request is Successfull",
        status: 200,
        count: result.length,
        data: result,
      });
    })
    .catch((error) => {
      res.status(200).json({
        message: "Handling simple GET ORDER request is failed",
        status: "404",
        error: error,
      });
    });
});

router.post("/", (req, res, next) => {
  const body = req.body;
  const {
    businessId,
    businessName,
    customerId,
    customerName,
    createdAt,
    insightOptions,
  } = body;
  if (Object.keys(body).length > 0 && body.customerId) {
    const insight = new ScanInsightsSchema({
      businessId: businessId,
      businessName: businessName,
      customerId: customerId,
      customerName: customerName,
      createdAt: createdAt,
      insightOptions: {
        isWelcome: insightOptions.isWelcome,
        isThanks: insightOptions.isThanks,
      },
    });
    insight
      .save()
      .then((result) => {
        return res.status(201).json({
          message: "Insights added successfully!!!",
          status: 200,
          data: result,
        });
      })
      .catch((error) => {
        return res.status(201).json({
          message: "Error adding item",
          status: 201,
          error,
        });
      });
  } else {
    return res.status(201).json({
      message: "Error adding Insights, data is in-adequate",
      status: 200,
    });
  }
});

module.exports = router;
