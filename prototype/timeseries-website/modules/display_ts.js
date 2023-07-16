import { fetchTimeseries } from "./fetch_ts"

export function displayTimeseries(e, iso_code) {
    // obtain variables to javascript:
    const indicators_selector = document.getElementById('indicators')
    const start = document.getElementById('start_year').value
    const end = document.getElementById('end_year').value
    const indicators = []
    for (var option of indicators_selector.options){
        if(option.selected){
            indicators.push(option.value)
        }
    }
    console.log(iso_code)
    console.log(`The following indicators were selected: ${indicators}`)
    console.log(`Start year: ${start}`)
    console.log(`End year: ${end}`)

    e.preventDefault() // very important for fetch method for some reason.

    fetchTimeseries(indicators, iso_code, start, end)
}
