const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: String, // e.g., 'pending', 'completed'
});

module.exports = mongoose.model("Task", TaskSchema);
