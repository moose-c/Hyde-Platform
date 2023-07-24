import { fetchTimeseries } from "./fetch_ts"

export function plotTimeseries(e, iso_codes) {
    const chart_location = document.getElementById('chart')
    console.log(chart_location)

    // obtain variables to javascript:
    const indicators_selector = document.getElementById('indicators')
    const start = document.getElementById('start_year').value
    const end = document.getElementById('end_year').value
    const indicators = []
    for (var option of indicators_selector.options) {
        if (option.selected) {
            indicators.push(option.value)
        }
    }

    e.preventDefault() // very important for fetch method for some reason.
    
    // now just grab first isocode in list
    const iso_code = iso_codes[0]
    fetchTimeseries(indicators, iso_code, start, end)
}