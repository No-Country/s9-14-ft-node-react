const cron = require("node-cron");
const { User } = require("../models");

const checkFitMedical = () => {
  cron.schedule(
    "00 00 * * *", //minutes, hour
    async () => {
      console.log("initializing task: check fit medical");
      const users = await User.find();
      if (users) {
        users.forEach(async user => {
          if (user.role === "affiliate" && user.fitMedical) {
            const expire = new Date(user.fitMedical.expire);
            const today = new Date();
            const diffDates = expire.getTime() - today.getTime();

            const remainingDays = Math.floor(diffDates / (1000 * 60 * 60 * 24));
            console.log(remainingDays);
            if (remainingDays > 7) {
              await user.updateOne({ $set: { "fitMedical.status": "Al día" } });
            } else if (remainingDays >= 0) {
              await user.updateOne({ $set: { "fitMedical.status": "Próximo a vencer" } });
            } else {
              await user.updateOne({
                $set: { "fitMedical.status": "Vencido", "fitMedical.valid": false }
              });
            }
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

module.exports = checkFitMedical;
