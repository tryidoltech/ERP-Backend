const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const Task = require("../models/Task");

// Create task
router.post("/task", async (req, res) => {
  const { title, description, assignedTo } = req.body;
  const task = new Task({ title, description, assignedTo });
  await task.save();
  res.send(task);
});

// View tasks
router.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

// Task details
router.get("/task/:id", async (req, res) => {
  const task = await Task.findById(req.params.id).populate("assignedTo");
  res.send(task);
});

// Edit task
router.put("/task/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(task);
});

// Delete task
router.delete("/task/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send({ message: "Task deleted" });
});

module.exports = router;
