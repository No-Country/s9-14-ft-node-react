const usersToSeed = [
  {
    name: "Julio",
    surname: "Molina",
    email: "admin@email.com",
    password: "admin123",
    profileImage:
      "https://png.pngitem.com/pimgs/s/335-3358003_chris-leingang-academy-at-bright-ideas-press-hd.png",
    phone: 246939617,
    phoneEmergency: 12345678,
    role: "Admin",
    birthday: "2000-02-16",
    age: 23
  },
  {
    name: "Eduardo",
    surname: "Reyes",
    email: "entrenador1@email.com",
    password: "entrenador123",
    profileImage: "https://www.pngitem.com/pimgs/m/579-5794945_circle-profile-hd-png-download.png",
    phone: 342361346,
    phoneEmergency: 12345678,
    role: "Trainer",
    birthday: "2000-03-02",
    age: 23
  },
  {
    name: "Ana",
    surname: "Santoro",
    email: "entrenador2@email.com",
    password: "entrenador123",
    profileImage:
      "https://png.pngitem.com/pimgs/s/128-1284293_marina-circle-girl-picture-in-circle-png-transparent.png",
    phone: 325325254,
    phoneEmergency: 13445678,
    role: "Trainer",
    birthday: "2000-01-18",
    age: 23
  },
  {
    name: "Lucrecia",
    surname: "Vázquez",
    email: "entrenador3@email.com",
    password: "entrenador123",
    profileImage: "https://image.pngaaa.com/877/4877877-middle.png",
    phone: 353253243,
    phoneEmergency: 12345678,
    role: "Trainer",
    birthday: "2000-04-22",
    age: 23
  },
  {
    name: "Osvaldo",
    surname: "Lombardi",
    email: "entrenador4@email.com",
    password: "entrenador123",
    profileImage:
      "https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png",
    phone: 213124512,
    phoneEmergency: 12345678,
    role: "Trainer",
    birthday: "2000-10-06",
    age: 22
  },
  {
    name: "Esteban",
    surname: "Alonso",
    email: "entrenador5@email.com",
    password: "entrenador123",
    profileImage:
      "https://www.pngfind.com/pngs/m/488-4887957_facebook-teerasej-profile-ball-circle-circular-profile-picture.png",
    phone: 576864361,
    phoneEmergency: 12345678,
    role: "Trainer",
    birthday: "2000-12-25",
    age: 22
  },
  {
    name: "Paula",
    surname: "Aguirre",
    email: "afiliado1@email.com",
    password: "afiliado123",
    profileImage:
      "https://www.pngfind.com/pngs/m/443-4433119_circle-crop-profile-profile-picture-woman-circle-hd.png",
    phone: 754655225,
    phoneEmergency: 12345678,
    role: "Affiliate",
    birthday: "2000-07-29",
    age: 22,
    fitMedical: {
      valid: true,
      expire: "2023-07-29",
      status: "próximo a vencer"
    },
    assignedPlan: true
  },
  {
    name: "Luis",
    surname: "Carrizo",
    email: "afiliado2@email.com",
    password: "afiliado123",
    profileImage: "https://image.pngaaa.com/789/3873789-middle.png",
    phone: 353436468,
    phoneEmergency: 12345678,
    role: "Affiliate",
    birthday: "2000-08-10",
    age: 22,
    fitMedical: {
      valid: true,
      expire: "2023-08-10",
      status: "al día"
    },
    assignedPlan: true
  },
  {
    name: "Macarena",
    surname: "Costa",
    email: "afiliado3@email.com",
    password: "afiliado123",
    profileImage:
      "https://simg.nicepng.com/png/small/182-1829287_cammy-lin-ux-designer-circle-picture-profile-girl.png",
    phone: 435475859,
    phoneEmergency: 12345678,
    role: "Affiliate",
    birthday: "2000-09-09",
    age: 22,
    fitMedical: {
      valid: true,
      expire: "2023-09-09",
      status: "al día"
    },
    assignedPlan: true
  }
];

module.exports = usersToSeed;
