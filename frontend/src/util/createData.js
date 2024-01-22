/* This file contains usefull pieces of data used within the portal. */

import range from "lodash.range"

const endYear = parseInt(process.env.REACT_APP_END_YEAR)

// create year range, true integer values
export const yearNbList = range(-10000, 0, 1000).concat(
    range(0, 1700, 100), range(1700, 1950, 10), range(1950, endYear+1, 1)
)

// Return [bce_10000, .., ce_2023], as used by the API
export const yearValueList = yearNbList.slice(0, 10).map(year => `bce_${-year}`).concat(
    yearNbList.slice(10).map(year => `ce_${year}`))

// Return [10000 BCE, ..., 2023 CE], a prettier way to display years
const yearNameList = yearValueList.map(year => {
    let split_year = year.split('_')
    return `${split_year[1]} ${split_year[0].toUpperCase()}`
})

// Return year Object, with value : name
export const yearsObject = Object.fromEntries(
    yearValueList.map((element, index) => [element, yearNameList[index]])
)


// indicator object, popc : Population Count
export const indicatorTxtObj = {
    demographic: {
        popc: 'Population',
        popd: 'Population Density',
        urbc: 'Urban Population',
        rurc: 'Rural Population'
    },
    landUse: {
        uopp: 'Urban Area',
        cropland: 'Cropland',
        grazing: 'Grazing Land',
        pasture: 'Pasture',
        rangeland: 'Rangeland',
        conv_rangeland: 'Converted Rangeland'   /* Not in nc */
    },
    agricultural: {
        ir_rice: 'Irrigated Rice',
        rf_rice: 'Rainfed Rice',
        tot_rice: 'Total Rice',
        ir_norice: 'Irrigated Not Rice',
        rf_norice: 'Rainfed Not Rice',
        tot_irri: 'Total Irrigated',
        tot_rainfed: 'Total Rainfed'
    }
}

// indicator object, popc : Population Count
export const indicatorNcObj = {
    demographic: {
        population: 'Population',
        population_density: 'Population Density',
        urban_population: 'Urban Population',
        rural_population: 'Rural Population'
    },
    landUse: {
        urban_area: 'Urban Area',
        cropland: 'Cropland',
        grazing_land: 'Grazing Land',
        pasture: 'Pasture',
        rangeland: 'Rangeland',
    },
    agricultural: {
        irrigated_rice: 'Irrigated Rice',
        rainfed_rice: 'Rainfed Rice',
        total_rice: 'Total Rice',
        irrigated_not_rice: 'Irrigated Not Rice',
        rainfed_not_rice: 'Rainfed Not Rice',
        total_irrigated: 'Total Irrigated',
        total_rainfed: 'Total Rainfed'
    }
}

export const indicatorNcOrder = ['urban_area', 'total_rice', 'urban_population', 'total_irrigated', 'rural_population', 'rainfed_not_rice', 'pasture', 'cropland', 'rainfed_rice', 'rangeland', 'grazing_land', 'irrigated_not_rice', 'population', 'total_rainfed', 'irrigated_rice', 'population_density'] 

export const rangeValues = {popAbs: '0.0001,3200', popDens:'0.0001,500', lu: '0.0001,70'}
export const styleValues = {pop: 'x-Rainbow', lu: 'div-Spectral-inv'}