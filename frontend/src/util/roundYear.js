/**
* The function "roundYear" returns the closest year from a list of years that is greater than or equal
* to the input year minus 10000.
*/

import { yearNbList } from "./createData";

export const roundYear = (year) => {
    for (const yearFromList of yearNbList) {
        if (yearFromList >= year - 10000) {
            return yearFromList;
        }
    }
}