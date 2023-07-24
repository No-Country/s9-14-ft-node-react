const cron = require("node-cron");
const { User  } = require("../models");

const refreshSubscriptions = () => {
  cron.schedule(
    "13 9 * * *", // Horario de ejecución del cron (13 minutos, 9 horas)
    async () => {
      console.log("Inicializando tarea: actualizar estado de suscripciones");
      const users = await User.find();
      if (users) {
        const days = ["Al día", "Próximo a vencer", "Vencido"];
        const today = days[new Date().getDay()];

        const promises = users.map(async (user) => {
          if (!user.subscriptions || !user.subscriptions.expire) {
            return;
          }
          const expireDate = new Date(user.subscriptions.expire);
          const currentDate = new Date();

          if (currentDate > expireDate) {
            user.subscriptions.status = "Vencido";
          } else if (currentDate.toDateString() === expireDate.toDateString()) {
            user.subscriptions.status = "Al día";
          } else {
            user.subscriptions.status = "Próximo a vencer";
          }
          return user.save();
        });

        await Promise.all(promises);
      }
    },
    {
      scheduled: true,
      timezone: "America/Argentina/Buenos_Aires",
    }
  );
};

module.exports = refreshSubscriptions;
