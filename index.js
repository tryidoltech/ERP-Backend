require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./models");
const userRoutes = require("./routes/user.routes");

app.use(express.json());

app.use("/api/users", userRoutes);

db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
  });
});
