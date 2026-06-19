const express = require("express");
const formularioRoutes = require("./src/routes/formularioRoute.js");
const inspeccionRoutes = require("./src/routes/inspeccionRoute.js");

const app = express();

app.use(express.json());

app.use("/formularios", formularioRoutes);
app.use("/inspecciones", inspeccionRoutes);

app.get("/", (req, res) => {
  res.json({
    mensaje: "API de inspecciones funcionando"
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto 3000`);
});