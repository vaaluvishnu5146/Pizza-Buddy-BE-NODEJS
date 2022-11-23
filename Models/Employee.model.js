const mongoose = require("mongoose");

var EmployeeSchema = new mongoose.Schema({
  FullName: {
    type: String,
  },
  CompanyName: {
    type: String,
  },
  DOB: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  hometown: {
    type: String,
  },
});

mongoose.model("Employee", EmployeeSchema);
