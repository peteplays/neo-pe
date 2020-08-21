export const setNumber = (val: string | number, decimals: number = 0) =>
  Number(val).toLocaleString(undefined, { maximumFractionDigits: decimals });
