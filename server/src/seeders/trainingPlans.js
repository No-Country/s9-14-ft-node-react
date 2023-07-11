const trainingPlansToSeed = [
  {
    trainer: {},
    affiliate: {},
    exercises: [
      {
        name: "Bíceps",
        sets: 3,
        repetitionsOrDuration: 15,
        days: ["lunes", "miércoles", "viernes"]
      },
      {
        name: "Tríceps",
        sets: 4,
        repetitionsOrDuration: 20,
        days: ["lunes", "miércoles", "viernes"]
      },
      {
        name: "Abdominales",
        sets: 5,
        repetitionsOrDuration: 10,
        days: ["lunes", "miércoles", "viernes"]
      },
      {
        name: "Cuádriceps",
        sets: 5,
        repetitionsOrDuration: 20,
        days: ["martes", "jueves"]
      },
      {
        name: "Press de pecho",
        sets: 3,
        repetitionsOrDuration: 10,
        days: ["martes", "jueves"]
      },
      {
        name: "Estocadas búlgaras",
        sets: 4,
        repetitionsOrDuration: 15,
        days: ["martes", "jueves"]
      }
    ]
  },
  {
    trainer: {},
    affiliate: {},
    exercises: [
      {
        name: "Sentadillas",
        sets: 3,
        repetitionsOrDuration: 15,
        days: ["lunes", "miércoles", "viernes"]
      },
      {
        name: "Plancha",
        sets: 4,
        repetitionsOrDuration: 20,
        isRepetitions: false,
        days: ["lunes", "miércoles", "viernes"]
      },
      {
        name: "Push-up",
        sets: 5,
        repetitionsOrDuration: 10,
        days: ["lunes", "miércoles", "viernes"]
      },
      {
        name: "Remo cruzado",
        sets: 5,
        repetitionsOrDuration: 20,
        days: ["martes", "jueves"]
      },
      {
        name: "Pull-over",
        sets: 3,
        repetitionsOrDuration: 10,
        days: ["martes", "jueves"]
      },
      {
        name: "Press de hombros",
        sets: 4,
        repetitionsOrDuration: 15,
        days: ["martes", "jueves"]
      }
    ]
  }
];

module.exports = trainingPlansToSeed;
