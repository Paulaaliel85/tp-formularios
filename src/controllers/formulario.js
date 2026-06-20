const formularios = require("../data/formularios");

const crearFormulario = (req, res) => {
  const { titulo , cabecera} = req.body;
// Evitamos que se guarden formularios vacios 
if(!titulo || !cabecera) {
  return res.status(400).json({
    mensaje: "Titulo y Cabecera son obligatorios"
  });
}
// Aca capturamos de forma dinamica el array de categprias y preguntas ordenadas
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

const actualizarFormulario = (req, res) => {
  const id = Number(req.params.id);
  const index = formularios.findIndex(f => f.id === id);

  if (index === -1) {
    return res.status(404).json({
      mensaje:"Formulario no encontrado"
    });
  }
// Al crear el formulario por primera vez comenzara con REVISION: 1 
// Al actualizarlo use la variable revisionActual sumandole 1 para marcar que el formulario anterios quedo obsoleto.
  const revisionActual = formularios[index].revision || 1;

  formularios[index] = {id, 
    ...req.body,
  revision: revisionActual + 1
};
  res.json({
    mensaje: "Formulario actualizado con exito" ,
    formulario: formularios[index]
  });
}
const eliminarFormulario = (req, res) => {
  const id = Number(req.params.id);
  const index = formularios.findIndex(f => f.id === id);

  if (index === -1 ) {
    return res.status(404).json ({
      mensaje: "Formulario no encontrado"
    });
  }
  formularios.splice(index, 1)
  res.json({
    mensaje: "Formulario eliminado con exito"
  });

};


module.exports = {
    crearFormulario,
    obtenerFormularios,
    obtenerFormulariosPorId,
    actualizarFormulario,
    eliminarFormulario,
};

