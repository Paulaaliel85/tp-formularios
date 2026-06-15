const formularios = require("../data/furmularios");

const crearFormulario = (req, res) => {
  const nuevoFormulario = {
    id: formularios.length + 1,
    ...req.body
  };

  formularios.push(nuevoFormulario);

  res.status(201).json(nuevoFormulario);
};

const obtenerFormularios = (req, res) => {
  res.json(formularios);
};

module.exports = {
  crearFormulario,
  obtenerFormularios
};