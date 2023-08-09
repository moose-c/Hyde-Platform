import Chart from 'chart.js/auto'
import { years } from './create_data';

import countries from "i18n-iso-countries"
import language from "i18n-iso-countries/langs/en.json"
countries.registerLocale(language);

export function plotTimeserie(indicator, iso_code, timeserie, start, end) {
  // obtain labels
  const start_index = Object.keys(years).indexOf(start)
  const end_index = Object.keys(years).indexOf(end)+1 // to ensure that the end year is included
  const label_lst = Object.values(years).slice(start_index, end_index)

  // obtain names
  const country_name = countries.getName(iso_code, "en")
  const indicator_name = document.querySelector(`option[value=${indicator}]`).textContent
  const start_name = Object.values(years)[start_index]
  const end_name = Object.values(years)[end_index]

  // actual plotting
  new Chart(
    document.getElementById('chart1'),
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
}