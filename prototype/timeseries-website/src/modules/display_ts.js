import { fetchTimeseries} from "./plot_ts"

export async function displayTimeseries(e, isoCodes) {
    // clean potental previous graphs
    document.getElementById('chart-title').textContent = 'Chart 0'
    document.getElementById('plot-container').style.display = 'none'
    const chartBox = document.getElementById('chart-box')
    chartBox.removeChild(chartBox.firstChild)   /* Remove the one chart that is displayed in chart box */
    const blankCanvas = document.createElement('canvas')
    blankCanvas.id = 'chart'
    chartBox.appendChild(blankCanvas)

    const invisibleChartBox = document.getElementById('invisible-chart-box') 
    while (invisibleChartBox.firstChild) {   /* Remove all stored graphs */
        invisibleChartBox.removeChild(invisibleChartBox.firstChild);
      }


    // obtain variables to javascript:
    const indicators_selector = document.getElementById('indicators')
    const start = document.getElementById('start-year').value
    const end = document.getElementById('end-year').value
    const indicators = []
    for (var option of indicators_selector.options) {
        if (option.selected) {
            indicators.push(option.value)
        }
    }

    e.preventDefault() // very important for fetch method for some reason.
    
    // For every isocode, for each selected indicator, create the graph
    var chartIndex = 0
    var countryIndex = 0
    document.getElementById("nb-charts").textContent = isoCodes.length*indicators.length
    for (var isoCode of isoCodes) {
        await fetchTimeseries(chartIndex, countryIndex, indicators, isoCode, start, end)
    }
}