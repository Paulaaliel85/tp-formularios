const formularios = require("../data/formularios");

const crearFormulario = (req, res) => {
  const { titulo , cabecera} = req.body;

if(!titulo || !cabecera) {
  return res.status(400).json({
    mensaje: "Titulo y Cabecera son obligatorios"
  });
}
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
 
const obtenerFormulariosPorId = (req, res) => { 
    const id = Number(req.params.id);

    const formulario = formularios.find(
        (formulario) => formulario.id === id 
    );

    if (!formulario) {
        return res.status(404).json({
            mensaje: "Formulario no encontrado"
        });
    }

    res.json(formulario);
};

module.exports = {
    crearFormulario,
    obtenerFormularios,
    obtenerFormulariosPorId,
};

