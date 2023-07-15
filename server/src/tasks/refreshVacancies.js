const cron = require("node-cron");
const { Activity } = require("../models");

const refreshVacancies = () => {
  cron.schedule(
    "59 23 * * *", //minutes, hour
    async () => {
      console.log("initializing task: refresh activity vacancies");
      const activities = await Activity.find();
      if (activities) {
        const days = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
        const date = new Date();
        const today = days[date.getDay()];
        let vacancies;

        activities.forEach(async activity => {
          if (today in activity.totalVacancies) {
            vacancies = activity.totalVacancies[today];

            await activity.updateOne({
              $set: { [`freeVacancies.${today}`]: vacancies },
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
