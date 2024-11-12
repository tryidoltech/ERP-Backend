const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const Task = require("../models/Task");

// View employee's tasks
router.get("/:employeeId/tasks", async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.params.employeeId });
  res.send(tasks);
});

// View task details
router.get("/task/:id", async (req, res) => {
  const task = await Task.findById(req.params.id).populate("assignedTo");
  res.send(task);
});

// Update task status
router.put("/task/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(task);
});

module.exports = router;
