const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//CONFIGURING APP WITH BODYPARSER() POLICY ACCESS CONTROLL
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CONFIGURING APP WITH CORS() POLICY ACCES CONTROLL
app.use(cors());

//IMPORTING EMPLOYEE CONTROLLERS
const Productscontroller = require("./Controller/Public/Productscontroller");
const OrdersController = require("./Controller/Public/Orderscontroller");
// const SignupController = require("./Controller/Auth/SignupController");
const SignupController = require("./Controller/Public/Signup.controller");
const SignInController = require("./Controller/Public/Signin.controller");
const CartController = require("./Controller/Public/Cart.controller");
const WishlistController = require("./Controller/Public/Wishlist.controller");
const StocksController = require("./Controller/Public/Stocks.controller");
const PagesController = require("./Controller/Public/Pages.controller");
const PizzaController = require("./Controller/Public/Pizza.controller");
const ScanInsightsController = require("./Controller/Public/ScanInsights.controller");
const TodoController = require("./Controller/Public/Todo.controller");
const ProductsController = require("./Controller/Public/Products.controller");

//INITIALISING THE APP WITH THE CONTROLLER
app.use("/products", Productscontroller);
app.use("/cart", CartController);
app.use("/wishlist", WishlistController);
app.use("/orders", OrdersController);
app.use("/signup", SignupController);
app.use("/signin", SignInController);
app.use("/stocks", StocksController);
app.use("/api/pages", PagesController);
// app.use("/api/pizzas", PizzaController);
app.use("/api/scaninsights", ScanInsightsController);
app.use("/api/todo", TodoController);
app.use("/api/pizza", PizzaController);
app.use("/api/products", ProductsController);

module.exports = app;
