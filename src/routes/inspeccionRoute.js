const express = require("express");
const router = express.Router();
const validateRequest = require("../middlewares/validateRequest");
const { inspeccionSchema } = require("../validators/schemas");
const {
  crearInspeccion,
  obtenerInspeccionPorId,
  obtenerResumenInspeccion,
  actualizarInspeccion,
  eliminarInspeccion,
} = require("../controllers/inspeccion.js");

router.post("/", validateRequest(inspeccionSchema), crearInspeccion);
router.get("/:id/resumen", obtenerResumenInspeccion);
router.get("/:id", obtenerInspeccionPorId);
router.put("/:id", validateRequest(inspeccionSchema), actualizarInspeccion);
router.delete("/:id", eliminarInspeccion);

module.exports = router;