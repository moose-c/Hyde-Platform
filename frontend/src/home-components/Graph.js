/* Code to display graphs fetching data from the timeseries-api */

import { useState, React, useRef, useEffect } from "react";

// eslint-disable-next-line
import Chart from "chart.js/auto"; /* Required to mitigate some errors */
import { Line } from "react-chartjs-2"; /* https://github.com/reactchartjs/react-chartjs-2 */
import { yearNbList } from "../util/createData";
import annotationPlugin from "chartjs-plugin-annotation";

Chart.register(annotationPlugin);

export default function Graph({ roundedYear }) {
    const data = useRef(null)
    const [options, setOptions] = useState(null);

/*     var labels = []
    var position = yearNbList[0]
    var minInterval = yearNbList[yearNbList.length - 1] - yearNbList[yearNbList.length - 2]
    while (position <= yearNbList[yearNbList.length - 1]) {
        labels.push(position)
        position += minInterval
    } */
    const labels = yearNbList;

    useEffect(() => {
        if (roundedYear) {
            /* Fetched data is an array of numbers corresponding to float values for the population index, from 10000 BCE until 2023 */
            var domainName = window.apiUrl ? window.apiUrl === ''  : `${window.apiUrl}:8000`
            fetch(`${domainName}/api/txt/popc/10000/bce_10000/ce_${process.env.REACT_APP_END_YEAR}`).then((response) => response.json())
                .then((r_json) => {
                    const newData = []
                    r_json[0].forEach((value, index) => {
                        newData.push({
                            x: yearNbList[index],
                            y: value
                        })
                    })
                    data.current = {
                        labels: labels, datasets: [{
                            label: 'Population', data: newData, fill: false,
                        }]
                    }
                    setOptions({
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                title: {
                                    display: true,
                                    text: '[individuals]'
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
                                text: 'Global population development'
                            },
                            annotation: {
                                annotations: {
                                    point1: {
                                        type: "point",
                                        radius: 5,
                                        backgroundColor: "rgba(255, 99, 132, 0.25)",
                                    },
                                },
                            },
                        }
                    })
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (options !== null) {
            setOptions((prevOptions) => {
                const updatedOptions = { ...prevOptions }
                updatedOptions.plugins.annotation.annotations.point1.xValue = yearNbList.indexOf(roundedYear)
                updatedOptions.plugins.annotation.annotations.point1.yValue = data.current.datasets[0].data[yearNbList.indexOf(roundedYear)].y
                return updatedOptions
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roundedYear])

    return (
        <>
            {data.current ? (
                <div style={{}}>
                    <Line
                        data={data.current}
                        options={options}
                    />
                </div>
            ) : (
                <div>No data yet</div>
            )}
        </>
    );
}
