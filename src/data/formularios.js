const formularios = [
  {
    id: 1,
    titulo: "Seguridad e Higiene - Protocolo Planta Industrial",
    cabecera: "Inspección General de Planta V1",
    revision: 1,
    categorias: [
      {
        nombre: "Sistemas de Extinción (Matafuegos)",
        preguntas: [
          { id: 1, texto: "¿Los matafuegos del sector tienen la oblea vigente?" },
          { id: 2, texto: "¿La señalización tipo balizamiento es visible a 1.40 metros?" }
        ]
      },
      {
        nombre: "Vías de Evacuación",
        preguntas: [
          { id: 3, texto: "¿Las salidas de emergencia hacia el punto de encuentro están despejadas?" }
        ]
      }
    ]
  }
];
module.exports = formularios;

