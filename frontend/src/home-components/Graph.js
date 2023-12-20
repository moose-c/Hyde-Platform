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

      const cropland_json = await fetch(
        `${domainName}/api/txt/uopp/10000/bce_10000/ce_${process.env.REACT_APP_END_YEAR}`
      ).then((response) => response.json());

      const population_json = await fetch(
        `${domainName}/api/txt/popc/10000/bce_10000/ce_${process.env.REACT_APP_END_YEAR}`
      ).then((response) => response.json());

      const populationData = [];
      const croplandData = []
      population_json[0].forEach((value, index) => {
        populationData.push({
          x: yearNbList[index],
          y: value,
        });
      });

      cropland_json[0].forEach((value, index) => {
        croplandData.push({
          x: yearNbList[index],
          y: value,
        });
      });

      data.current = {
        labels: labels,
        interaction: {
          mode: "index",
          intersect: false,
        },
        datasets: [
          {
            label: "Population",
            data: populationData,
            fill: false,
            borderColor: "rgba(255, 99, 132, 1)",
            yAxisID: "y1",
          },
          {
            label: "Urban area",
            data: croplandData,
            fill: false,
            borderColor: "rgba(54, 162, 235, 1)",
            yAxisID: "y2",
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
      /*       const rectangles = createRectanglesForGraph();
      for (const rectangle of rectangles) {
      newAnnotations[`rectangle${rectangle.idx}`] = {
        type: "box",
        xMin: rectangle.xMin,
        xMax: rectangle.xMax,
        yMin: 0,
        yMax: 8000000000,
        backgroundColor: opaqueColor(rectangle.color, 0.2),
      };
      } */
      setOptions({
        interaction: {
          intersect: false,
          mode: "index",
        },
        stacked: false,
        maintainAspectRatio: false,
        scales: {
          y1: {
            type: "linear",
            position: "left",
            display: true,
            title: {
              display: true,
              text: "[individuals]",
            },
          },
          y2: {
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
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Population and Urban Area development",
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
