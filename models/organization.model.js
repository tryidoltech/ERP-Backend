const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  name: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Organization", OrganizationSchema);
