const AppDataSource = require("../config/database");
const { InspeccionEntity, FormularioEntity } = require("../entities/schema");

const inspeccionRepository = AppDataSource.getRepository(InspeccionEntity);
const formularioRepository = AppDataSource.getRepository(FormularioEntity);

const crearInspeccion = async (req, res) => {
  try {
    const { empresa, usuario, formularioId, respuestas } = req.body;

    const formulario = await formularioRepository.findOne({ where: { id: Number(formularioId) } });
    if (!formulario) {
      return res.status(404).json({ mensaje: "Formulario no encontrado" });
    }

    const nuevaInspeccion = inspeccionRepository.create({
      empresa,
      usuario,
      formularioId: Number(formularioId),
      respuestas
    });

    const resultado = await inspeccionRepository.save(nuevaInspeccion);
    return res.status(201).json(resultado);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al crear inspección", error: error.message });
  }
};

const obtenerInspeccionPorId = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const inspeccion = await inspeccionRepository.findOne({
      where: { id },
      relations: ["respuestas"]
    });

    if (!inspeccion) {
      return res.status(404).json({ mensaje: "Inspección no encontrada" });
    }

    return res.json(inspeccion);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener la inspección", error: error.message });
  }
};

const obtenerResumenInspeccion = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const inspeccion = await inspeccionRepository.findOne({
      where: { id },
      relations: ["respuestas"]
    });

    if (!inspeccion) {
      return res.status(404).json({ mensaje: "Inspección no encontrada" });
    }

    const respuestas = inspeccion.respuestas || [];
    const cumple = respuestas.filter(r => r.respuesta === "CUMPLE").length;
    const noCumple = respuestas.filter(r => r.respuesta === "NO_CUMPLE").length;
    const na = respuestas.filter(r => r.respuesta === "N/A").length;

    return res.json({
      id: inspeccion.id,
      empresa: inspeccion.empresa,
      usuario: inspeccion.usuario,
      formularioId: inspeccion.formularioId,
      cumple,
      noCumple,
      na,
      total: respuestas.length
    });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener resumen de inspección", error: error.message });
  }
};

const actualizarInspeccion = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const inspeccion = await inspeccionRepository.findOne({ where: { id } });

    if (!inspeccion) {
      return res.status(404).json({ mensaje: "Inspección no encontrada" });
    }

    inspeccionRepository.merge(inspeccion, req.body);
    const resultado = await inspeccionRepository.save(inspeccion);

    return res.json({ mensaje: "Inspección actualizada con éxito", inspeccion: resultado });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al actualizar inspección", error: error.message });
  }
};

const eliminarInspeccion = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const inspeccion = await inspeccionRepository.findOne({ where: { id } });

    if (!inspeccion) {
      return res.status(404).json({ mensaje: "Inspección no encontrada" });
    }

    await inspeccionRepository.remove(inspeccion);
    return res.json({ mensaje: "Inspección eliminada con éxito" });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al eliminar la inspección", error: error.message });
  }
};

module.exports = {
  crearInspeccion,
  obtenerInspeccionPorId,
  obtenerResumenInspeccion,
  actualizarInspeccion,
  eliminarInspeccion
};