module.exports = (sequelize, DataTypes) => {
  return sequelize.define("UserPermission", {}, { timestamps: false });
};
