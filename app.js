require("dotenv").config();
const express = require("express");
const AppDataSource = require("./src/config/database");
const formularioRoutes = require("./src/routes/formularioRoute.js");
const inspeccionRoutes = require("./src/routes/inspeccionRoute.js");

const app = express();
app.use(express.json());

app.use("/formularios", formularioRoutes);
app.use("/inspecciones", inspeccionRoutes);

app.get("/", (req, res) => {
  res.json({ mensaje: "API de inspecciones funcionando correctamente" });
});

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Conexión a la Base de Datos establecida correctamente");
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en puerto ${PORT}`);
    });
  })
  .catch((error) => console.log("Error al conectar con la Base de Datos:", error));