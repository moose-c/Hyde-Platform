import { useState, React, useRef, useEffect } from "react";

// eslint-disable-next-line
import Chart from "chart.js/auto"; /* Required to mitigate some errors */
import { Line } from "react-chartjs-2"; /* https://github.com/reactchartjs/react-chartjs-2 */
import { yearNbLst } from "../map-components/utilities/createData";
import annotationPlugin from "chartjs-plugin-annotation";

Chart.register(annotationPlugin);

export default function Graph({ roundedYear }) {
  const [data, setData] = useState(false);
  const chartRef = useRef(null);
  const options = useRef(null);

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
                    console.log(r_json)
                    const newData = []
                    r_json[0].forEach((value, index) => {
                        newData.push({
                            x: yearNbLst[index],
                            y: value
                        })
                    })
                    options.current = {
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
                                        type: 'point',
                                        xValue: newData[yearNbLst.indexOf(roundedYear)].x,
                                        yValue: newData[yearNbLst.indexOf(roundedYear)].y,
                                        radius: 10000000,
                                    }
                                }
                            }
                        }
                    }
                    setData({
                        labels: labels, datasets: [{
                            label: 'Population', data: newData, fill: false,
                        }]
                    })
                })
        }
    }, [])


    useEffect(() => {
        if (data) {
            options.current.plugins.annotation.annotations.point1.xValue = data.datasets // give true value
            // options.current.plugins.annotation.annotations.point1.yValue = data.datasets[yearNbLst.indexOf(roundedYear)].y // give true value
            console.log(data.datasets[yearNbLst.indexOf(roundedYear)].y)
        }
    }, [roundedYear, data])

  return (
    <>
      {data ? (
        <div style={{}}>
          <Line
            ref={chartRef}
            data={data}
            options={{ ...options.current, maintainAspectRatio: false }}
          />
        </div>
      ) : (
        <div>No data yet</div>
      )}
    </>
  );
}
