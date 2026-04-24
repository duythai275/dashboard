const getWeekNumber = (date = new Date()) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
        (date - firstDayOfYear) / 86400000 + firstDayOfYear.getDay() + 1;
    return Math.ceil(pastDaysOfYear / 7);
};

const getLast12Weeks = (weekStr) => {
  const [year, week] = weekStr.split("W").map(Number);

  // ISO week → date trick (Jan 4th always in week 1)
  const jan4 = new Date(year, 0, 4);
  const day = jan4.getDay() || 7;
  const mondayWeek1 = new Date(jan4);
  mondayWeek1.setDate(jan4.getDate() - day + 1);

  const selected = new Date(mondayWeek1);
  selected.setDate(mondayWeek1.getDate() + (week - 1) * 7);

  const result = [];

  for (let i = 11; i >= 0; i--) {
    const d = new Date(selected);
    d.setDate(selected.getDate() - i * 7);

    const year = d.getFullYear();

    // ISO week calc
    const temp = new Date(d);
    temp.setDate(temp.getDate() + 4 - (temp.getDay() || 7));
    const yearStart = new Date(temp.getFullYear(), 0, 1);
    const weekNo = Math.ceil(((temp - yearStart) / 86400000 + 1) / 7);

    // result.push(`${temp.getFullYear()}W${String(weekNo).padStart(2, "0")}`);
    result.push(`${temp.getFullYear()}W${String(weekNo)}`);
  }

  return result;
};

const datasetColors = [
  "rgba(54, 162, 235, 0.5)", // blue
  "rgba(255, 99, 132, 0.5)", // red
  "rgba(75, 192, 192, 0.5)", // teal
  "rgba(255, 206, 86, 0.5)", // yellow
  "rgba(153, 102, 255, 0.5)", // purple
  "rgba(255, 159, 64, 0.5)", // orange
  "rgba(100, 181, 246, 0.5)", // light blue
];

export { getWeekNumber, getLast12Weeks, datasetColors };