const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const db = require("../models");
const User = db.User;
const Permission = db.Permission;
const UserPermission = db.UserPermission;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generatePassword = () => crypto.randomBytes(6).toString("hex");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "User not found." });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password." });

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ message: "Login successful.", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  const { username } = req.body;
  const password = generatePassword();

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: "Your Account Password",
      text: `Your account password is: ${password}`,
    });

    const user = await User.create({ username, password });
    res.json({
      message: "User created and password sent via email.",
      password,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { username } = req.body;
  const password = generatePassword();

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "User not found." });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: "Password Reset",
      text: `Your new password is: ${password}`,
    });

    res.json({ message: "Password reset and sent via email." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addPermission = async (req, res) => {
  const { name } = req.body;

  try {
    const [permission, created] = await Permission.findOrCreate({
      where: { name },
    });
    res.json({
      message: created ? "Permission created" : "Permission already exists",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign a permission to a user
exports.assignPermission = async (req, res) => {
  const { username, permissionName } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    const permission = await Permission.findOne({
      where: { name: permissionName },
    });

    if (!user || !permission)
      return res.status(404).json({ message: "User or Permission not found." });

    await user.addPermission(permission);
    res.json({ message: "Permission assigned to user." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "User not found." });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, permissions } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found." });

    if (username) user.username = username;
    if (email) user.email = email;

    if (permissions) {
      const permissionRecords = await Permission.findAll({
        where: { id: permissions },
      });
      await user.setPermissions(permissionRecords);
    }

    await user.save();
    res.json({ message: "User updated successfully.", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
