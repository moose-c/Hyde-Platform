/**
* The function "roundYear" returns the closest year from a list of years that is greater than or equal
* to the input year minus 10000.
*/

import { yearNbList, indicatorTxtObj } from "./createData";

export const roundYear = (year) => {
    for (const yearFromList of yearNbList) {
        if (yearFromList >= year - 10000) {
            return yearFromList;
        }
    }
}

export const getUnit = (ind, combinedIndicators = false, all_indicators = [], completeObject = indicatorTxtObj) => {
  const demInd = Object.keys(completeObject['demographic'])
  const demIndWODensity = Object.keys(completeObject['demographic'])
  demIndWODensity.splice(demIndWODensity.indexOf('popd'), 1)
  demIndWODensity.splice(demIndWODensity.indexOf('population_density'), 1)
  if (combinedIndicators) {
    if (
      all_indicators.every((val) => demIndWODensity.includes(val)) ||
      all_indicators.every((val) => ["popd", "population_density"].includes(val)) ||
      all_indicators.every(
        (val) => !demInd.includes(val)
      )
    ) {
      return getUnit(all_indicators[0]);
    } else {
      return null;
    }
  } else {
    if (demIndWODensity.includes(ind)) {
      return "inh";
    } else if ("popd" === ind || "population_density" === ind) {
      return `inh/km\u00b2`;
    } else {
      return "km\u00b2";
    }
  }
}