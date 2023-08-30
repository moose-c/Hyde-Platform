import range from "lodash.range"

// create years

export const yearnum_lst = range(10000, 0, -1000).concat(
    range(0, 1700, 100),
    range(1700, 2000, 10),
    range(2000, 2018, 1))

export const yearval_lst = range(10000, 0, -1000).map(year => `bce_${year}`).concat(
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