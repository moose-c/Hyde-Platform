// Utilize created years, indicator values and indicator names
import { years, ind_vals, ind_names } from './create_data';


export function populateYears() {
    const selectors = document.getElementsByClassName("select-year")
    for (let selector of selectors) {
        for (let key in years) {
            const opt = document.createElement("option")
            opt.value = key
            opt.innerHTML = years[key]
            selector.appendChild(opt)
        }
    // gives some standard values to form
    document.getElementById('indicators').selectedIndex = 2
    document.getElementById('start-year').selectedIndex = 50
    document.getElementById('end-year').selectedIndex = 65
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
        if (index < 4) {  /* We have 4 demographic indicators */
            demIndicators.appendChild(newOption)
        } else if (index < 10) { /* We have 6 demographic indicators */
            luIndicators.appendChild(newOption)
        } else { /* The rest are agricultural indicators */
            agrIndicators.appendChild(newOption)
        }
    })
}
