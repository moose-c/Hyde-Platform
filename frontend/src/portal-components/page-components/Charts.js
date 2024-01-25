import { React, useState, useEffect, useRef } from "react";

// eslint-disable-next-line
import Chart from "chart.js/auto"; /* Required to mitigate some errors */
import { Line } from "react-chartjs-2"; /* https://github.com/reactchartjs/react-chartjs-2 */

import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import {
  yearsObject,
  yearNbList,
  indicatorTxtObj,
} from "../../util/createData"; /* First an object from value to name, second a list */

// For requesting iso codes
import countries from "i18n-iso-countries";
import language from "i18n-iso-countries/langs/en.json";
countries.registerLocale(language);

export default function Charts({ selection, startYear, endYear, tsIndicators, plotOptions, setPlotOptions, }) {
  /* Creates the Charts within the lower left corner. 
    Makes use of timeseries-api.
    There are 2 options for the user to keep in mind: 
    - relative/absolute ploting (different x axis --> different labels)
    - single/multiple plots per country
    */
  const allDataRef = useRef(false);
  const currentCountry = useRef(false);
  const currentIndicator = useRef(false);

  // labels are the x axis
  const labels = useRef([]);
  const chartRef = useRef(null);
  const chartFinishedRendering = useRef(false);

  const [currentChartNb, setCurrentChartNb] = useState(null);
  const [data, setData] = useState(null);
  const [exportAmt, setExportAmt] = useState("displayed");
  const [options, setOptions] = useState({
    animation: {
      onComplete: function () {
        chartFinishedRendering.current = true;
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "placeholder",
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
        text: "placeholder",
      },
      colors: {
        forceOverride: true,
      },
    },
  });

  /* Eventual structure of data is: data = {country : { indicator1: [{label: label1, data: values1}], indicator:[{label: label2, data: values2}], all: [{label: label1, data: values1}, {label: label2, data: values2}]}} */
  const allData = {};

  const nbCharts = useRef(tsIndicators.length * selection.length)

  const indicatorValueName = Object.assign({}, ...Object.values(indicatorTxtObj))
  const startIndex = Object.keys(yearsObject).indexOf(startYear);
  const endIndex = Object.keys(yearsObject).indexOf(endYear);
  const measurementPoints = yearNbList.slice(startIndex, endIndex + 1);
  const startName = Object.values(yearsObject)[startIndex];
  const endName = Object.values(yearsObject)[endIndex];

  /* Start plot when button is clicked
  Update plot when different country selected, indicators changed or start/end year changed
  Uses timeseries-api*/
  // Fetch data for countries, indicators and start and end points selected
  // Create data, allDataRef = {CAN: {ind1: [ar1], ind2: [ar2]}} 
  // ar1 = [{label: 'indicator', data: [{x: x1, y: y1}, {x: x2, y: y2}]}]
  useEffect(() => {
    if (!plotOptions.absolute) {
      labels.current = measurementPoints;
    } else {
      labels.current = [];
      var position = yearNbList[startIndex];
      var minInterval = yearNbList[endIndex] - yearNbList[endIndex - 1]; /* Smallest interval between 2 adjacent datapoints in timeseries always at the end */
      while (position <= yearNbList[endIndex]) {
        labels.current.push(position);
        position += minInterval;
      }
    }
    if (plotOptions.plotting) {
      nbCharts.current = calculateNbOfCharts(plotOptions, tsIndicators.length, selection.length)
      var fetchPromises = [];
      for (const country of selection) {
        allData[country.values_.ISO_A3] = {};
        allData[country.values_.ISO_A3].all = [];
        var isoCode = parseInt(
          countries.alpha3ToNumeric(country.values_.ISO_A3),
          10
        ).toString(); /* Retrieve isoCode, without leading 0's */
        if (['728', '729'].includes(isoCode)) { isoCode = '736' }   /* Fix the Sudan case manually */
        tsIndicators.forEach((indicator) => {
          allData[country.values_.ISO_A3][indicator] = [
            {
              label: indicatorValueName[
                indicator
              ],
              data: [],
            },
          ];
          var domainName = window.apiUrl === '' ? window.apiUrl : `${window.apiUrl}:8000`
          const url = `${domainName}/api/txt/${indicator}/${isoCode}/${startYear}/${endYear}`
          const fetchPromise = fetch(url)
            .then((response) => response.json())
            .then((r_json) => {
              r_json[0].forEach((value, index) => {
                allData[country.values_.ISO_A3][indicator][0].data.push({
                  x: measurementPoints[index],
                  y: value,
                });
              });
              allData[country.values_.ISO_A3].all.push(
                allData[country.values_.ISO_A3][indicator][0]
              );
              allData[country.values_.ISO_A3][`${indicator}_json`] = r_json;
            });
          fetchPromises.push(fetchPromise);
        });
      }
      // Set Charts again to first
      Promise.all(fetchPromises).then(() => {
        allDataRef.current = allData;
        handleChangeChart(0);
      });
    } // eslint-disable-next-line
  }, [plotOptions, selection, tsIndicators, startYear, endYear]);

  // Dynamically compute charts based on plotting options
  function handleChangeChart(newChartNb) {
    if (
      plotOptions.plotting &&
      selection.length > 0 &&
      tsIndicators.length > 0 &&
      Object.keys(allDataRef.current).length > 0
    ) {
      const newOptions = options;
      var datasets;
      var title;
      // Case 1: seperate countries, seperate indicators
      if (!plotOptions.combinedCountries && !plotOptions.combinedIndicators) {
        currentCountry.current = selection[Math.floor(newChartNb / tsIndicators.length)];
        currentIndicator.current = tsIndicators[newChartNb % tsIndicators.length];
        datasets = allDataRef.current[currentCountry.current.values_.ISO_A3][currentIndicator.current];
        title = `${currentCountry.current.values_.ADMIN}, ${startName} - ${endName}`;
      }
      // Case 2: seperate countries, joint indicators
      // in an ideal world do i make this work without 'all'
      else if (!plotOptions.combinedCountries && plotOptions.combinedIndicators) {
        currentCountry.current = selection[newChartNb];
        currentIndicator.current = null;
        datasets = allDataRef.current[currentCountry.current.values_.ISO_A3].all;
        title = `${currentCountry.current.values_.ADMIN}, ${startName} - ${endName}`;
      }
      // Case 3: joint countries, seperate indicators
      else if (plotOptions.combinedCountries && !plotOptions.combinedIndicators) {
        datasets = []
        currentCountry.current = null
        currentIndicator.current = tsIndicators[newChartNb % tsIndicators.length];
        for (const country of selection) {
          const newDataset = allDataRef.current[country.values_.ISO_A3][currentIndicator.current];
          datasets.push({ ...newDataset[0], label: country.values_.ADMIN })
        }
        title = `${indicatorValueName[currentIndicator.current]}, ${startName} - ${endName}`
      }
      // Case 4: joint countries, joint indicators
      else if (plotOptions.combinedCountries && plotOptions.combinedIndicators) {
        datasets = [];
        currentCountry.current = null;
        currentIndicator.current = null;
        for (const country of selection) {
          const newDataset = allDataRef.current[country.values_.ISO_A3].all
          console.log('newDataset', newDataset)
          for (var i = 0; i < tsIndicators.length; i++) {
            datasets.push({ ...newDataset[i], label: newDataset[i].label + ` - ${country.values_.ADMIN}` })
          }
        }
        title = `Combined indicators and combined countries, ${startName} - ${endName}`;
      }
      const titleList = [title]
      if (title.includes('Sudan') || title.includes('South Sudan')) { titleList.push(`Sudan and South Sudan have the same grouped values!`) }
      newOptions.plugins.title.text = titleList
      newOptions.scales.y.title.text = chooseYLabel(
        currentIndicator.current,
        plotOptions.combinedIndicators,
        tsIndicators
      );
      console.log(datasets)
      setOptions(newOptions);
      setData({ labels: labels.current, datasets: datasets });
      setCurrentChartNb(newChartNb);
    } else {
      setData(null);
    }
  }

  function exportCSV() {
    var rowContent = "";
    var title;
    var header = "Year";
    if (exportAmt === "displayed") {
      if (plotOptions.combinedIndicators && plotOptions.combinedCountries) {
        title = computeFilename(plotOptions, indicatorValueName, currentCountry, currentIndicator, '.csv')
        measurementPoints.forEach((value, i) => {
          var row = value;
          for (const country of selection) {
            for (const indicator of tsIndicators) {
              const newHeader = `,${country.values_.ADMIN} - ${indicatorValueName[indicator]
                } ${chooseYLabel(indicator)}`;
              if (!header.includes(newHeader)) {
                header += newHeader;
              }
              row +=
                "," +
                allDataRef.current[country.values_.ISO_A3][
                `${indicator}_json`
                ][0][i];
            }
          }
          rowContent += `${row}\r\n`;
        });
      } else if (!plotOptions.combinedIndicators && plotOptions.combinedCountries) {
        title = computeFilename(plotOptions, indicatorValueName, currentCountry, currentIndicator, '.csv')
        measurementPoints.forEach((value, i) => {
          var row = value;
          for (const country of selection) {
            const newHeader = `,${country.values_.ADMIN} - ${indicatorValueName[currentIndicator.current]
              } ${chooseYLabel(currentIndicator.current)}`;
            if (!header.includes(newHeader)) {
              header += newHeader;
            }
            // titel += `, ${indicatorValueName[indicator]}`
            row +=
              "," +
              allDataRef.current[country.values_.ISO_A3][
              `${currentIndicator.current}_json`
              ][0][i];
          }
          rowContent += `${row}\r\n`;
        });
      } else if (plotOptions.combinedIndicators && !plotOptions.combinedCountries) {
        title = computeFilename(plotOptions, indicatorValueName, currentCountry, currentIndicator, '.csv')
        measurementPoints.forEach((value, i) => {
          var row = value;
          for (const indicator of tsIndicators) {
            const newHeader = `,${currentCountry.current.values_.ADMIN} - ${indicatorValueName[indicator]
              } ${chooseYLabel(currentIndicator.current)}`;
            if (!header.includes(newHeader)) {
              header += newHeader;
            }
            row +=
              "," +
              allDataRef.current[currentCountry.current.values_.ISO_A3][
              `${indicator}_json`
              ][0][i];
          }
          rowContent += `${row}\r\n`;
        });
      } else if (!plotOptions.combinedIndicators && !plotOptions.combinedCountries) {
        header += `,${currentCountry.current.values_.ADMIN} - ${indicatorValueName[currentIndicator.current]} ${chooseYLabel(currentIndicator.current)}`;
        title = computeFilename(plotOptions, indicatorValueName, currentCountry, currentIndicator, '.csv')
        measurementPoints.forEach((value, i) => {
          rowContent += `${value},${allDataRef.current[currentCountry.current.values_.ISO_A3][
            `${currentIndicator.current}_json`
          ][0][i]
            }\r\n`;
        });
      }
    } else if (exportAmt === "all") {
      title = computeFilename(plotOptions, indicatorValueName, currentCountry, currentIndicator, '.csv')
      measurementPoints.forEach((value, i) => {
        var row = value;
        for (const country of selection) {
          for (const indicator of tsIndicators) {
            const newHeader = `,${country.values_.ADMIN} - ${indicatorValueName[indicator]
              } ${chooseYLabel(currentIndicator.current)}`;
            if (!header.includes(newHeader)) {
              header += newHeader;
            }
            row +=
              "," +
              allDataRef.current[country.values_.ISO_A3][
              `${indicator}_json`
              ][0][i];
          }
        }
        rowContent += `${row}\r\n`;
      });
    }
    const csvContent = `data:tetxt/csv;chartset=utf-8,\uFEFF${header}\r\n${rowContent}`;
    var encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = title;
    link.click();
  }

  function exportJpeg() {
    if (exportAmt === "displayed") {
      const link = document.createElement("a");
      var filename = computeFilename(plotOptions, indicatorValueName, currentCountry, currentIndicator, '.jpeg');
      link.download = filename
      link.href = chartRef.current.toBase64Image("image/jpeg", 1);
      link.click();
    } else if (exportAmt === "all") {
      chartFinishedRendering.current = false;
      const startingChartNb = currentChartNb;
      const awaitChartRender = async () => {
        for (let i = 0; i < nbCharts.current; i++) {
          handleChangeChart((startingChartNb + i) % nbCharts.current);
          while (true) {
            await new Promise((resolve) => setTimeout(resolve, 10));
            if (chartFinishedRendering.current) {
              break;
            }
          }
          chartFinishedRendering.current = false;
          const link = document.createElement("a");
          var filename = computeFilename(plotOptions, indicatorValueName, currentCountry, currentIndicator, '.jpeg');
          link.download = filename
          link.href = chartRef.current.toBase64Image("image/jpeg", 1);
          link.click();
          link.remove();
        }
        handleChangeChart(startingChartNb);
      };
      awaitChartRender();
    }
  }

  return (
    <>
      {plotOptions.plotting && data && (
        <div style={{ backgroundColor: "white" }}>
          <div
            style={{ height: "300px", display: "flex", alignItems: "center" }}
          >
            <div>
              <Button onClick={() => handleChangeChart(Math.max(currentChartNb - 1, 0))} >
                &#8249;
              </Button>
            </div>
            <div style={{ height: 300 }}>
              <Line
                ref={chartRef}
                data={data}
                options={{ ...options, maintainAspectRatio: false }}
              />
            </div>
            <div>
              <Button onClick={() => handleChangeChart(Math.min(currentChartNb + 1, nbCharts.current - 1))} >
                &#8250;
              </Button>
            </div>
          </div>
          <Form>
            <Dropdown style={{ position: "absolute", right: 0, bottom: 0 }} drop="end" >
              <Dropdown.Toggle>Export</Dropdown.Toggle>
              <Dropdown.Menu style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="menu-section-header">Which?</div>
                <ToggleButtonGroup type="radio" name="exportTs" defaultValue="displayed" onChange={(e) => setExportAmt(e)}>
                  <ToggleButton variant="outline-secondary" size="sm" id="tbg-exportTs-1" value="displayed">
                    Current Figure
                  </ToggleButton>
                  <ToggleButton variant="outline-secondary" size="sm" id="tbg-exportTs-2" value="all">
                    All Figures
                  </ToggleButton>
                </ToggleButtonGroup>
                <div className="menu-section-header">Format?</div>
                <Button onClick={() => exportCSV()}>
                  Export CSV
                </Button>
                <Button onClick={() => exportJpeg()}>
                  Export JPEG
                </Button>
              </Dropdown.Menu>
            </Dropdown>
            <Row>
              <Form.Label>
                Change X-axis:
                <ToggleButtonGroup type="radio" name="xAxis" defaultValue={2} onChange={() => setPlotOptions({ ...plotOptions, absolute: !plotOptions.absolute })} >
                  <ToggleButton variant="outline-secondary" size="sm" id="tbg-axis-1" value={1}>
                    Relative
                  </ToggleButton>
                  <ToggleButton variant="outline-secondary" size="sm" id="tbg-axis-2" value={2}>
                    Absolute
                  </ToggleButton>
                </ToggleButtonGroup>
              </Form.Label>
            </Row>
            <Row>
              <Form.Label>
                Display Indicators:
                <ToggleButtonGroup type="radio" name="combinedIndicators" defaultValue={1} onChange={() => setPlotOptions({ ...plotOptions, combinedIndicators: !plotOptions.combinedIndicators })}>
                  <ToggleButton variant="outline-secondary" size="sm" id="tbg-combinedIndicators-1" value={1}>
                    Seperate
                  </ToggleButton>
                  <ToggleButton variant="outline-secondary" size="sm" id="tbg-combinedIndicators-2" value={2}>
                    Combined
                  </ToggleButton>
                </ToggleButtonGroup>
              </Form.Label>
            </Row>
            <Row>
              <Form.Label>
                Display Countries:
                <ToggleButtonGroup type="radio" name="combinedCountries" defaultValue={1} onChange={() => setPlotOptions({ ...plotOptions, combinedCountries: !plotOptions.combinedCountries })}>
                  <ToggleButton variant="outline-secondary" size="sm" id="tbg-combinedCountries-1" value={1}>
                    Seperate
                  </ToggleButton>
                  <ToggleButton variant="outline-secondary" size="sm" id="tbg-combinedCountries-2" value={2}>
                    Combined
                  </ToggleButton>
                </ToggleButtonGroup>
              </Form.Label>
            </Row>
          </Form>
        </div>
      )}
    </>
  );
}

// Little helper function
function chooseYLabel(ind, combinedIndicators = false, all_indicators = []) {
  if (combinedIndicators) {
    if (
      all_indicators.every((val) => ["popc", "urbc", "rurc"].includes(val)) ||
      all_indicators.every((val) => ["popd"].includes(val)) ||
      all_indicators.every(
        (val) => !["popc", "urbc", "rurc", "popd"].includes(val)
      )
    ) {
      return chooseYLabel(all_indicators[0]);
    } else {
      return null;
    }
  } else {
    if (["popc", "urbc", "rurc"].includes(ind)) {
      return "[inh]";
    } else if ("popd" === ind) {
      return `[inh/km\u00b2]`;
    } else {
      return "[km\u00b2]";
    }
  }
}

function calculateNbOfCharts(plotOptions, indLength, countriesLength) {
  if (plotOptions.combinedCountries && plotOptions.combinedIndicators) {
    return 1
  } else if (plotOptions.combinedCountries && !plotOptions.combinedIndicators) {
    return indLength
  } else if (!plotOptions.combinedCountries && plotOptions.combinedIndicators) {
    return countriesLength
  } else if (!plotOptions.combinedCountries && !plotOptions.combinedIndicators) {
    return indLength * countriesLength
  }
}

// Computing the name of the jpeg file
function computeFilename(plotOptions, indicatorValueName, currentCountry, currentIndicator, filetype) {
  if (plotOptions.combinedIndicators && plotOptions.combinedCountries) {
    return `Chart - combined${filetype}`
  } else if (!plotOptions.combinedIndicators && plotOptions.combinedCountries) {
    return `Chart - ${indicatorValueName[currentIndicator.current]}${filetype}`
  } else if (plotOptions.combinedIndicators && !plotOptions.combinedCountries) {
    return `Chart - ${currentCountry.current.values_.ADMIN}${filetype}`
  } else if (!plotOptions.combinedIndicators && !plotOptions.combinedCountries) {
    return `Chart - ${currentCountry.current.values_.ADMIN}, ${indicatorValueName[currentIndicator.current]}${filetype}`;
  }
}