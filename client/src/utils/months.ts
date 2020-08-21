export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const daysInMonths = (selectedYear: number) =>
  months.reduce((acc: any, _, i) => {
    const date = new Date(selectedYear, i + 1, 0);

    acc[i] = (new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate())

    return acc;
  }, {});
