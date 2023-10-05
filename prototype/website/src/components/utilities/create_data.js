import range from "lodash.range"

const end_year = 2018

// create years
export const yearNbLst = range(-10000, 0, 1000).concat(
    range(0, 1700, 100), range(1700, 1950, 10), range(1950, end_year, 1)
)

// Return [bce_10000, .., ce_2018], as used by the API
const yearval_lst = range(10000, 0, -1000).map(year => `bce_${year}`).concat(
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

console.log(years)

export const ind_vals = [
    'popc', 'popd', 'urbc', 'rurc',   /* 4 */

    'uopp', 'cropland', 'grazing', 'pasture', 'rangeland', 'conv_rangeland',   /* 6 */

    'ir_rice', 'rf_rice', 'tot_rice', 'ir_norice', 'rf_norice', 'tot_irri', 'tot_rainfed'   /* 7 */

    // Miss indicator 'shifting'
]

export const ind_names = [
    'Population Count', 'Population Density', 'Urban Population', 'Rural Population',
    'Build Area', 'Cropland', 'Grazing', 'Pasture', 'Rangeland', 'Conventional Rangeland',
    'Irrigated Rice', 'Rainfed Rice', 'Total Rice', 'Irrigated Other', 'Rainfed Other', 'Total Irrigated', 'Total Rainfed'
]

// indicator object, popc : Population Count
export const indicatorsObj = {
    demographic : {
        popc : 'Population Count',
        popd : 'Population Density',
        urbc : 'Urban Population',
        rurc : 'Rural Population'
    },
    landUse : {
        uopp : 'Build Area',
        cropland : 'Cropland', 
        grazing : 'Grazing', 
        pasture : 'Pasture',
        rangeland : 'Rangeland',
        conv_rangeland : 'Conventional Rangeland'
    },
    agricultural : {
        ir_rice : 'Irrigated Rice',
        rf_rice : 'Rainfed Rice', 
        tot_rice : 'Total Rice', 
        ir_norice : 'Irrigated Other', 
        rf_norice : 'Rainfed Other', 
        tot_irri : 'Total Irrigated', 
        tot_rainfed : 'Total Rainfed'
    }
}

// Object.fromEntries(
//     ind_vals.map((element, index) => [element, ind_names[index]])
// )