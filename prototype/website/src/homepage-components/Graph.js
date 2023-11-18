import React from 'react'

// eslint-disable-next-line
import Chart from 'chart.js/auto';   /* Required to mitigate some errors */
import { Line } from 'react-chartjs-2'   /* https://github.com/reactchartjs/react-chartjs-2 */

export default function Graph() {
    /* const fetchPromise = fetch(`http://${window.apiUrl}:8000/popc/10000/bce_10000/ce_2017`).then((response) => response.json())
        .then((r_json) => {
            console.log(r_json)
            r_json[0].forEach((value, index) => {
                allData[country.values_.ISO_A3][indicator][0].data.push({
                    x: measurementPoints[index],
                    y: value
                })
            })
            allData[country.values_.ISO_A3].all.push(allData[country.values_.ISO_A3][indicator][0])
            allData[country.values_.ISO_A3][`${indicator}_json`] = r_json
        })
    fetchPromises.push(fetchPromise) */
    return (
        <div style={{ height: 300 }}>
            {/* <Line ref={chartRef} data={data} options={{ ...options, maintainAspectRatio: false }} /> */}
        </div>
    )
}
