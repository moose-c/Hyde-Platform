export function switchCanvas(direction) {
    const chartNbBox = document.getElementById("chart-title")
    const chartNb = parseInt(chartNbBox.innerText.split(' ')[1], 10)
    const totalNb = document.getElementById("nb-charts").textContent

    const oldChart = document.getElementById(`chart-${chartNb}`)
    const newChartNb = chartNb + direction
    // if index equals 0 or 1 less then total number of charts:
    if (0 <= newChartNb && newChartNb < totalNb) {
        const newChart = document.getElementById(`chart-${newChartNb}`)
        // update chartNbBox
        chartNbBox.textContent = `Chart ${newChartNb}`
        // move old graph
        document.getElementById("invisible-chart-box").appendChild(oldChart)
        document.getElementById("chart-box").appendChild(newChart)
    } else {
        alert(`Chart ${newChartNb} non-existent!`)
    }
}