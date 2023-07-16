import { plotTimeseries } from "./plot_ts"

export async function fetchTimeseries(indicators, iso_code, start, end) {
    const timeseries = []
    var response_json;
    var timeserie;
    for (var indicator of indicators){
        let response = await fetch(`http://192.168.68.128:8000/${indicator}/${iso_code}/${start}/${end}`)
        response_json = await response.json()
        timeserie = response_json[0]
        timeseries.push(timeserie)
    }
    console.log(timeseries) 

    for (var timeserie of timeseries){
        plotTimeseries(timeserie, start, end)
    }
}
