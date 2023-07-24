import { fetchTimeseries } from "./fetch_ts"

export function displayTimeseries(e, iso_codes) {

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
    
    var chart_index = 0
    for (var iso_code of iso_codes) {
        for (var indicator of indicators) {
            const chart = document.createElement('canvas')
            chart.id = `chart${chart_index}`
            chart.className =  "chart"
            chart.width = 300
            chart.height = 200
            document.getElementById("invisible-chart-holder").appendChild(chart) 
            fetchTimeseries(chart_index, indicator, iso_code, start, end)
            chart_index += 1
        }
    }
}