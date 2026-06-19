const express = require("express");

const router = express.Router();

const {
    crearInspeccion,
    obtenerInspeccionPorId
} = require("../controllers/inspeccion.js");

router.post("/", crearInspeccion);
router.get("/:id", obtenerInspeccionPorId);

module.exports = router;

