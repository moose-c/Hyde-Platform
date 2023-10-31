import { React, useState, useEffect, useRef } from "react"

// eslint-disable-next-line
import Chart from 'chart.js/auto';   /* Required to mitigate some errors */
import { Line } from 'react-chartjs-2'   /* https://github.com/reactchartjs/react-chartjs-2 */

import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import { years, yearNbLst, indicatorTxtObj } from '../utilities/createData'   /* First an object from value to name, second a list */

// For requesting iso codes
import countries from "i18n-iso-countries"
import language from "i18n-iso-countries/langs/en.json"

countries.registerLocale(language);

export default function Charts({ selection, startYear, endYear, tsIndicators, plotOptions, setPlotOptions }) {
    const allDataRef = useRef(false)
    const currentCountry = useRef(false)
    const currentIndicator = useRef(false)

    const labels = useRef([])
    const chartRef = useRef(null)
    const chartFinishedRendering = useRef(false)

    const [currentChartNb, setCurrentChartNb] = useState(null)
    const [data, setData] = useState(null)
    const [options, setOptions] = useState({
        animation: {
            onComplete: function () {
                chartFinishedRendering.current = true
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'placeholder'
                }
            },
            x: {
                title: {
                    display: true,
                    text: '[year]'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'placeholder'
            },
        }
    })

    const [exportTs, setExportTs] = useState({ type: 'false' })
    const [exportTsAmt, setExportTsAmt] = useState('displayed')

    const allData = {}  /* Structure is: data = {country : { indicator1: [{label: lbl, data: values1}], indicator:[{label: lbl, data: values2}], all: [{label: lbl, data: values1}, {label: lbl, data: values2}]}} */


    const nbCharts = plotOptions.combined ? selection.length : tsIndicators.length * selection.length

    // Reflect on necessity later
    const startIndex = Object.keys(years).indexOf(startYear)
    const endIndex = Object.keys(years).indexOf(endYear)
    const measurementPoints = yearNbLst.slice(startIndex, endIndex + 1)

    // obtain names, again, necessary?
    const startName = Object.values(years)[startIndex]
    const endName = Object.values(years)[endIndex]

    // Not yet functional
    const [avoidExtraCall, setAvoidExtraCall] = useState(false);


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
            var fetchPromises = []
            for (const country of selection) {
                // Do something slighly different if selected country is South Sudan
                allData[country.values_.ISO_A3] = {}
                allData[country.values_.ISO_A3].all = []
                const isoCode = parseInt(countries.alpha3ToNumeric(country.values_.ISO_A3), 10).toString()   /* Retrieve isoCode, without leading 0's */
                tsIndicators.forEach((indicator) => {
                    allData[country.values_.ISO_A3][indicator] = [{
                        label: Object.assign({}, ...Object.values(indicatorTxtObj))[indicator],
                        data: []
                    }]
                    const fetchPromise = fetch(`http://${window.apiUrl}:8000/${indicator}/${isoCode}/${startYear}/${endYear}`).then((response) => response.json())
                        .then((r_json) => {
                            r_json[0].forEach((value, index) => {
                                allData[country.values_.ISO_A3][indicator][0].data.push({
                                    x: measurementPoints[index],
                                    y: value
                                })
                            })
                            allData[country.values_.ISO_A3].all.push(allData[country.values_.ISO_A3][indicator][0])
                            allData[country.values_.ISO_A3][`${indicator}_json`] = r_json
                        })
                    fetchPromises.push(fetchPromise)
                })
            }
            // Set Charts again to first
            Promise.all(fetchPromises).then(() => {
                allDataRef.current = allData
                handleChangeChart(0)
            })
        } // eslint-disable-next-line
    }, [plotOptions, selection, tsIndicators])

    function handleKeyDown(event) {
        if (!avoidExtraCall) {
            setAvoidExtraCall(true)
            if (event.key === 'ArrowLeft') {
                setCurrentChartNb(prevState => prevState - 1 >= 0 ? prevState - 1 : 0)
            } else if (event.key === 'ArrowRight') {
                setCurrentChartNb(prevState => prevState + 1 < nbCharts ? prevState + 1 : nbCharts - 1)
            }
        }
    }


    function handleChangeChart(newChartNb) {
        if (plotOptions.plotting && selection.length > 0 && tsIndicators.length > 0 && Object.keys(allDataRef.current).length > 0) {
            currentCountry.current = plotOptions.combined ? selection[newChartNb] : selection[Math.floor(newChartNb / tsIndicators.length)]
            currentIndicator.current = plotOptions.combined ? null : tsIndicators[newChartNb % tsIndicators.length]
            var datasets = (plotOptions.combined ? allDataRef.current[currentCountry.current.values_.ISO_A3].all : allDataRef.current[currentCountry.current.values_.ISO_A3][currentIndicator.current])
            const newOptions = options
            newOptions.plugins.title.text = [`Timeseries for ${currentCountry.current.values_.ADMIN}, from ${startName} to ${endName}`]
            newOptions.scales.y.title.text = plotOptions.combined ? null : chooseYLabel(currentIndicator.current)
            setOptions(newOptions)
            setData({ labels: labels.current, datasets: datasets })
            setCurrentChartNb(newChartNb)
        } else {
            setData(null)
        }
    }



    useEffect(() => {
        if (exportTs.type === 'CSV') {
            const headersSingle = `Year,${currentCountry.current.values_.ADMIN} - ${Object.assign({}, ...Object.values(indicatorTxtObj))[currentIndicator.current]} ${chooseYLabel(currentIndicator.current)}`
            var headersMultiple = `Year`
            var rowContent = ''
            measurementPoints.forEach((value, i) => {
                if (exportTsAmt === 'displayed') {
                    rowContent += `${value},` + allDataRef.current[currentCountry.current.values_.ISO_A3][`${currentIndicator.current}_json`][0][i] + '\r\n'
                } else if (exportTsAmt === 'all') {
                    var row = value
                    for (const country of selection) {
                        for (const indicator of tsIndicators) {
                            const newHeader = `,${country.values_.ADMIN} - ${Object.assign({}, ...Object.values(indicatorTxtObj))[indicator]} ${chooseYLabel(currentIndicator.current)}`
                            if (!headersMultiple.includes(newHeader)) {
                                headersMultiple += newHeader
                            }
                            row += ',' + allDataRef.current[country.values_.ISO_A3][`${indicator}_json`][0][i]
                        }
                    }
                    rowContent += row + '\r\n'
                }
            })
            var csvContent = `data:tetxt/csv;chartset=utf-8,`
            csvContent += exportTsAmt === 'displayed' ? headersSingle : headersMultiple
            csvContent += '\r\n' + rowContent
            var encodedUri = encodeURI(csvContent)
            const link = document.createElement('a')
            link.href = encodedUri
            link.download = 'titel.csv'
            link.click()
            // iets met de json doen: [list of values]
        } else if (exportTs.type === 'jpeg') {
            if (exportTsAmt === 'displayed') {
                const link = document.createElement('a');
                link.download = 'chart' + '.jpeg'
                link.href = chartRef.current.toBase64Image('image/jpeg', 1);
                link.click();
            } else if (exportTsAmt === 'all') {
                chartFinishedRendering.current = false
                const startingChartNb = currentChartNb
                const awaitChartRender = async () => {
                    for (let i = 0; i < nbCharts; i++) {
                        console.log((startingChartNb + i) % nbCharts, startingChartNb, nbCharts)
                        handleChangeChart((startingChartNb + i) % nbCharts)
                        while (true) {
                            await new Promise(resolve => setTimeout(resolve, 10))
                            if (chartFinishedRendering.current) { break }
                        }
                        chartFinishedRendering.current = false
                        const link = document.createElement('a');
                        link.download = 'chart' + '.jpeg'
                        link.href = chartRef.current.toBase64Image('image/jpeg', 1);
                        link.click();
                        link.remove()
                    }
                    handleChangeChart(startingChartNb)
                }
                awaitChartRender()
            }
        }
    }, [exportTs])

    return (
        <>
            {data && (
                <div onKeyDown={(e) => handleKeyDown(e)} onKeyUp={() => setAvoidExtraCall(false)} style={{ backgroundColor: 'white' }}>
                    <div style={{ height: '300px' }}>
                        <Line ref={chartRef} data={data} options={{ ...options, maintainAspectRatio: false }} />
                    </div>
                    <Form>
                        <Button onClick={() => handleChangeChart(currentChartNb - 1 >= 0 ? currentChartNb - 1 : 0)}>&#8249;</Button>
                        <Button onClick={() => handleChangeChart(currentChartNb + 1 < nbCharts ? currentChartNb + 1 : nbCharts - 1)}>&#8250;</Button>
                        <Dropdown style={{ position: "absolute", right: 0, bottom: 0 }} drop="end">
                            <Dropdown.Toggle>
                                Export
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <ToggleButtonGroup type="radio" name="exportTs" defaultValue='displayed' onChange={(e) => setExportTsAmt(e)}>
                                    <ToggleButton size="sm" id="tbg-exportTs-1" value='displayed'>Displayed</ToggleButton>
                                    <ToggleButton size="sm" id="tbg-exportTs-2" value='all'>All</ToggleButton>
                                </ToggleButtonGroup>
                                <Dropdown.Item onClick={() => setExportTs({ type: 'CSV' })}>To CSV</Dropdown.Item>
                                <Dropdown.Item onClick={() => setExportTs({ type: 'jpeg' })}>To jpeg</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Row>
                            <Form.Label> Change X-axis:
                                <ToggleButtonGroup type="radio" name="xAxis" defaultValue={1} onChange={() => setPlotOptions({ ...plotOptions, absolute: !plotOptions.absolute })}>
                                    <ToggleButton size="sm" id="tbg-axis-1" value={1}>Relative</ToggleButton>
                                    <ToggleButton size="sm" id="tbg-axis-2" value={2}>Absolute</ToggleButton>
                                </ToggleButtonGroup>
                            </Form.Label>
                        </Row>
                        <Form.Label> Change Graphs:
                            <ToggleButtonGroup type="radio" name="figures" defaultValue={1} onChange={() => setPlotOptions({ ...plotOptions, combined: !plotOptions.combined })}>
                                <ToggleButton size="sm" id="tbg-figures-1" value={1}>Seperate</ToggleButton>
                                <ToggleButton size="sm" id="tbg-figures-2" value={2}>Combined</ToggleButton>
                            </ToggleButtonGroup>
                        </Form.Label>
                    </Form>

                </div>)}
        </>
    )
}

// Little helper function
function chooseYLabel(ind) {
    if (['popc', 'urbc', 'rurc'].includes(ind)) {
        return '[inh]'
    } else if ('popd' === ind) {
        return '[inh/\u33A2]'
    } else { return '[\u33A2]' }
}