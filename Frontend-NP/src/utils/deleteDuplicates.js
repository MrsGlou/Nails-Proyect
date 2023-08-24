export const deleteDuplicateTimes = (newArray) => {
  const allTimes = [];
  newArray.forEach((element) => {
    if (!allTimes.includes(element)) {
      allTimes.push(element);
    }
  });
  return allTimes;
};
