import { createMap } from "./modules/create_map";
import { selected, iso_codes, allowSelection } from "./modules/allow_selection";
import { populateYears, populateIndicators } from "./modules/write_html"
import { displayTimeseries } from "./modules/display_ts"
import { switchCanvas } from "./modules/switchCanvas"

createMap()   /* display the base map, with aditional shapefile for borders loaded to allow country selection */

allowSelection()   /* this makes the individual countries clickable */

populateIndicators()

populateYears()

const timeseriesForm = document.getElementById('timeseries-form-box')

const plotButton = document.getElementById("plot-button")
plotButton.addEventListener('click', () => {
    if (timeseriesForm.style.display == 'block') {
        timeseriesForm.style.display = 'none'
    } else if (iso_codes.length == 0) { 
        alert('Cannot plot without selecting countries!')
    } 
    else {
        timeseriesForm.style.display = 'block'
    }
})

document.getElementById('timeseries-button').addEventListener('click', (e) =>
    displayTimeseries(e, iso_codes)
)

for (var element of document.getElementsByClassName("arrow")) {
    element.addEventListener('click', (e) => {
        if (e.originalTarget.id == "arrow-right"){
            switchCanvas(1)
        } else {
            switchCanvas(-1)
        }
    })
}

