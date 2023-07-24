import Chart from 'chart.js/auto'
import { years } from './create_data';

import countries from "i18n-iso-countries"
import language from "i18n-iso-countries/langs/en.json"
countries.registerLocale(language);

export function plotTimeserie(chart_index, indicator, iso_code, timeserie, start, end) {
  // // clean previous chart
  // const canvas = document.createElement('canvas')
  // canvas.id = 'chart'
  // const old_canvas = document.getElementById('chart')
  // old_canvas.replaceWith(canvas)

  // obtain labels
  const start_index = Object.keys(years).indexOf(start)
  const end_index = Object.keys(years).indexOf(end)+1 // to ensure that the end year is included
  const label_lst = Object.values(years).slice(start_index, end_index)

  // obtain names
  const country_name = countries.getName(iso_code, "en")
  console.log(`${chart_index}, ${indicator}, ${iso_code}`)
  const indicator_name = document.querySelector(`option[value=${indicator}]`).textContent
  const start_name = Object.values(years)[start_index]
  const end_name = Object.values(years)[end_index]

  console.log(document.getElementById(`chart${chart_index}`))
  // actual plotting
  new Chart(
    document.getElementById(`chart${chart_index}`),
    {
      type: 'line',
      data: {
        labels: label_lst,
        datasets: [
          {
            label: `Timeserie for ${country_name} and indicator ${indicator_name} from ${start_name} to ${end_name}.`,
            data: timeserie
          }
        ]
      }
    }
  )
  document.getElementById("canvas-container").style.display = "flex"
  const chart0 = document.getElementById("chart0")
  chart0.width = 300
  chart0.height = 200
  document.getElementById("chart").replaceWith(document.getElementById("chart0"))
  // document.getElementById("chart-box").appendChild(starting_chart)
}