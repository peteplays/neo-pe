export const setNumber = (val: string | number, decimals = 0) =>
  Number(val).toLocaleString('en-US', { maximumFractionDigits: decimals });
