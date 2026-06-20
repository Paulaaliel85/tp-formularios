const express = require("express");

const router = express.Router();

const {
    crearInspeccion,
    obtenerInspeccionPorId,
    obtenerResumenInspeccion,
    actualizarInspeccion,
    eliminarInspeccion,
} = require("../controllers/inspeccion.js");

router.post("/", crearInspeccion);
router.get("/:id/resumen", obtenerResumenInspeccion)
router.get("/:id", obtenerInspeccionPorId);
router.put("/:id", actualizarInspeccion);
router.delete("/:id", eliminarInspeccion);

module.exports = router;

