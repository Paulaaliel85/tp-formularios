const inspecciones = require("../data/inspecciones");

const crearInspeccion = (req, res) => {
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

module.exports = {
  crearInspeccion,
  obtenerInspeccionPorId,
};
