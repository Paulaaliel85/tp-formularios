const express = require("express");

const app = express();

app.use(express.json());

const formularioRoutes = require("./src/routes/formularioRoute.js");

app.use("/formularios", formularioRoutes);

app.get("/", (req, res) => {
  res.json({
    mensaje: "API de inspecciones funcionando"
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});