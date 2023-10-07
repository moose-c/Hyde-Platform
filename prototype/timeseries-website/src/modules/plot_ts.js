import Chart from 'chart.js/auto'   /* Utilized plotting library */
import { years, yearNbLst } from './create_data';

export async function fetchTimeseries(countryIndex, indicators, isoCode, start, end) {
  // retrieve timeserie from database through API.
  var response_json;
  var timeseries = [];
  for (var indicator of indicators) {
    const url = `http://localhost:8000/${indicator}/${isoCode}/${start}/${end}`
    let response = await fetch(url)   /* Method to access API, see timeseries-backend for explenation */
    response_json = await response.json()
    timeseries.push(response_json[0])
  }
  plotTimeseries(timeseries, countryIndex, indicators, start, end)   /* With obtained timeserie, Create timeserie graph */
}

function plotTimeseries(timeseries, countryIndex, indicators, start, end) {
  // obtain indexes
  const startIndex = Object.keys(years).indexOf(start)
  const endIndex = Object.keys(years).indexOf(end)   

  var chartIndex = parseInt(document.getElementById('chart-number').textContent, 10)

  // obtain names
  const countryName = $(`#country-list :nth-child(${countryIndex + 1})`).text()   /* Utilize Jquery instead, because of Sudan exception */
  const startName = Object.values(years)[startIndex]
  const endName = Object.values(years)[endIndex]  

  if (!($('#combine').is(":checked"))) {
    indicators.forEach((indicator, index) => {
      indicator = [indicator]
      const timeserie = [timeseries[index]]
      createCharts(startName, startIndex, endName, endIndex, indicator, countryName, timeserie, chartIndex)
      chartIndex += 1
    })
  } else {   /* If combined plottig selected */
    createCharts(startName, startIndex, endName, endIndex, indicators, countryName, timeseries, chartIndex)
    chartIndex += 1
  }
  document.getElementById('chart-number').textContent = chartIndex
  if (chartIndex == $("#nb-charts").text()) {   /* i.e. If this was the final chart to be plotted */
    // Display the first graph 
    $("#plot-container").css("display", "flex")
    document.getElementById("chart-box").appendChild(document.getElementById("chart-0"))
  }
}

function createCharts(startName, startIndex, endName, endIndex, indicators, countryName, timeseries, chartIndex) {
  // Create 1 figure with for all indicators in indicator (can be 1) and ts in timeseries (can be 1)

  // general plotting necessities
  const chart = document.getElementById("chart")
  var labelLst = yearNbLst.slice(startIndex, endIndex+1)   /* timesteps where there is data */
  var yLabel
  if (['popc', 'urbc', 'rurc'].includes(indicators[0])){
    yLabel = '[-]'
  } else {
    yLabel = '[\u33A2]'
  }
  const scales = {
    x: {
      type: 'time',
      time: {
        tooltipFormat: 'YYYY'
      },
    },
  }
  const options = {
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
        text: [`Timeseries for ${countryName}, from ${startName} to ${endName}`],
      },
    }
  }

  // Create data, of the form [[{x: val, y:val}, {x: val, y: val}], [{x: val, y:val}, {x: val, y: val}]]
  var datasets = []
  var data = []
  timeseries.forEach((timeserie, index) => {
    data = []
    timeserie.forEach((value, index2) => {
      data.push({
        x: labelLst[index2],
        y: value
      })
    })
    datasets.push({
      label: $(`option[value=${indicators[index]}]`).text(),
      data: data
    })
  })

  if (!(document.getElementById('x-axis').checked)) {   /* If Relative plotting */
    new Chart(chart,
      {
        type: 'line',
        data: {
          labels: labelLst,
          datasets: datasets
        },
        scales: scales,
        options: options
      }
    )
  } else {   /* If Absolute plotting */
    // Idea is to add timelabels everywhere the same length as the timestep at the end, then earlier data will be spaced more
     labelLst = []
    var position = yearNbLst[startIndex]   /* Counter for the years */
    var minInterval = yearNbLst[endIndex] - yearNbLst[endIndex - 1]  /* Smallest interval between 2 adjacent datapoints always at the end */
    while (position <= yearNbLst[endIndex]) {
      labelLst.push(position)
      position += minInterval
    }

    new Chart(chart,
      {
        type: 'line',
        data: {
          labels: labelLst,
          datasets: datasets
        },
        scales: scales,
        options: options
      }
    )
  }
  // Store created chart in invisible chart box  
  chart.id = `chart-${chartIndex}`
  chart.className = countryName
  document.getElementById("invisible-chart-box").appendChild(chart)

  if (!(chartIndex + 1 == $("#nb-charts").text())) {   /* Not final graph */
    // Create new blank canvas
    const blankCanvas = document.createElement('canvas')
    blankCanvas.id = 'chart'
    document.getElementById('chart-box').appendChild(blankCanvas)
  }
}