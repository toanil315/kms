const DateTimeUtils = {
  compare: (a: string | number | Date, b: string | number | Date) => {
    const date1 = new Date(a);
    const date2 = new Date(b);
    const date1Value = date1.valueOf();
    const date2Value = date2.valueOf();
    return date1Value === date2Value ? 0 : date1Value > date2Value ? 1 : -1;
  },
};

export default DateTimeUtils;
