import { useState, React, useRef, useEffect } from 'react'

// eslint-disable-next-line
import Chart from 'chart.js/auto';   /* Required to mitigate some errors */
import { Line } from 'react-chartjs-2'   /* https://github.com/reactchartjs/react-chartjs-2 */
import { yearNbLst } from '../map-components/utilities/createData';

export default function Graph({year}) {
    const [data, setData] = useState(false)
    const chartRef = useRef(null)

    const options = {
        responsive: false,
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
    const labels = []
    var position = yearNbLst[0]   /* Counter for the years */
    var minInterval = yearNbLst[yearNbLst.length-1] - yearNbLst[yearNbLst.length - 2]  /* Smallest interval between 2 adjacent datapoints always at the end */
    while (position <= yearNbLst[yearNbLst.length-1]) {
        labels.push(position)
        position += minInterval
    }

    fetch(`http://${window.apiUrl}:8000/popc/10000/bce_10000/ce_2017`).then((response) => response.json())
        .then((r_json) => {
            const newData = []
            r_json[0].forEach((value, index) => {
                newData.push({
                    x: yearNbLst[index],
                    y: value
                })
            })
            setData({ labels: labels, datasets: [{ label: 'Population', data: newData }] })
        })
    
    useEffect(() => {
        console.log('year changed')
        if (data) {
            console.log(chartRef.current)
        }
    }, [year])

    return (
        <div style={{ height: 300 }}>
            {data && (<Line ref={chartRef} data={data} options={{ ...options, maintainAspectRatio: false }} />)}
        </div>
    )
}
