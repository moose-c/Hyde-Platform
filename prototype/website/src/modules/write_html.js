import { years } from './create_data';

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
