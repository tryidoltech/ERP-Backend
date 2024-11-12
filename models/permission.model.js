module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Permission", {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  });
};
