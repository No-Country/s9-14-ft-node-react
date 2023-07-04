const { ObjectId } = require("mongodb");

const activitiesToSeed = [
  {
    name: "Body Combat",
    description:
      "Esta clase de ejercicio cardiovascular es perfecta para soltar adrenalina y liberar las tensiones del día a día. Se basa en ejercicios sacados de las artes marciales que trabajan todo el cuerpo al ritmo de una música muy movida.",
    image:
      "https://holmesplace20prod.s3.eu-central-1.amazonaws.com/b3be9e59b2c8b27bf5c219ae2510fdb48053377f_16_BODYCOMBAT---Virtual3200x1560px.jpg",
    days: ["Lunes"],
    schedule: "2pm-4pm",
    limit: 20,
    trainer_id: new ObjectId(1)
  },
  {
    name: "Body Pump",
    description:
      "Es una clase que se realiza con una barra y discos, desarrolla la fuerza y resistencia y da tono muscular, pero también está diseñada para incrementar el gasto calórico de tal forma que ayuda también a mejorar la composición corporal y por tanto a perder grasa. Se ejecutan los ejercicios más básicos del gimnasio pero con la gran diferencia de ir al ritmo de la música y con pre-coreografías.",
    image:
      "https://assets.website-files.com/5b84405c92a9561568b554cd/5be060766fd97409e65ce7f9_lesmills_0004_Bodypump%203.jpg",
    days: ["Jueves", "Viernes"],
    schedule: "10am-12pm",
    limit: 20,
    trainer_id: new ObjectId(2)
  },
  {
    name: "Zumba",
    description:
      "Es una actividad en la cual se combinan movimientos de baile con rutinas aeróbicas principalmente con música latina como salsa, merengue, cumbia, reggaetón y samba. Es ideal para las personas a las que les gusta bailar y deseen disminuir su porcentaje de grasa. Baile, diversión y ejercicio. Todo en uno.",
    image:
      "https://classpass.com/blog/wp-content/uploads/2023/03/Zumba-Workout-ClassPass-scaled.jpeg",
    days: ["Miércoles"],
    schedule: "8am-10am",
    limit: 20,
    trainer_id: new ObjectId(2)
  },
  {
    name: "HBX Boxing",
    description:
      "Modalidad de boxeo en la que se une el ejercicio cardio a tope con pequeños intervalos de descanso. Es una clase dura, pero si eres de los que les gustan los retos, ¡tienes que probarla! Se trata de una fila de sacos de boxeo que llegan hasta el suelo y que, junto con otros accesorios como cintas elásticas y demás, te permiten realizar un ejercicio intenso muy beneficioso para todo el cuerpo.",
    image: "https://hbxspain.es/wp-content/uploads/2022/02/essayer_hbx_4_raisons_1200x854.jpg",
    days: ["Martes", "Miércoles", "Jueves"],
    schedule: "6pm-8pm",
    limit: 20,
    trainer_id: new ObjectId(1)
  },
  {
    name: "Spinning",
    description:
      "Es una actividad aeróbica en una bicicleta fija que se realiza a diferentes niveles de intensidad. Simula la práctica deportiva del ciclismo pero sin riesgos. Ideal para aquellos que buscan perder peso y moldear sus piernas, además es un excelente trabajo cardiovascular.",
    image: "https://www.ispo.com/sites/default/files/2021-09/Spinning%20Kurs.png",
    days: ["Martes"],
    schedule: "9pm-10pm",
    limit: 20,
    trainer_id: new ObjectId(3)
  },
  {
    name: "Circuito al aire libre",
    description:
      "Te ofrecemos la oportunidad de correr haciendo un circuito en los alrededores del gimnasio. Un monitor te acompañará para mostrarte el recorrido. Puedes hacerlo a tu ritmo, lo importante es llegar al final.",
    image: "https://media.timeout.com/images/102302781/image.jpg",
    days: ["Lunes", "Miércoles", "Viernes"],
    schedule: "2pm-4pm",
    limit: 20,
    trainer_id: new ObjectId(3)
  },
  {
    name: "Body Attack",
    description:
      "El body attack se basa en movimientos de defensa personal con los que trabajar distintos músculos del cuerpo. Solo tienes que seguir la música y los gestos del monitor. Además, aprender a defenderse nunca está de más. Dos en uno.",
    image: "https://www.peaksportsclub.com/wp-content/uploads/2019/12/Body-Attack-3.jpg",
    days: ["Martes", "Miércoles"],
    schedule: "4pm-6pm",
    limit: 20,
    trainer_id: new ObjectId(4)
  },
  {
    name: "Pilates",
    description:
      "Es una actividad fitness con un sistema de ejercicios centrado en mejorar la flexibilidad y fuerza para todo el cuerpo sin incrementar su volumen. Tiene sus variaciones ya sea con tapete, pelota o máquinas especializadas para su ejecución. Buena opción para fortalecer el cuerpo y lograr un buen estado de salud, aunque no tan intensa para quemar calorías en extremo.",
    image:
      "https://media.glamour.mx/photos/6466babcdab5717b12a640d9/3:2/w_2118,h_1412,c_limit/pilates_reformer.jpg",
    days: ["Miércoles", "Viernes"],
    schedule: "11am-1pm",
    limit: 20,
    trainer_id: new ObjectId(5)
  },
  {
    name: "Body Jump",
    description:
      "Si quieres pasar un buen rato con tus amigos en una de nuestras actividades dirigidas a la vez que hacen ejercicios y mejoran su salud y su físico, el body jump es un ejercicio perfecto para ello. Se realiza en una cama elástica sobre la que tendrán que saltar mientras hacen movimientos que te marca el monitor. ¡Les encantará!",
    image:
      "https://trampolinfitness.net/wp-content/uploads/2018/05/Clase-de-Jumping-Fitness-en-gimnasio-1024x683.jpg",
    days: ["Jueves"],
    schedule: "8pm-9pm",
    limit: 20,
    trainer_id: new ObjectId(4)
  },
  {
    name: "Yoga",
    description:
      "Se realizan ejercicios que ayudan a conseguir tono muscular y flexibilidad, así como para activar el flujo de energía en nuestro cuerpo. Sus practicantes mejoran la concentración mental, se relajan, mejoran la circulación y su postura. Ideal para los que buscan algo simple y no tan intenso en la práctica de actividades deportivas.",
    image:
      "https://www.yogabasics.com/yogabasics2017/wp-content/uploads/2021/03/Ashtanga-Yoga.jpeg",
    days: ["Lunes"],
    schedule: "9am-10am",
    limit: 20,
    trainer_id: new ObjectId(5)
  },
  {
    name: "Bosu",
    description:
      "Es el nombre que se le da a una pequeña plataforma de superficie blanda con forma de media esfera. Existen distintas maneras de ejercitarse con esta plataforma, se pueden realizar ejercicios aeróbicos como caminar, correr, saltar; o se puede hacer ejercicios de fuerza, de tono, de abdomen, funcionales y de estabilidad encima del bosu. Es un entrenamiento basado en equilibrio y balance.",
    image:
      "https://static.nike.com/a/images/w_1920,c_limit/332f87aa-2b91-4a47-9e08-3f07316c59b9/10-bosu-ball-exercises-that-make-any-workout-better.jpg",
    days: ["Viernes"],
    schedule: "7pm-8pm",
    limit: 20,
    trainer_id: new ObjectId(7)
  },
  {
    name: "Body Jam",
    description:
      "Se basa en realizar ejercicio aeróbico mediante el baile principalmente con música funk, groove, hip hop, disco y jazz. Promueve un aumento de la conciencia corporal, mejora la calidad del movimiento, ayuda a quemar grasa y desarrolla la noción del ritmo. Ideal para los que disfrutan del baile con esos ritmos.",
    image: "https://lesmills.es/wp-content/uploads/2020/10/BJInicio.jpg",
    days: ["Martes"],
    schedule: "1pm-3pm",
    limit: 20,
    trainer_id: new ObjectId(6)
  },
  {
    name: "TRX",
    description:
      "Creado por oficiales de la marina de los Estados Unidos, utiliza ejercicios funcionales con el peso corporal pero con la gran diferencia de estar en suspensión mediante unos arneses que se fijan a una puerta, pared o algún elemento elevado y a su vez a las manos o pies. Tiene la ventaja de adaptar la resistencia en cualquier momento mediante la regulación de la posición corporal. Proporciona a sus practicantes coordinación, fuerza, equilibrio, resistencia y flexibilidad.",
    image: "https://www.ispo.com/sites/default/files/2020-02/TRX%20%28Lucky%20Business%29.jpg",
    days: ["Lunes", "Jueves"],
    schedule: "8am-10am",
    limit: 20,
    trainer_id: new ObjectId(6)
  },
  {
    name: "CrossFit",
    description:
      "Creado en la última década, no realiza un programa específico de entrenamiento, sino que se basa en realizar ejercicios funcionales, de alta intensidad y corta duración, constantemente variados y muy creativos, como puede ser subir una cuerda, golpear una llanta con un mazo hasta el ejercicio menos imaginado. Proporciona para sus practicantes resistencia cardiovascular y muscular, fuerza, potencia, velocidad, flexibilidad, coordinación, equilibrio y agilidad. Ideal para los que buscan ejercitarse de manera extrema.",
    image:
      "https://www.sinburpeesenmiwod.com/wp-content/uploads/2021/08/Competir-crossfit-SBEMW.jpg",
    days: ["Martes", "Miércoles"],
    schedule: "9am-11am",
    limit: 20,
    trainer_id: new ObjectId(7)
  },
  {
    name: "Funcional",
    description:
      "Es una actividad que se basa en realizar ejercicios que imitan los movimientos o trabajos físicos de la vida cotidiana, se utiliza el peso corporal y accesorios tales como poleas, mancuernas, pelotas medicinales, trampolines, conos, colchonetas, bandas elásticas y steps, ente otros. Sus practicantes mejoran la postura, el control del cuerpo, la fuerza y dan tono a su cuerpo.",
    image: "https://ftsalud.com/wp-content/uploads/2022/06/GettyImages-840886788.jpg",
    days: ["Lunes", "Viernes"],
    schedule: "2pm-4pm",
    limit: 20,
    trainer_id: new ObjectId(9)
  },
  {
    name: "Stretching",
    description:
      "Es una clase colectiva en la que se realiza estiramiento de todo el cuerpo, mejorando la flexibilidad y también la postura. Se hacen estiramientos del tren superior (torso, brazos) y del tren inferior (muslos, pierna, glúteos). Ofrece el beneficio de relajar, estirar, descontracturar los músculos entumecidos o agotados por el entrenamiento.",
    image:
      "https://focusphysicaltherapyscv.com/wp-content/uploads/2019/03/AdobeStock_132111328.jpeg",
    days: ["Jueves", "Viernes"],
    schedule: "6pm-7pm",
    limit: 20,
    trainer_id: new ObjectId(9)
  },
  {
    name: "Step",
    description:
      "Es un entrenamiento aeróbico de bajo impacto en el cual se utiliza un escalón o plataforma de material plástico. Se realizan repetidos ascensos y descensos de la plataforma al ritmo de la música, lo que lo convierte en una actividad adecuada para ganar un buen nivel de condición cardio-pulmonar.",
    image:
      "https://www.clinicabaviera.com/blog/wp-content/uploads/2019/06/step-en-el-gimnasio-1.jpg",
    days: ["Lunes", "Miércoles"],
    schedule: "3pm-4pm",
    limit: 20,
    trainer_id: new ObjectId(8)
  },
  {
    name: "Aerobics",
    description:
      "Ejercita la flexibilidad, coordinación, orientación y ritmo. Es recomendable para aquellos que busquen perder grasa corporal y mejorar su condición física. La intensidad y los ritmos varían según la edad de los practicantes y puede ir desde el bajo al alto impacto.",
    image: "https://workoutmusic.co.uk/cdn/shop/articles/aerobics-class_1200x1200.jpg",
    days: ["Martes", "Jueves"],
    schedule: "4pm-5pm",
    limit: 20,
    trainer_id: new ObjectId(8)
  }
];

module.exports = activitiesToSeed;
