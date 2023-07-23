function addFieldQuotaAvailable(activities) {
  const newList = activities.map(activity => {
    let days = activity.days;
    let quota = activity.quota;
    let quotaAvailable = [];

    days.forEach(day => {
      let count = 0;

      activity.affiliates.forEach(affiliate => {
        if (affiliate.day === day) {
          count++;
        }
      });

      let result = quota - count;
      quotaAvailable = [...quotaAvailable, { day: day, amount: result }];
    });

    return {
      ...activity.toObject(),
      quotaAvailable
    };
  });
  return newList;
}

module.exports = addFieldQuotaAvailable;
