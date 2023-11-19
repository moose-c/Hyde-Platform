export const yearIndexToYear = (yearIndex) => {
  if (yearIndex < 10000) {
    return `${Math.round(10000 - yearIndex)} B.C.`;
  } else {
    return `${Math.round(yearIndex - 10000)} A.D.`;
  }
};
