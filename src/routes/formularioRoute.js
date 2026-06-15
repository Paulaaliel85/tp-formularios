const express = require("express");
const router = express.Router();

const {
  crearFormulario,
  obtenerFormularios,
  obtenerFormulariosPorId
} = require("../controllers/formulario.js");


// rutas
router.post("/", crearFormulario);
router.get("/:id", obtenerFormulariosPorId);
router.get("/", obtenerFormularios);

module.exports = router;