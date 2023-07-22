import { plotTimeserie } from "./plot_ts"

export async function fetchTimeseries(indicators, iso_code, start, end) {
    const timeseries = []
    var response_json;
    var timeserie;
    for (let indicator of indicators){
        let response = await fetch(`http://localhost:8000/${indicator}/${iso_code}/${start}/${end}`)
        response_json = await response.json()
        timeserie = response_json[0]
        timeseries.push(timeserie)
    } 

    for (const [i, timeserie] of timeseries.entries()){
        plotTimeserie(indicators[i], iso_code, timeserie, start, end)
    }
}
