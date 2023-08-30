import range from "lodash.range"

// create years

let yearval_lst = range(10000, 0, -1000).map(year => `bce_${year}`).concat(
    range(0, 1700, 100).map(year => `ce_${year}`),
    range(1700, 2000, 10).map(year => `ce_${year}`),
    range(2000, 2018, 1).map(year => `ce_${year}`))

let yearname_lst = yearval_lst.map(year => {
    let split_year = year.split('_')
    return `${split_year[1]} ${split_year[0].toUpperCase()}`
})

export const years = Object.fromEntries(
    yearval_lst.map((element, index) => [element, yearname_lst[index]])
)

export const ind_vals =  [
    'popc', 'popd', 'urbc', 'rurc', 
    'uopp', 'cropland', 'grazing', 'pasture', 'rangeland', 'conv_rangeland', 
    'ir_rice', 'rf_rice', 'tot_rice', 'ir_norice', 'rf_norice', 'tot_ir', 'tot_rf'
]

export const ind_names = [
    'Population Count', 'Population Density', 'Urban Population', 'Rural Population',
    'Build Area', 'Cropland', 'Grazing', 'Pasture', 'Rangeland', 'Conventional Rangeland',
    'Irrigated Rice', 'Rainfed Rice', 'Total Rice', 'Irrigated Other', 'Rainfed Other', 'Total Irrigated', 'Total Rainfed'    
]

export const ind_obj = ind_vals.reduce((result, key, index) => {
    result[key] = ind_names[index];
    return result;
  }, {});