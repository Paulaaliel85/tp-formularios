# tp-formularios
Creamos un crud donde se pueden cargar formularios nuevos, con categorias y preguntas, formularios realizados y consultar sobre formularios cargados 

1. Gestión de Formularios: Permite definir la estructura de estos formularios Categorías y Preguntas respondidas, tambien consultar formularios cargados.

2. Gestión de Inspecciones: Permite registrar las respuestas reales de una empresa ("CUMPLE", "NO_CUMPLE", "N/A").






## UTILIZAMOS COMO PRUEBA

# Creamos estrutura 
 POST / formularios

{
  "titulo": "Seguridad e Higiene - Protocolo Planta Industrial",
  "cabecera": "Inspección General de Planta V1",
  "categorias": [
    {
      "nombre": "Sistemas de Extinción (Matafuegos)",
      "preguntas": [
        { "id": 1, "texto": "¿Los matafuegos del sector tienen la oblea vigente?" },
        { "id": 2, "texto": "¿La señalización tipo balizamiento es visible a 1.40 metros?" }
      ]
    },
    {
      "nombre": "Vías de Evacuación",
      "preguntas": [
        { "id": 3, "texto": "¿Las salidas de emergencia hacia el punto de encuentro están despejadas?" }
      ]
    }
  ]
}

 # Inspección de empresa 
POST / inspecciones

{
  "empresa": "YPF S.A. - Refinería Luján de Cuyo",
  "usuario": "Ing. Néstor",
  "formularioId": 1,
  "respuestas": [
    { "preguntaId": 1, "respuesta": "CUMPLE" },
    { "preguntaId": 2, "respuesta": "NO_CUMPLE" },
    { "preguntaId": 3, "respuesta": "N/A" }
  ]
}


 # Consultamos resumen
GET /inspecciones/1/resumen

{
  "id": 1,
  "empresa": "YPF S.A. - Refinería Luján de Cuyo",
  "cumple": 1,
  "noCumple": 1,
  "observadas": 1,
  "total": 3
}

# Validamos nueva revision 
PUT /formularios/1


