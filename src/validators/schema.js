const Joi = require("joi");

const preguntaSchema = Joi.object({
  texto: Joi.string().required().messages({
    "any.required": "El texto de la pregunta es obligatorio"
  }),
  imagenUrl: Joi.string().uri().optional().allow(null, ""),
  orden: Joi.number().integer().min(1).optional()
});

const categoriaSchema = Joi.object({
  nombre: Joi.string().required().messages({
    "any.required": "El nombre de la categoría es obligatorio"
  }),
  orden: Joi.number().integer().min(1).optional(),
  preguntas: Joi.array().items(preguntaSchema).min(1).required().messages({
    "array.min": "Cada categoría debe contener al menos una pregunta"
  })
});

const formularioSchema = Joi.object({
  titulo: Joi.string().required().messages({
    "any.required": "El título del formulario es obligatorio"
  }),
  cabecera: Joi.string().required().messages({
    "any.required": "La cabecera es obligatoria"
  }),
  categorias: Joi.array().items(categoriaSchema).min(1).required().messages({
    "array.min": "Debe incluir al menos una categoría"
  })
});

const respuestaSchema = Joi.object({
  preguntaId: Joi.number().integer().required(),
  respuesta: Joi.string().valid("CUMPLE", "NO_CUMPLE", "N/A").required().messages({
    "any.only": "La respuesta solo puede ser CUMPLE, NO_CUMPLE o N/A"
  })
});

const inspeccionSchema = Joi.object({
  empresa: Joi.string().required().messages({
    "any.required": "El nombre de la empresa es obligatorio"
  }),
  usuario: Joi.string().required().messages({
    "any.required": "El usuario/inspector es obligatorio"
  }),
  formularioId: Joi.number().integer().required(),
  respuestas: Joi.array().items(respuestaSchema).min(1).required()
});

module.exports = {
  formularioSchema,
  inspeccionSchema
};