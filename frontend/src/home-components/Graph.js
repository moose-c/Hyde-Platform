/* Code to display graphs fetching data from the timeseries-api */

import { useState, React, useRef, useEffect } from "react";

// eslint-disable-next-line
import Chart from "chart.js/auto"; /* Required to mitigate some errors */
import { Line } from "react-chartjs-2"; /* https://github.com/reactchartjs/react-chartjs-2 */
import { yearNbList } from "../util/createData";
import annotationPlugin from "chartjs-plugin-annotation";
import { timelineObjects } from "../util/timelineObjects";
import opaqueColor from "../util/opaqueColor";

Chart.register(annotationPlugin);

// here we create the rectangles to be added to the graph, such that the background color of the graph is changed
// in accordance with the timeline objects
// note that timelineObject ranges from 0 to 12023, while YearNBlist ranges from -10000 to 2023
// so we need to substrac 10000 from the timelineObject years
const createRectanglesForGraph = () => {
  return timelineObjects.map((timelineObject, idx) => {
    const xMin = yearNbList.indexOf(timelineObject.startYear - 10000);
    const xMax = yearNbList.indexOf(timelineObject.endYear - 10000);
    const color = timelineObject.color;
    return { idx, xMin, xMax, color };
  });
};

export default function Graph({ roundedYear }) {
  const data = useRef(null);
  const [options, setOptions] = useState(null);

  /*   var labels = []
    var position = yearNbList[0]
    var minInterval = yearNbList[yearNbList.length - 1] - yearNbList[yearNbList.length - 2]
    while (position <= yearNbList[yearNbList.length - 1]) {
      labels.push(position)
      position += minInterval
    } */
  const labels = yearNbList;

  useEffect(() => {
    async function createFigure() {
      //  Fetched data is an array of numbers corresponding to float values for the population index, from 10000 BCE until 2023 
      var domainName =
        window.apiUrl === "" ? window.apiUrl : `${window.apiUrl}:8000`;

      // these variables are of the form: .._json = [[1,3,2,3]]
      const cropland_json = await fetch(
        `${domainName}/api/txt/cropland/10000/bce_10000/ce_${process.env.REACT_APP_END_YEAR}`
      ).then((response) => response.json());

      const grazing_json = await fetch(
        `${domainName}/api/txt/grazing/10000/bce_10000/ce_${process.env.REACT_APP_END_YEAR}`
      ).then((response) => response.json());

      const grazingData = [];
      const croplandData = []
      for (var i = 0; i < grazing_json[0].length; i++){
        grazingData.push({
          x: yearNbList[i],
          y: grazing_json[0][i],
        });
        croplandData.push({
          x: yearNbList[i],
          y: cropland_json[0][i],
        });
      }
      
      data.current = {
        labels: labels,
        interaction: {
          mode: "index",
          intersect: false,
        },
        datasets: [
          {
            label: "Pasture",
            data: grazingData,
            fill: false,
            borderColor: "rgba(255, 99, 132, 1)",
          },
          {
            label: "Grazing Land",
            data: croplandData,
            fill: false,
            borderColor: "rgba(54, 162, 235, 1)",
          },
        ],
      };

      const newAnnotations = {
        line1: {
          type: "line",
          scaleID: "x",
          value: yearNbList.indexOf(roundedYear),
          borderColor: "blue",
          borderWidth: 2,
        },
      };
      setOptions({
        interaction: {
          intersect: false,
          mode: "index",
        },
        stacked: false,
        maintainAspectRatio: false,
        scales: {
          y: {
            type: "linear",
            position: "right",
            display: true,
            title: {
              display: true,
              text: "[km\u00b2]",
            },
          },
          x: {
            title: {
              display: true,
              text: "[year]",
              padding:0
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Cropland and Pasture development",
          },
          annotation: {
            annotations: newAnnotations,
          },
        },
      });
    }
    if (roundedYear) {
      createFigure()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (options !== null) {
      setOptions((prevOptions) => {
        const updatedOptions = { ...prevOptions };
        updatedOptions.plugins.annotation.annotations.line1.value =
          yearNbList.indexOf(roundedYear);
        return updatedOptions;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundedYear]);

  return (
    <>
      {data.current ? (
        <div style={{ width: "100%", height: "100%" }}>
          <Line data={data.current} options={options} />
        </div>
      ) : (
        <div>No data yet</div>
      )}
    </>
  );
}
