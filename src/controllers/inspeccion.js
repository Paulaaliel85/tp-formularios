const inspecciones = require("../data/inspecciones");
const formularios = require("../data/formularios");

const crearInspeccion = (req, res) => {
  const { empresa, usuario, formularioId } = req.body;
// Validamos campos obligatorios de datos de la empresa 
  if (!empresa || !usuario || !formularioId) {
    return res.status(400).json({
      mensaje: "Datos incompletos"
    });
  }
// Verificamos que el formulario exista en el sistema
  const formulario = formularios.find(
    f => f.id === Number(formularioId)
  );
// En caso de que no existe se muestra el mensaje "Formulario no encontrado"
  if (!formulario) {
    return res.status(404).json({
      mensaje: "Formulario no encontrado"
    });
  }
// Registra la inspección con las preguntas respondidas 
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

const actualizarInspeccion = (req, res) => {
  const id = Number(req.params.id);
  const index = inspecciones.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({
       mensaje: "Inspección no encontrada" 
      });
  }

  inspecciones[index] = { id, ...req.body };
  res.json({ 
    mensaje: "Inspección actualizada con éxito",
     inspeccion: inspecciones[index] 
    });
};

const eliminarInspeccion = (req, res) => {
  const id = Number(req.params.id);
  const index = inspecciones.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({
       mensaje: "Inspección no encontrada" 
      });
  }

  inspecciones.splice(index, 1);
  res.json({ 
    mensaje: "Inspección eliminada con éxito" 
  });
};

module.exports = {
  crearInspeccion,
  obtenerInspeccionPorId,
  obtenerResumenInspeccion,
  actualizarInspeccion,
  eliminarInspeccion
};