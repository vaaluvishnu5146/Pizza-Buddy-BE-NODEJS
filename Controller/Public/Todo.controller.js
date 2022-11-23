//IMporting Express for Easy API functions building
const Express = require("express");
//Requiring Mongooose functions for Accesing mongoose functionalities and API
const mongoose = require("mongoose");
const TodoSchema = require("../../Models/Todo.model");
//Router for API functions
const router = Express.Router();
// const ScanInsightsSchema = require("../../Models/ScanInsights.model");

// STEP: 1 GET ALL TODOS FROK TODOS COLLECTION
router.get("/", (req, res, next) => {
  return res
    .status(200)
    .json({ message: "SERVER ACCEPTED YOUR REQUEST", status: 200 });
});

// STEP: 2 SAVE A TODO IN TODO'S COLLECTION
router.post("/", (req, res, next) => {
  console.log(req);

  const body = req.body;
  const { title = "", task = "", createdAt = "", todoOptions = {} } = body;
  // if(Object.keys(body).length > 0 && title !== null) {
  //     const Todo = new TodoSchema({
  //         title,
  //         task,
  //         createdAt,
  //         todoOptions,
  //     });
  //     Todo.save().then((result) => {
  //         return res.status(201).json({
  //             message: "Todo added successfully!!!",
  //             status: 201,
  //             data: result,
  //           });
  //     }).catch((error) => {
  //         return res.status(200).json({
  //             message: "Error adding todo!!!",
  //             status: 200,
  //             data: error,
  //           });
  //     })
  // } else {
  //     return res
  //       .status(200)
  //       .json({ message: "SERVER ACCEPTED YOUR REQUEST", status: 200 });
  // }
});

module.exports = router;
