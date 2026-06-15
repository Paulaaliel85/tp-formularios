const express = require("express");
const router = express.Router();

const {
  crearFormulario,
  obtenerFormularios
} = require("../controllers/formulario.js");

router.post("/", crearFormulario);
router.get("/", obtenerFormularios);

module.exports = router;