import { years, ind_vals, ind_names } from './create_data';

export function populateYears() {
    const selectors = document.getElementsByClassName("select_year")
    for (let selector of selectors) {
        for (const key in years) {
            const opt = document.createElement("option")
            opt.value = key
            opt.innerHTML = years[key]
            selector.appendChild(opt)
        }
    // gives some standard values to form to mitigate wrist pain
    document.getElementById('indicators').selectedIndex = 2
    document.getElementById('start_year').selectedIndex = 50
    document.getElementById('end_year').selectedIndex = 65
    }
}

export function populateIndicators() {
    const demIndicators = document.getElementById('dem-indicators')
    const luIndicators = document.getElementById('lu-indicators')
    const agrIndicators = document.getElementById('agr-indicators')
    ind_vals.forEach((val, index) => {
        const newOption =  document.createElement('option')
        newOption.value = val
        newOption.innerText = ind_names[index]
        if (index < 4) {
            demIndicators.appendChild(newOption)
        } else if (index < 10) {
            luIndicators.appendChild(newOption)
        } else {
            agrIndicators.appendChild(newOption)
        }
    })
}
