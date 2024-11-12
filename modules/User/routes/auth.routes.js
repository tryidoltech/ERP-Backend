const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.send({ message: "Login successful", user });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

module.exports = router;
