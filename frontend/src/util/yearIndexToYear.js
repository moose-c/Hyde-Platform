/**
 * The function `yearIndexToYear` takes a year index as input and returns the corresponding year in
 * B.C.E. or C.E. format.
 */

export const yearIndexToYear = (yearIndex) => {
  if (yearIndex < 10000) {
    return `${Math.round(10000 - yearIndex)} B.C.E.`;
  } else {
    return `${Math.round(yearIndex - 10000)} C.E.`;
  }
};
