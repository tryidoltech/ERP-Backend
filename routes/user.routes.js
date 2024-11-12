const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authenticate = require("../middlewares/auth");

router.post("/create", userController.createUser);
router.post("/reset-password", userController.resetPassword);
router.post("/add-permission", userController.addPermission);
router.post("/assign-permission", userController.assignPermission);
router.post("/login", userController.login);
router.get("/users", authenticate, userController.getAllUsers);
router.get("/users/:id", authenticate, userController.getUserById);
router.put("/users/:id", authenticate, userController.editUser);

module.exports = router;
