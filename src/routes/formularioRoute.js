const express = require("express");
const router = express.Router();


const {
  crearFormulario,
  obtenerFormularios,
  obtenerFormulariosPorId,
  actualizarFormulario,
  eliminarFormulario,
} = require("../controllers/formulario.js");


// rutas
router.post("/", crearFormulario);
router.get("/:id", obtenerFormulariosPorId);
router.get("/", obtenerFormularios);
router.put("/:id", actualizarFormulario);
router.delete("/:id", eliminarFormulario);

module.exports = router;