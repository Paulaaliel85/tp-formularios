const express = require("express");
const router = express.Router();
const validateRequest = require("../middlewares/validateRequest");
const { inspeccionSchema } = require("../validators/schemas");
const {
<<<<<<< Updated upstream
    crearInspeccion,
    obtenerInspeccionPorId,
    obtenerResumenInspeccion,
    actualizarInspeccion,
    eliminarInspeccion,
=======
  crearInspeccion,
  obtenerInspeccionPorId,
  obtenerResumenInspeccion,
  actualizarInspeccion,
  eliminarInspeccion,
>>>>>>> Stashed changes
} = require("../controllers/inspeccion.js");

router.post("/", validateRequest(inspeccionSchema), crearInspeccion);
router.get("/:id/resumen", obtenerResumenInspeccion);
router.get("/:id", obtenerInspeccionPorId);
<<<<<<< Updated upstream
router.put("/:id", actualizarInspeccion);
=======
router.put("/:id", validateRequest(inspeccionSchema), actualizarInspeccion);
>>>>>>> Stashed changes
router.delete("/:id", eliminarInspeccion);

module.exports = router;