const express = require("express");
const router = express.Router();
const validateRequest = require("../middlewares/validateRequest");
const { formularioSchema } = require("../validators/schemas");
const {
  crearFormulario,
  obtenerFormularios,
  obtenerFormulariosPorId,
  actualizarFormulario,
  eliminarFormulario,
} = require("../controllers/formulario.js");

<<<<<<< Updated upstream

router.post("/", crearFormulario);
router.get("/:id", obtenerFormulariosPorId);
router.get("/", obtenerFormularios);
router.put("/:id", actualizarFormulario);
=======
router.post("/", validateRequest(formularioSchema), crearFormulario);
router.get("/:id", obtenerFormulariosPorId);
router.get("/", obtenerFormularios);
router.put("/:id", validateRequest(formularioSchema), actualizarFormulario);
>>>>>>> Stashed changes
router.delete("/:id", eliminarFormulario);

module.exports = router;