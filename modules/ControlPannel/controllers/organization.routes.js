const express = require("express");
const router = express.Router();
const Organization = require("../models/Organization");
const User = require("../models/User");

// Create organization
router.post("/organization", async (req, res) => {
  const { name } = req.body;
  const organization = new Organization({ name });
  await organization.save();
  res.send(organization);
});

// View organizations
router.get("/organizations", async (req, res) => {
  const organizations = await Organization.find();
  res.send(organizations);
});

// Organization details
router.get("/organization/:id", async (req, res) => {
  const organization = await Organization.findById(req.params.id).populate(
    "users"
  );
  res.send(organization);
});

// Edit organization
router.put("/organization/:id", async (req, res) => {
  const organization = await Organization.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.send(organization);
});

// Delete organization
router.delete("/organization/:id", async (req, res) => {
  await Organization.findByIdAndDelete(req.params.id);
  res.send({ message: "Organization deleted" });
});

module.exports = router;
