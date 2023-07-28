function addFieldQuotaAvailable(activities) {
  const newList = activities.map(activity => {
    let days = activity.days;
    let schedule = activity.schedule;
    let quota = activity.quota;
    let quotaAvailable = [];

    days.forEach(day => {
      schedule.forEach(sche => {
        let count = 0;

        activity.affiliates.forEach(affiliate => {
          if (affiliate.day === day && affiliate.hour === sche) {
            count++;
          }
        });

        let result = quota - count;
        quotaAvailable = [...quotaAvailable, { day: day, hour: sche, amount: result }];
      });
    });

    return {
      ...activity.toObject(),
      quotaAvailable
    };
  });
  return newList;
}

module.exports = addFieldQuotaAvailable;
