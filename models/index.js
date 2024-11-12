const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, Sequelize);
db.Permission = require("./permission.model")(sequelize, Sequelize);
db.UserPermission = require("./userPermission.model")(sequelize, Sequelize);

db.User.belongsToMany(db.Permission, { through: db.UserPermission });
db.Permission.belongsToMany(db.User, { through: db.UserPermission });

module.exports = db;
