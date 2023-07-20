const cron = require("node-cron");
const { Activity } = require("../models");

const refreshVacancies = () => {
  cron.schedule(
    "13 9 * * *", //minutes, hour
    async () => {
      console.log("initializing task: refresh activity vacancies");
      const activities = await Activity.find();
      if (activities) {
        const days = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
        const date = new Date();
        const today = days[date.getDay()];

        activities.forEach(async activity => {
          if (activity.days.includes(today)) {
            await activity.updateOne({
              $pull: {
                affiliates: { day: today }
              }
            });
          }
        });
      }
    },
    {
      scheduled: true,
      timezone: "America/Argentina/Buenos_Aires"
    }
  );
};

module.exports = refreshVacancies;
