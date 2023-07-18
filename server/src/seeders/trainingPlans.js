const trainingPlansToSeed = [
  {
    name: "Plan 1",
    trainer: {},
    affiliate: {},
    exercises: [
      {
        name: "Bíceps",
        setsAndRepetitions: "3x15",
        weight: 15,
        days: ["lunes", "miércoles", "viernes"]
      },
      {
        name: "Tríceps",
        setsAndRepetitions: "4x20",
        weight: 10,
        days: ["lunes", "miércoles", "viernes"]
      },
      {
        name: "Abdominales",
        setsAndRepetitions: "5x10",
        days: ["lunes", "miércoles", "viernes"]
      },
      {
        name: "Cuádriceps",
        setsAndRepetitions: "5x20",
        weight: 25,
        days: ["martes", "jueves"]
      },
      {
        name: "Press de pecho",
        setsAndRepetitions: "3x10",
        weight: 10,
        days: ["martes", "jueves"]
      },
      {
        name: "Estocadas búlgaras",
        setsAndRepetitions: "4x15",
        weight: 15,
        days: ["martes", "jueves"]
      }
    ]
  },
  {
    name: "Plan 2",
    trainer: {},
    affiliate: {},
    exercises: [
      {
        name: "Sentadillas",
        setsAndRepetitions: "3x15",
        weight: 25,
        days: ["lunes", "miércoles", "viernes"]
      },
      {
        name: "Plancha",
        setsAndRepetitions: "4x20",
        duration: 15,
        days: ["lunes", "miércoles", "viernes"]
      },
      {
        name: "Push-up",
        setsAndRepetitions: "5x10",
        weight: 10,
        days: ["lunes", "miércoles", "viernes"]
      },
      {
        name: "Remo cruzado",
        setsAndRepetitions: "5x20",
        weight: 20,
        days: ["martes", "jueves"]
      },
      {
        name: "Pull-over",
        setsAndRepetitions: "3x10",
        weight: 10,
        days: ["martes", "jueves"]
      },
      {
        name: "Press de hombros",
        setsAndRepetitions: "4x15",
        weight: 15,
        days: ["martes", "jueves"]
      }
    ]
  }
];

module.exports = trainingPlansToSeed;
