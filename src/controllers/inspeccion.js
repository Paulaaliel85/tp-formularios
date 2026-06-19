const inspecciones = require("../data/inspecciones");
const formularios = require("../data/formularios");

const crearInspeccion = (req, res) => {
  const { empresa, usuario, formularioId } = req.body;

  if (!empresa || !usuario || !formularioId) {
    return res.status(400).json({
      mensaje: "Datos incompletos"
    });
  }

  const formulario = formularios.find(
    f => f.id === Number(formularioId)
  );

  if (!formulario) {
    return res.status(404).json({
      mensaje: "Formulario no encontrado"
    });
  }

  const nuevaInspeccion = {
    id: inspecciones.length + 1,
    ...req.body
  };

  inspecciones.push(nuevaInspeccion);
  res.status(201).json(nuevaInspeccion);
};

const obtenerInspeccionPorId = (req, res) => {
  const id = Number(req.params.id);

  const inspeccion = inspecciones.find(
    (inspeccion) => inspeccion.id === id
  );

  if (!inspeccion) {
    return res.status(404).json({
      mensaje: "Inspeccion no encontrada"
    });
  }

  res.json(inspeccion);
};

const obtenerResumenInspeccion = (req, res) => {
  const id = Number(req.params.id);

  const inspeccion = inspecciones.find(
    i => i.id === id
  );

  if (!inspeccion) {
    return res.status(404).json({
      mensaje: "Inspeccion no encontrada"
    });
  }

  const respuestas = inspeccion.respuestas || [];

  const cumple = respuestas.filter(r => r.respuesta === "CUMPLE").length;
  
  const noCumple = respuestas.filter(r => r.respuesta === "NO_CUMPLE").length;

  const observadas = respuestas.length - cumple - noCumple;

  res.json({
    id: inspeccion.id,
    empresa: inspeccion.empresa,
    cumple,
    noCumple,
    observadas,
    total: respuestas.length
  });
};

module.exports = {
  crearInspeccion,
  obtenerInspeccionPorId,
  obtenerResumenInspeccion,
};