import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UsersModel.js";

const { DataTypes } = Sequelize;

const Storage = db.define(
  "storage",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    slotType: DataTypes.STRING,
    size: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default Storage;

Users.hasMany(Storage);
Storage.belongsTo(Users, { foreignKey: "userId" });

(async () => {
  await db.sync();
})();
