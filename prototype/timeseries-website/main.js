import { iso_code, createIsocodes, populateYears } from "./modules/write_html"
import { displayTimeseries } from "./modules/display_ts"

createIsocodes()
populateYears()

// on submition, show a graph
document.getElementById('form').addEventListener('submit', e=>{
    displayTimeseries(e, iso_code)
})

// maxwell, differt methods