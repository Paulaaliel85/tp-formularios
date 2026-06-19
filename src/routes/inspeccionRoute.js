const express = require("express");

const router = express.Router();

const {
    crearInspeccion,
    obtenerInspeccionPorId,
    obtenerResumenInspeccion
} = require("../controllers/inspeccion.js");

router.post("/", crearInspeccion);
router.get("/:id/resumen", obtenerResumenInspeccion)
router.get("/:id", obtenerInspeccionPorId);

module.exports = router;

