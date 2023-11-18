import {useState, React} from 'react'

// eslint-disable-next-line
import Chart from 'chart.js/auto';   /* Required to mitigate some errors */
import { Line } from 'react-chartjs-2'   /* https://github.com/reactchartjs/react-chartjs-2 */

export default function Graph() {
    const [data, setData] = useState()
    const measurementPoints = yearNbLst.slice(startIndex, endIndex + 1)
    const options = {
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
            colors: {
                forceOverride: true
            }
        }
    }

    fetch(`http://${window.apiUrl}:8000/popc/10000/bce_10000/ce_2017`).then((response) => response.json())
        .then((r_json) => {
            console.log(r_json[0])
            r_json[0].forEach((value, index) => {
                data.push({
                    x: measurementPoints[index],
                    y: value
                })
            })
            setData(data)
        })
    return (
        <div style={{ height: 300 }}>
            {<Line ref={chartRef} data={data} options={{ ...options, maintainAspectRatio: false }} />}
        </div>
    )
}
