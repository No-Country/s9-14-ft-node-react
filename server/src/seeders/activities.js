const activitiesToSeed = [
  {
    name: "Body Pump",
    description:
      "Es una clase que se realiza con una barra y discos, desarrolla la fuerza y resistencia y da tono muscular, pero también está diseñada para incrementar el gasto calórico de tal forma que ayuda también a mejorar la composición corporal y por tanto a perder grasa. Se ejecutan los ejercicios más básicos del gimnasio pero con la gran diferencia de ir al ritmo de la música y con pre-coreografías.",
    image:
      "https://assets.website-files.com/5b84405c92a9561568b554cd/5be060766fd97409e65ce7f9_lesmills_0004_Bodypump%203.jpg",
    schedule: {
      lunes: "08:00-10:00",
      martes: "11:00-12:00"
    },
    vacancies: {
      lunes: 10,
      martes: 20
    },
    trainer: {}
  },
  {
    name: "Zumba",
    description:
      "Es una actividad en la cual se combinan movimientos de baile con rutinas aeróbicas principalmente con música latina como salsa, merengue, cumbia, reggaetón y samba. Es ideal para las personas a las que les gusta bailar y deseen disminuir su porcentaje de grasa. Baile, diversión y ejercicio. Todo en uno.",
    image:
      "https://classpass.com/blog/wp-content/uploads/2023/03/Zumba-Workout-ClassPass-scaled.jpeg",
    schedule: {
      martes: "08:00-09:00"
    },
    vacancies: {
      martes: 20
    },
    trainer: {}
  },
  {
    name: "HBX Boxing",
    description:
      "Modalidad de boxeo en la que se une el ejercicio cardio a tope con pequeños intervalos de descanso. Es una clase dura, pero si eres de los que les gustan los retos, ¡tienes que probarla! Se trata de una fila de sacos de boxeo que llegan hasta el suelo y que, junto con otros accesorios como cintas elásticas y demás, te permiten realizar un ejercicio intenso muy beneficioso para todo el cuerpo.",
    image: "https://hbxspain.es/wp-content/uploads/2022/02/essayer_hbx_4_raisons_1200x854.jpg",
    schedule: {
      miércoles: "08:00-09:00"
    },
    vacancies: {
      miercoles: 20
    },
    trainer: {}
  },
  {
    name: "Spinning",
    description:
      "Es una actividad aeróbica en una bicicleta fija que se realiza a diferentes niveles de intensidad. Simula la práctica deportiva del ciclismo pero sin riesgos. Ideal para aquellos que buscan perder peso y moldear sus piernas, además es un excelente trabajo cardiovascular.",
    image: "https://www.ispo.com/sites/default/files/2021-09/Spinning%20Kurs.png",
    schedule: {
      jueves: "08:00-09:00"
    },
    vacancies: {
      jueves: 20
    },
    trainer: {}
  },
  {
    name: "Pilates",
    description:
      "Es una actividad fitness con un sistema de ejercicios centrado en mejorar la flexibilidad y fuerza para todo el cuerpo sin incrementar su volumen. Tiene sus variaciones ya sea con tapete, pelota o máquinas especializadas para su ejecución. Buena opción para fortalecer el cuerpo y lograr un buen estado de salud, aunque no tan intensa para quemar calorías en extremo.",
    image:
      "https://media.glamour.mx/photos/6466babcdab5717b12a640d9/3:2/w_2118,h_1412,c_limit/pilates_reformer.jpg",
    schedule: {
      viernes: "08:00-09:00"
    },
    vacancies: {
      viernes: 20
    },
    trainer: {}
  },
  {
    name: "Bosu",
    description:
      "Es el nombre que se le da a una pequeña plataforma de superficie blanda con forma de media esfera. Existen distintas maneras de ejercitarse con esta plataforma, se pueden realizar ejercicios aeróbicos como caminar, correr, saltar; o se puede hacer ejercicios de fuerza, de tono, de abdomen, funcionales y de estabilidad encima del bosu. Es un entrenamiento basado en equilibrio y balance.",
    image:
      "https://static.nike.com/a/images/w_1920,c_limit/332f87aa-2b91-4a47-9e08-3f07316c59b9/10-bosu-ball-exercises-that-make-any-workout-better.jpg",
    schedule: {
      lunes: "11:00-12:00"
    },
    vacancies: {
      lunes: 20
    },
    trainer: {}
  },
  {
    name: "TRX",
    description:
      "Creado por oficiales de la marina de los Estados Unidos, utiliza ejercicios funcionales con el peso corporal pero con la gran diferencia de estar en suspensión mediante unos arneses que se fijan a una puerta, pared o algún elemento elevado y a su vez a las manos o pies. Tiene la ventaja de adaptar la resistencia en cualquier momento mediante la regulación de la posición corporal. Proporciona a sus practicantes coordinación, fuerza, equilibrio, resistencia y flexibilidad.",
    image: "https://www.ispo.com/sites/default/files/2020-02/TRX%20%28Lucky%20Business%29.jpg",
    schedule: {
      martes: "13:00-14:00"
    },
    vacancies: {
      martes: 20
    },
    trainer: {}
  },
  {
    name: "CrossFit",
    description:
      "Creado en la última década, no realiza un programa específico de entrenamiento, sino que se basa en realizar ejercicios funcionales, de alta intensidad y corta duración, constantemente variados y muy creativos, como puede ser subir una cuerda, golpear una llanta con un mazo hasta el ejercicio menos imaginado. Proporciona para sus practicantes resistencia cardiovascular y muscular, fuerza, potencia, velocidad, flexibilidad, coordinación, equilibrio y agilidad. Ideal para los que buscan ejercitarse de manera extrema.",
    image:
      "https://www.sinburpeesenmiwod.com/wp-content/uploads/2021/08/Competir-crossfit-SBEMW.jpg",
    schedule: {
      miércoles: "10:00-11:00"
    },
    vacancies: {
      miércoles: 20
    },
    trainer: {}
  },
  {
    name: "Funcional",
    description:
      "Es una actividad que se basa en realizar ejercicios que imitan los movimientos o trabajos físicos de la vida cotidiana, se utiliza el peso corporal y accesorios tales como poleas, mancuernas, pelotas medicinales, trampolines, conos, colchonetas, bandas elásticas y steps, ente otros. Sus practicantes mejoran la postura, el control del cuerpo, la fuerza y dan tono a su cuerpo.",
    image: "https://ftsalud.com/wp-content/uploads/2022/06/GettyImages-840886788.jpg",
    schedule: {
      jueves: "15:00-16:00"
    },
    vacancies: {
      jueves: 20
    },
    trainer: {}
  },
  {
    name: "Aerobics",
    description:
      "Ejercita la flexibilidad, coordinación, orientación y ritmo. Es recomendable para aquellos que busquen perder grasa corporal y mejorar su condición física. La intensidad y los ritmos varían según la edad de los practicantes y puede ir desde el bajo al alto impacto.",
    image: "https://workoutmusic.co.uk/cdn/shop/articles/aerobics-class_1200x1200.jpg",
    schedule: {
      viernes: "16:00-17:00"
    },
    vacancies: {
      viernes: 20
    },
    trainer: {}
  }
];

module.exports = activitiesToSeed;
