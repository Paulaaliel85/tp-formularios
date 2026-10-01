const { EntitySchema } = require("typeorm");

const FormularioEntity = new EntitySchema({
  name: "Formulario",
  tableName: "formularios",
  columns: {
    id: { primary: true, type: "int", generated: true },
    titulo: { type: "varchar" },
    cabecera: { type: "varchar" },
    revision: { type: "int", default: 1 },
    activo: { type: "boolean", default: true },
    created_at: { type: "timestamp", createDate: true }
  },
  relations: {
    categorias: {
      target: "Categoria",
      type: "one-to-many",
      inverseSide: "formulario",
      cascade: true
    }
  }
});

const CategoriaEntity = new EntitySchema({
  name: "Categoria",
  tableName: "categorias",
  columns: {
    id: { primary: true, type: "int", generated: true },
    nombre: { type: "varchar" },
    orden: { type: "int", default: 1 }
  },
  relations: {
    formulario: {
      target: "Formulario",
      type: "many-to-one",
      onDelete: "CASCADE"
    },
    preguntas: {
      target: "Pregunta",
      type: "one-to-many",
      inverseSide: "categoria",
      cascade: true
    }
  }
});

const PreguntaEntity = new EntitySchema({
  name: "Pregunta",
  tableName: "preguntas",
  columns: {
    id: { primary: true, type: "int", generated: true },
    texto: { type: "varchar" },
    imagenUrl: { type: "varchar", nullable: true }, // Soporte para imagen adjunta (máx 1)
    orden: { type: "int", default: 1 }
  },
  relations: {
    categoria: {
      target: "Categoria",
      type: "many-to-one",
      onDelete: "CASCADE"
    }
  }
});

const InspeccionEntity = new EntitySchema({
  name: "Inspeccion",
  tableName: "inspecciones",
  columns: {
    id: { primary: true, type: "int", generated: true },
    empresa: { type: "varchar" },
    usuario: { type: "varchar" },
    formularioId: { type: "int" },
    created_at: { type: "timestamp", createDate: true }
  },
  relations: {
    respuestas: {
      target: "Respuesta",
      type: "one-to-many",
      inverseSide: "inspeccion",
      cascade: true
    }
  }
});

const RespuestaEntity = new EntitySchema({
  name: "Respuesta",
  tableName: "respuestas",
  columns: {
    id: { primary: true, type: "int", generated: true },
    preguntaId: { type: "int" },
    respuesta: { 
      type: "enum", 
      enum: ["CUMPLE", "NO_CUMPLE", "N/A"] 
    }
  },
  relations: {
    inspeccion: {
      target: "Inspeccion",
      type: "many-to-one",
      onDelete: "CASCADE"
    }
  }
});

module.exports = {
  FormularioEntity,
  CategoriaEntity,
  PreguntaEntity,
  InspeccionEntity,
  RespuestaEntity
};