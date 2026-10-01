const { DataSource } = require("typeorm");
require("dotenv").config();

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "tp_formularios",
  synchronize: true, // Crea/actualiza tablas automáticamente en desarrollo
  logging: false,
  entities: [require("../entities/schema")]
});

module.exports = AppDataSource;