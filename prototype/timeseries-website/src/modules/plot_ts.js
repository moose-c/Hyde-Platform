import Chart from 'chart.js/auto'   /* Utilized plotting library */
import { years, yearNbLst } from './create_data';

import countries from "i18n-iso-countries"
import language from "i18n-iso-countries/langs/en.json"
countries.registerLocale(language);

export async function fetchTimeseries(chartIndex, countryIndex, indicators, isoCode, start, end) {
  // retrieve timeserie from database through API.
  var response_json;
  var timeseries = [];
  for (var indicator of indicators) {
    const url = `http://localhost:8000/${indicator}/${isoCode}/${start}/${end}`
    let response = await fetch(url)   /* Method to access API, see timeseries-backend for explenation */
    response_json = await response.json()
    timeseries.push(response_json[0])
  }
  plotTimeserie(timeseries, chartIndex, countryIndex, indicators, start, end)   /* With obtained timeserie, Create timeserie graph */
}

export function plotTimeserie(timeseries, chartIndex, countryIndex, indicators, start, end) {
  // obtain indexes
  const startIndex = Object.keys(years).indexOf(start)
  const endIndex = Object.keys(years).indexOf(end) + 1   /* to ensure that the end year is included */

  // obtain names
  // const countryName = countries.getName(isoCode, "en")   /* Easy way, however not suitable with the Sudan situation */
  const countryName = $(`#country-list :nth-child(${countryIndex + 1})`).text()   /* Utilize Jquery instead */
  const startName = Object.values(years)[startIndex]
  const endName = Object.values(years)[endIndex - 1]   /* I don't really understand why this */

  // general plotting necessities
  const chart = document.getElementById("chart")   /* Location */
  const labelLst = yearNbLst.slice(startIndex, endIndex)   /* timesteps where there is data */

  if (!$('#combine').is(":checked")) {
    indicators.forEach((indicator, index) => {
      const indicatorName = $(`option[value=${indicator}]`).text()
      const options = {
        plugins: {
          title: {
            display: true,
            text: [`Timeserie for ${countryName}`, `indicator ${indicatorName} from ${startName} to ${endName}`],
          },
          legend: {
            display: false
          }
        }
      }
      var scales = {
        x: {
          type: 'time',
          time: {
            tooltipFormat: 'YYYY'
          }
        }
      }
      var data = []
      timeseries[index].forEach((value, index) => {
        data.push({
          x: labelLst[index],
          y: value
        })
      })
      if (!(document.getElementById('x-axis').checked)) {   /* If Relative plotting */
        new Chart(chart,
          {
            type: 'line',
            data: {
              labels: labelLst,
              datasets: [
                {
                  data: data
                }
              ]
            },
            scales: scales,
            options: options
          }
        )
      } else {   /* If Absolute plotting */
        // Idea is to add timelabels everywhere the same length as the timestep at the end, then earlier data will be spaced more
        var yearsSmallInterval = []
        var position = yearNbLst[startIndex]   /* Counter for the years */
        var minInterval = yearNbLst[endIndex] - yearNbLst[endIndex - 1]  /* Smallest interval between 2 adjacent datapoints always at the end */
        while (position < yearNbLst[endIndex]) {
          yearsSmallInterval.push(position)
          position += minInterval
        }

        new Chart(chart,
          {
            type: 'line',
            data: {
              labels: yearsSmallInterval,
              datasets: [{
                data: data
              }]
            },
            scales: scales,
            options: options
          }
        )
      }
    }
    )
  } else {   /* If combined plottig selected */

  }

  // Store created chart in invisible chart box  
  chart.id = `chart-${chartIndex}`
  chart.className = countryName
  document.getElementById("invisible-chart-box").appendChild(chart)

  if (chartIndex + 1 == $("#nb-charts").text()) {   /* i.e. If this was the final chart to be plotted */
    // Display the first graph 
    $("#plot-container").css("display", "flex")
    document.getElementById("chart-box").appendChild(document.getElementById("chart-0"))
  } else {
    // Create new blank canvas
    const blankCanvas = document.createElement('canvas')
    blankCanvas.id = 'chart'
    document.getElementById('chart-box').appendChild(blankCanvas)
  }
}
