import { useState, useEffect } from "react"
import { Line } from 'react-chartjs-2'   /* https://github.com/reactchartjs/react-chartjs-2 */

import { years, yearNbLst } from './utilities/create_data'

import countries from "i18n-iso-countries"
import language from "i18n-iso-countries/langs/en.json"
countries.registerLocale(language);

export default function MiddleElements({ selection, startYear, endYear, indicators, plotOptions }) {
    const [currentChartNb, setCurrentChartNb] = useState(0)
    const [charts, setCharts] = useState([])

    const allData = {}  /* Structure is: data = {country : { indicator1: [values1], indicator:[values2], all: [[values1], [values2]}} */
    const allOptions = {}
    const nbCharts = plotOptions.combined ? selection : indicators * selection

    // Reflect on necessity later
    const startIndex = Object.keys(years).indexOf(startYear)
    const endIndex = Object.keys(years).indexOf(endYear)
    const measurementPoints = yearNbLst.slice(startIndex, endIndex + 1)

    // obtain names, again, necessary?
    const startName = Object.values(years)[startIndex]
    const endName = Object.values(years)[endIndex]

    var yLabel
    // modify to include value for population density and incorporate in loop
    if (['popc', 'urbc', 'rurc'].includes(indicators[0])) {
        yLabel = '[-]'
    } else {
        yLabel = '[\u33A2]'
    }

    useEffect(() => {
        // Create data, of the form [[{x: val, y:val}, {x: val, y: val}], [{x: val, y:val}, {x: val, y: val}]]
        if (plotOptions.plotting) {
            for (const country of selection) {
                allData[country.id_] = {}
                allData[country.id_].all = []
                const isoCode = parseInt(countries.alpha3ToNumeric(country.id_), 10).toString()   /* Retrieve isoCode, without leading 0's */
                allOptions[country] = {
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: yLabel
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: [`Timeseries for ${country.values_.name}, from ${startName} to ${endName}`],
                        },
                    }
                }
                for (const indicator of indicators) {
                    data[country.id_][indicator] = []
                    fetch(`http://localhost:8000/${indicator}/${isoCode}/${startYear}/${endYear}`).then(response => response.json())
                        .then(r_json => {
                            r_json[0].forEach((value, index) => {
                                allData[country.id_][indicator].push({
                                    x: measurementPoints(index),
                                    y: value
                                })
                            })
                            allData[country.id_].all.push(allData[country.id_][indicator])
                            // This not allowed. Think about options, where etc.
                            
                        })
                }
            }
        }
        if (!plotOptions.absolute) {
            var labels = measurementPoints
        } else {
            var labels = []
            var position = yearNbLst[startIndex]   /* Counter for the years */
            var minInterval = yearNbLst[endIndex] - yearNbLst[endIndex - 1]  /* Smallest interval between 2 adjacent datapoints always at the end */
            while (position <= yearNbLst[endIndex]) {
                labels.push(position)
                position += minInterval
            }
        }
    }, [plotOptions])  

    function handleChangeChart(increment) {
        const newChartNb = currentChartNb + increment
        var options = allOptions[selection[l]]   /* FIX? */
        if (0 <= newChartNb && newChartNb <= nbCharts - 1) { setCurrentChartNb(newChartNb) }
        
    }
    return (
        <>
            <button onClick={() => handleChangeChart(-1)}>&#8249;</button>
            <div>
                <p>Chart {currentChartNb}</p>
                <Line options={options} data={data}/>
            </div>
            <button onClick={() => handleChangeChart(1)}>&#8250;</button>
        </>
    )
}