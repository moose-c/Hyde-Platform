import { plotTimeserie } from "./plot_ts"

export async function fetchTimeseries(chart_index, indicator, iso_code, start, end) {
    var response_json;
    var timeserie;
    let response = await fetch(`http://localhost:8000/${indicator}/${iso_code}/${start}/${end}`)
    response_json = await response.json()
    timeserie = response_json[0]
    plotTimeserie(chart_index, indicator, iso_code, timeserie, start, end)
}
