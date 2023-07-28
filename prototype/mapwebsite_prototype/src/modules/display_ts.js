import { fetchTimeserie, plotTimeserie } from "./plot_ts"

export function displayTimeseries(e, iso_codes) {
    // clean potental previous graphs
    document.getElementById('chart-title').textContent = 'Chart 0'

    const chartBox = document.getElementById('chart-box')
    chartBox.removeChild(chartBox.firstChild)
    const blankCanvas = document.createElement('canvas')
    blankCanvas.id = 'chart'
    chartBox.appendChild(blankCanvas)

    const invisibleChartBox = document.getElementById('invisible-chart-box')
    while (invisibleChartBox.firstChild) {
        invisibleChartBox.removeChild(invisibleChartBox.firstChild);
      }

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
    document.getElementById("nb-charts").textContent = iso_codes.length*indicators.length
    for (var iso_code of iso_codes) {
        for (var indicator of indicators) {
            fetchTimeserie(chart_index, indicator, iso_code, start, end)
            chart_index += 1
        }
    }
}