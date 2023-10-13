import range from "lodash.range"

const end_year = 2018

// create years
export const yearNbLst = range(-10000, 0, 1000).concat(
    range(0, 1700, 100), range(1700, 1950, 10), range(1950, end_year, 1)
)

// Return [bce_10000, .., ce_2018], as used by the API
export const yearval_lst = range(10000, 0, -1000).map(year => `bce_${year}`).concat(
    range(0, 1700, 100).map(year => `ce_${year}`),
    range(1700, 1950, 10).map(year => `ce_${year}`),
    range(1950, end_year, 1).map(year => `ce_${year}`))

// Return [10000 BCE, ..., 2018 CE], a prettier way to display years
const yearname_lst = yearval_lst.map(year => {
    let split_year = year.split('_')
    return `${split_year[1]} ${split_year[0].toUpperCase()}`
})

// Return year Object, with value : name
export const years = Object.fromEntries(
    yearval_lst.map((element, index) => [element, yearname_lst[index]])
)

// indicator object, popc : Population Count
export const indicatorTxtObj = {
    demographic : {
        popc : 'Population',
        popd : 'Population Density',
        urbc : 'Urban Population',
        rurc : 'Rural Population'
    },
    landUse : {
        uopp : 'Urban Area',
        cropland : 'Cropland', 
        grazing : 'Grazing Land', 
        pasture : 'Pasture',
        rangeland : 'Rangeland',
        conv_rangeland : 'Conventional Rangeland'   /* Not in nc */
    },
    agricultural : {
        ir_rice : 'Irrigated Rice',
        rf_rice : 'Rainfed Rice', 
        tot_rice : 'Total Rice', 
        ir_norice : 'Irrigated Not Rice', 
        rf_norice : 'Rainfed Not Rice', 
        tot_irri : 'Total Irrigated', 
        tot_rainfed : 'Total Rainfed'
    }
}

// indicator object, popc : Population Count
export const indicatorNcObj = {
    demographic : {
        population : 'Population',
        population_density : 'Population Density',
        urban_population: 'Urban Population',
        rural_population : 'Rural Population'
    },
    landUse : {
        urban_area : 'Urban Area',
        cropland : 'Cropland', 
        grazing_land : 'Grazing Land', 
        pasture : 'Pasture',
        rangeland : 'Rangeland',
    },
    agricultural : {
        irrigated_rice : 'Irrigated Rice',
        rainfed_rice : 'Rainfed Rice', 
        total_rice : 'Total Rice', 
        irrigated_not_rice : 'Irrigated Not Rice', 
        rainfed_not_rice : 'Rainfed Not Rice', 
        total_irrigated : 'Total Irrigated', 
        total_rainfed : 'Total Rainfed'
    }
}

export const indicatorNcOrder = ['urban_area', 'total_rice', 'urban_population', 'total_irrigated', 'rural_population', 'rainfed_not_rice', 'pasture', 'cropland', 'rainfed_rice', 'rangeland', 'grazing_land', 'irrigated_not_rice', 'population', 'total_rainfed', 'irrigated_rice', 'population_density'] 