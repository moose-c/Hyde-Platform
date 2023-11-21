import { useState, React, useRef, useEffect } from "react";

// eslint-disable-next-line
import Chart from "chart.js/auto"; /* Required to mitigate some errors */
import { Line } from "react-chartjs-2"; /* https://github.com/reactchartjs/react-chartjs-2 */
import { yearNbLst } from "../map-components/utilities/createData";
import annotationPlugin from "chartjs-plugin-annotation";

Chart.register(annotationPlugin);

export default function Graph({ roundedYear }) {
    const data = useRef(null)
    const [options, setOptions] = useState(null);
    const chartRef = useRef(null);

    /*     var labels = []
          var position = yearNbLst[0]  
          var minInterval = yearNbLst[yearNbLst.length - 1] - yearNbLst[yearNbLst.length - 2] 
          while (position <= yearNbLst[yearNbLst.length - 1]) {
              labels.push(position)
              position += minInterval
          } */
    const labels = yearNbLst;

    useEffect(() => {
        if (roundedYear) {
            fetch(`http://${window.apiUrl}:8000/popc/10000/bce_10000/ce_2017`).then((response) => response.json())
                .then((r_json) => {
                    const newData = []
                    r_json[0].forEach((value, index) => {
                        newData.push({
                            x: yearNbLst[index],
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
                                        xValue: yearNbLst.indexOf(roundedYear),
                                        yValue: newData[yearNbLst.indexOf(roundedYear)].y,
                                        radius: 5,
                                        backgroundColor: "rgba(255, 99, 132, 0.25)",
                                    },
                                },
                            },
                        }
                    })
                })
        }
    }, [])

    useEffect(() => {
        if (options !== null) {
            setOptions((prevOptions) => {
                const updatedOptions = { ...prevOptions }
                updatedOptions.plugins.annotation.annotations.point1.xValue = yearNbLst.indexOf(roundedYear)
                updatedOptions.plugins.annotation.annotations.point1.yValue = data.current.datasets[0].data[yearNbLst.indexOf(roundedYear)].y
                return updatedOptions
            })
        }
    }, [roundedYear])

    return (
        <>
            {data.current ? (
                <div style={{}}>
                    <Line
                        ref={chartRef}
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
