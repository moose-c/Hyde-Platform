import { createMap } from "./modules/create_map";
import { selected, iso_codes, allowSelection } from "./modules/allow_selection";
import { populateYears } from "./modules/write_html"
import { displayTimeseries } from "./modules/display_ts"

createMap()

allowSelection()

populateYears()

const timeseriesForm = document.getElementById('timeseries-form-box')

const plotButton = document.getElementById("plotting")
plotButton.addEventListener('click', () => {
    if (timeseriesForm.style.display == 'block') {
        timeseriesForm.style.height = (timeseriesForm.clientHeight - document.getElementById('country-list').clientHeight) + 'px'
        timeseriesForm.style.display = 'none'
    } else if (iso_codes.length == 0) { 
        alert('Cannot plot without selecting countries!')
    } 
    else {
        timeseriesForm.style.display = 'block'
        timeseriesForm.style.height = (timeseriesForm.clientHeight + document.getElementById('country-list').clientHeight) + 'px'
    }
})

document.getElementById('timeseries-button').addEventListener('click', (e) =>
    displayTimeseries(e, iso_codes)
)

export function switchCanvas(nb) {
    const chart_location = document.getElementById("chart")

}