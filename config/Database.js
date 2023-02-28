import { Sequelize } from "sequelize";

const db = new Sequelize("railway", "root", "AGSEFX5E4g5BruqAabTb", {
  host: "containers-us-west-193.railway.app",
  port: "5888",
  dialect: "mysql",
})

export default db;
