import Chart from 'chart.js/auto'

export async function plotTimeseries(timeseries, start, end) {
    // const all_labels = something, once define somewhere all of the years.
      new Chart(
        document.getElementById('chart1'),
        {
          type: 'line',
          data: {
            labels: data.map(row => row.year),
            datasets: [
              {
                label: 'Acquisitions by year',
                data: data.map(row => row.count)
              }
            ]
          }
        }
      );
    }