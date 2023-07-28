import Chart from 'chart.js/auto'
import { years } from './create_data';

import countries from "i18n-iso-countries"
import language from "i18n-iso-countries/langs/en.json"
countries.registerLocale(language);

export async function fetchTimeserie(chart_index, indicator, iso_code, start, end) {
  // retrieve timeserie from database through API.
  var response_json;
  var timeserie;
  let response = await fetch(`http://localhost:8000/${indicator}/${iso_code}/${start}/${end}`)
  response_json = await response.json()
  timeserie = response_json[0]
  plotTimeserie(timeserie, chart_index, indicator, iso_code, start, end)
}

export function plotTimeserie(timeserie, chart_index, indicator, iso_code, start, end) {
  // obtain labels
  const start_index = Object.keys(years).indexOf(start)
  const end_index = Object.keys(years).indexOf(end)+1 // to ensure that the end year is included
  const label_lst = Object.values(years).slice(start_index, end_index)

  // obtain names
  const country_name = countries.getName(iso_code, "en")
  const indicator_name = document.querySelector(`option[value=${indicator}]`).textContent
  const start_name = Object.values(years)[start_index]
  const end_name = Object.values(years)[end_index]


  // const chart = document.getElementById("chart")
  // console.log(chart)
  // actual plotting
  console.log(document.getElementById("chart"))
  const chart = document.getElementById("chart")
  new Chart(chart,
    {
      type: 'line',
      data: {
        labels: label_lst,
        datasets: [
          {
            data: timeserie
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: [`Timeserie for ${country_name}`,`indicator ${indicator_name} from ${start_name} to ${end_name}.`],
          },
          legend: {
            display: false
          }
        }
      }
    }
  )
  document.getElementById("canvas-container").style.display = "flex"
  chart.id = `chart-${chart_index}`
  document.getElementById("invisible-chart-box").appendChild(chart)
  
  const blank_canvas = document.createElement('canvas')
  blank_canvas.id = "chart"
  document.getElementById("chart-box").appendChild(blank_canvas)

  if (chart_index+1 == document.getElementById("nb-charts").textContent) {
    document.getElementById("chart").replaceWith(document.getElementById("chart-0"))
  }
}