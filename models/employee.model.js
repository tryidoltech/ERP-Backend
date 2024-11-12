const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: String,
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

module.exports = mongoose.model("Employee", EmployeeSchema);
