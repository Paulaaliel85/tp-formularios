const AppDataSource = require("../config/database");
const { FormularioEntity } = require("../entities/schema");

<<<<<<< Updated upstream
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
=======
const formularioRepository = AppDataSource.getRepository(FormularioEntity);

const crearFormulario = async (req, res) => {
  try {
    const { titulo, cabecera, categorias } = req.body;
>>>>>>> Stashed changes

    const nuevoFormulario = formularioRepository.create({
      titulo,
      cabecera,
      revision: 1,
      activo: true,
      categorias
    });

    const resultado = await formularioRepository.save(nuevoFormulario);
    return res.status(201).json(resultado);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al crear el formulario", error: error.message });
  }
};

const obtenerFormularios = async (req, res) => {
  try {
    const formularios = await formularioRepository.find({
      where: { activo: true },
      relations: ["categorias", "categorias.preguntas"]
    });
    return res.json(formularios);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener formularios", error: error.message });
  }
};

const obtenerFormulariosPorId = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const formulario = await formularioRepository.findOne({
      where: { id },
      relations: ["categorias", "categorias.preguntas"]
    });

    if (!formulario) {
      return res.status(404).json({ mensaje: "Formulario no encontrado" });
    }

    return res.json(formulario);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener el formulario", error: error.message });
  }
};

const actualizarFormulario = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const formularioExistente = await formularioRepository.findOne({ where: { id } });

    if (!formularioExistente) {
      return res.status(404).json({ mensaje: "Formulario no encontrado" });
    }

    // Marcar el formulario anterior como inactivo (obsoleto)
    formularioExistente.activo = false;
    await formularioRepository.save(formularioExistente);

    // Crear la nueva revisión
    const nuevaRevision = formularioRepository.create({
      titulo: req.body.titulo || formularioExistente.titulo,
      cabecera: req.body.cabecera || formularioExistente.cabecera,
      revision: formularioExistente.revision + 1,
      activo: true,
      categorias: req.body.categorias
    });

    const formularioActualizado = await formularioRepository.save(nuevaRevision);

    return res.json({
      mensaje: "Formulario actualizado con éxito. Se ha generado una nueva revisión.",
      formularioAnteriorId: id,
      formularioNuevo: formularioActualizado
    });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al actualizar el formulario", error: error.message });
  }
};

const eliminarFormulario = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const formulario = await formularioRepository.findOne({ where: { id } });

    if (!formulario) {
      return res.status(404).json({ mensaje: "Formulario no encontrado" });
    }

    await formularioRepository.remove(formulario);
    return res.json({ mensaje: "Formulario eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al eliminar el formulario", error: error.message });
  }
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
<<<<<<< Updated upstream
    crearFormulario,
    obtenerFormularios,
    obtenerFormulariosPorId,
    actualizarFormulario,
    eliminarFormulario,
};

=======
  crearFormulario,
  obtenerFormularios,
  obtenerFormulariosPorId,
  actualizarFormulario,
  eliminarFormulario
};
>>>>>>> Stashed changes
