import { useState, useEffect, useRef } from "react"

import Chart from 'chart.js/auto';   /* Required to mitigate some erros */
import { Line } from 'react-chartjs-2'   /* https://github.com/reactchartjs/react-chartjs-2 */

import { years, yearNbLst } from './utilities/create_data'   /* First an object from value to name, second a list */

// For requesting iso codes
import countries from "i18n-iso-countries"
import language from "i18n-iso-countries/langs/en.json"
countries.registerLocale(language);

export default function MiddleElements({ selection, startYear, endYear, indicators, plotOptions }) {
    const [currentChartNb, setCurrentChartNb] = useState(0)
    const [data, setData] = useState(false)
    const allDataRef = useRef(false)
    const options = useRef([])
    const labels = useRef([])

    const allData = {}  /* Structure is: data = {country : { indicator1: [{label: lbl, data: values1}], indicator:[{label: lbl, data: values2}], all: [{label: lbl, data: values1}, {label: lbl, data: values2}]}} */
    let currentCountry
    let currentIndicator

    var fetchPromises = [];
    const nbCharts = plotOptions.combined ? selection.length : indicators.length * selection.length

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
        if (!plotOptions.absolute) {
            labels.current = measurementPoints
        } else {
            labels.current = []
            var position = yearNbLst[startIndex]   /* Counter for the years */
            var minInterval = yearNbLst[endIndex] - yearNbLst[endIndex - 1]  /* Smallest interval between 2 adjacent datapoints always at the end */
            while (position <= yearNbLst[endIndex]) {
                labels.current.push(position)
                position += minInterval
            }
        }
        // Create data, values of the form [[{x: val, y:val}, {x: val, y: val}], [{x: val, y:val}, {x: val, y: val}]]
        if (plotOptions.plotting) {
            fetchPromises = []
            for (const country of selection) {
                allData[country.id_] = {}
                allData[country.id_].all = []
                const isoCode = parseInt(countries.alpha3ToNumeric(country.id_), 10).toString()   /* Retrieve isoCode, without leading 0's */
                indicators.forEach((indicator, index) => {
                    allData[country.id_][indicator] = [{
                        label: indicator,
                        data: []
                    }]
                    const fetchPromise = fetch(`http://localhost:8000/${indicator}/${isoCode}/${startYear}/${endYear}`).then((response) => response.json())
                        .then((r_json) => {
                            r_json[0].forEach((value, index) => {
                                allData[country.id_][indicator][0].data.push({
                                    x: measurementPoints[index],
                                    y: value
                                })
                            })
                            allData[country.id_].all.push(allData[country.id_][indicator][0])
                        })
                    fetchPromises.push(fetchPromise)
                })
            }
            // Set Charts again to first
            Promise.all(fetchPromises).then(() => {
                allDataRef.current = allData
                handleChangeChart(-currentChartNb)
            })
        }
    }, [plotOptions])

    function handleChangeChart(increment) {
        const newChartNb = currentChartNb + increment
        if (0 <= newChartNb && newChartNb <= nbCharts - 1) {
            currentCountry = plotOptions.combined ? selection[newChartNb] : selection[Math.floor(newChartNb / indicators.length)] /* 5 indicators relative -> for 5 chart changes no country change. combined -> combined direct change*/
            console.log(currentCountry)
            currentIndicator = indicators[newChartNb % indicators.length]
            const datasets = (plotOptions.combined ? allDataRef.current[currentCountry.id_].all : allDataRef.current[currentCountry.id_][currentIndicator])
            options.current = ({
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
                        text: [`Timeseries for ${currentCountry.values_.name}, from ${startName} to ${endName}`],
                    },
                }
            })
            setData({ labels: labels.current, datasets: datasets })
            setCurrentChartNb(newChartNb)
        } else {
            alert('chart number out of range!')
        }
    }
    console.log(data)   /* Nearly there! */
    return (
        <>
            <button onClick={() => handleChangeChart(-1)}>&#8249;</button>
            <div>
                <p>Chart {currentChartNb}</p>
                {data && <Line data={data} options={options.current} />}
            </div>
            <button onClick={() => handleChangeChart(1)}>&#8250;</button>
        </>
    )
}