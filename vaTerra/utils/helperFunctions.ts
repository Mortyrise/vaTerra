const addDaystoDate = (interval: number) => {
  const now = Date.now();
  let nextReminder = now + interval * 1000 * 360 * 24;
  return nextReminder;
};

module.exports = addDaystoDate;
