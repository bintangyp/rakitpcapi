import { Sequelize } from "sequelize";

const db = new Sequelize("railway", "root", "MP2qIAlQPp9Zy6F7otiH", {
  host: "containers-us-west-58.railway.app",
  port: "7898",
  dialect: "mysql",
});

export default db;
