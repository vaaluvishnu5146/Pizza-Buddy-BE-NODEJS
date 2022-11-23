//FOR API ROUTES
const express = require("express"); // 30 Thousand

//FOR CONNECTING OUR REQUESTS
const bodyParser = require("body-parser");

//PORT NUMBER
const port = 5000;

//INITIALISING EXPRESS server
const server = express();

//REQURING APP FROM './app'
const app = require("./app");
server.use("/", app);

//CONFIGURING ENV FILE
const dotenv = require("dotenv");
dotenv.config();

//requiring DATABASE FILEFOR INITIALISING
require("./config/databaseConfig");

//WILL PROCESS AND GIVES OUT THE DATA AS JSON ENCODED VARIABLE
// server.use(bodyParser.json());

//COnfiguring MongoDB
// const DB = require('./config/databaseConfig').mongoDBURI;

//CONNECTING DB WITH MONGOOSE MIDDLEWARE

// mongoose.connect(DB, { useNewUrlParser: true })
// .then(()=> console.log("Hurrah!!! Succesfully Connected to Database!!!"))
// .catch(Error => console.log("Error Connecting to Database" + Error));

server.listen(port);
