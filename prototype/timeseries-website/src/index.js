import { createMap } from "./modules/create_map";
import { isoCodes, allowSelection } from "./modules/allow_selection";
import { populateYears, populateIndicators } from "./modules/write_html"
import { displayTimeseries } from "./modules/display_ts"
import { switchCanvas } from "./modules/switchCanvas"

// recreated in final website
createMap()   /* display the base map, with aditional shapefile for borders loaded to allow country selection */

// recreated
allowSelection()   /* this makes the individual countries clickable */


populateIndicators()   /* Insert indicators into timeseries form */

populateYears()   /* Insert years into ts form */

// Section to display or hide timeseries form
const timeseriesForm = document.getElementById('timeseries-form-box')
const formButton = document.getElementById("form-button")
formButton.addEventListener('click', () => {
    if (timeseriesForm.style.display == 'block') {
        timeseriesForm.style.display = 'none'
    } else if (isoCodes.length == 0) { 
        alert('Cannot plot without selecting countries!')
    } else {
        timeseriesForm.style.display = 'block'
    }
})

// Section to show timeseries plots
document.getElementById('timeseries-button').addEventListener('click', (e) =>
    displayTimeseries(e, isoCodes)
)

// Section to allow switching of timeseries graphs
for (var element of document.getElementsByClassName("arrow")) {
    element.addEventListener('click', (e) => {
        if (e.originalTarget.id == "arrow-right"){
            switchCanvas(1)
        } else {
            switchCanvas(-1)
        }
    })
}

// Functionality to change x-axis style
document.getElementById('x-axis').addEventListener('change', function (e) {
    if (this.checked) {
        document.getElementById('relative').style.fontWeight = 'normal'
        document.getElementById('absolute').style.fontWeight = 'bold'
    } else {
        document.getElementById('relative').style.fontWeight = 'bold'
        document.getElementById('absolute').style.fontWeight = 'normal'
    }
    displayTimeseries(e, isoCodes)
})

// Functionality to combine/seperate figures
document.getElementById('combine').addEventListener('change', function (e) {
    if (this.checked) {
        document.getElementById('seperate').style.fontWeight = 'normal'
        document.getElementById('combined').style.fontWeight = 'bold'
    } else {
        document.getElementById('seperate').style.fontWeight = 'bold'
        document.getElementById('combined').style.fontWeight = 'normal'
    }
    displayTimeseries(e, isoCodes)
})

