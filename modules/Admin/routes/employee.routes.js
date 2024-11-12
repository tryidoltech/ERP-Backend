const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const Task = require("../models/Task");

// Create employee
router.post("/employee", async (req, res) => {
  const { name, organization } = req.body;
  const employee = new Employee({ name, organization });
  await employee.save();
  res.send(employee);
});

// View employees
router.get("/employees", async (req, res) => {
  const employees = await Employee.find().populate("tasks");
  res.send(employees);
});

// Employee details
router.get("/employee/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id).populate("tasks");
  res.send(employee);
});

// Edit employee
router.put("/employee/:id", async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(employee);
});

// Delete employee
router.delete("/employee/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.send({ message: "Employee deleted" });
});

module.exports = router;
