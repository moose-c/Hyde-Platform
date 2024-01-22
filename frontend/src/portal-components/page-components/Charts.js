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

export default function Charts({ selection, startYear, endYear, tsIndicators, plotOptions, setPlotOptions, displayChart, setDisplayChart }) {
  /* Creates the Charts within the lower left corner. 
    Makes use of timeseries-api.
    There are 2 options for the user to keep in mind: 
    - relative/absolute ploting (different x axis --> different labels)
    - single/multiple plots per country
    */

  // values set on absolute/relative plotting
  // labels are the x axis
  const labels = useRef([]);

  // values set on chart rendering
  const chartRef = useRef(null);
  const chartFinishedRendering = useRef(false);

  // Values set after fetching data
  const [allData, setAllData] = useState({})

  // Values set in computing all of the charts
  const nbOfCharts = useRef(0)
  const titles = useRef(null)
  const chartsData = useRef(null)
  const yLabels = useRef(null)

  // Values set in changing 1 chart
  const [chartNb, setChartNb] = useState({ value: -1 });
  const options = useRef({
    maintainAspectRatio: false,
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
  const [data, setData] = useState(null)

  // export options
  const [exportAmt, setExportAmt] = useState("displayed");



  // Userfull Variables
  const indicatorValueName = Object.assign({}, ...Object.values(indicatorTxtObj))
  const startIndex = Object.keys(yearsObject).indexOf(startYear);
  const endIndex = Object.keys(yearsObject).indexOf(endYear);
  const measurementPoints = yearNbList.slice(startIndex, endIndex + 1);
  const startName = Object.values(yearsObject)[startIndex];
  const endName = Object.values(yearsObject)[endIndex];


  // Change the x-axis depending on whether a user wants relative or absolute plotting
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
  }, [plotOptions.absolute])

  // Fetch data for countries, indicators and start and end points selected
  // Create data, allDataRef = {CAN: {ind1: [ar1], ind2: [ar2]}} 
  // ar1 = [{label: 'indicator', data: [{x: x1, y: y1}, {x: x2, y: y2}]}]
  // Why is this again in a list?
  useEffect(() => {
    if (displayChart && selection.length > 0 && tsIndicators.length > 0) {
      const newData = {}
      var fetchPromises = [];
      for (const country of selection) {
        const countryA3 = country.values_.ISO_A3
        newData[countryA3] = {};
        var isoCode = parseInt(countries.alpha3ToNumeric(countryA3), 10).toString(); /* Retrieve isoCode, without leading 0's */
        if (['728', '729'].includes(isoCode)) { isoCode = '736' }   /* Fix the Sudan case manually */
        tsIndicators.forEach((indicator) => {
          newData[countryA3][indicator] = [{ label: indicatorValueName[indicator], data: [] }];
          var domainName = window.apiUrl === '' ? window.apiUrl : `${window.apiUrl}:8000`
          const url = `${domainName}/api/txt/${indicator}/${isoCode}/${startYear}/${endYear}`
          const fetchPromise = fetch(url)
            .then((response) => response.json())
            .then((r_json) => {
              const countryA3 = country.values_.ISO_A3
              r_json[0].forEach((value, index) => {
                newData[countryA3][indicator][0].data.push({
                  x: measurementPoints[index],
                  y: value,
                });
              });
              newData[countryA3][`${indicator}_json`] = r_json;
            });
          fetchPromises.push(fetchPromise);
        });
      }
      // Set Charts again to first
      Promise.all(fetchPromises).then(() => {
        setAllData(newData)
      });
    } else {
      setAllData({})
      setDisplayChart(false)
    }
  }, [displayChart, selection, tsIndicators, startYear, endYear])

  // if the data change, change the graphs
  // Currently without all of the available plotting options
  useEffect(() => {
    if (Object.keys(allData).length > 0) {
      console.log('defining the actual plotting data')
      // in reality dependent on options
      titles.current = []
      chartsData.current = []
      yLabels.current = []
      if (!options.countriesCombined && !options.indicatorsCombined) {
        nbOfCharts.current = tsIndicators.length * selection.length;
        for (const country of selection) {
          for (const indicator of tsIndicators) {
            const newTitle = [`${country.values_.ADMIN}, ${startName} - ${endName}`]
            if (['Sudan', 'South Sudan'].includes(country.values_.ADMIN)) { newTitle.push(`Sudan and South Sudan have the same grouped values!`) }
            titles.current.push(newTitle)
            chartsData.current.push(allData[country.values_.ISO_A3][indicator])
            yLabels.current.push(chooseYLabel(
              indicator,
              options.indicatorsCombined,
              tsIndicators
            ))
          }
        }
      } else if (!options.countriesCombined && options.indicatorsCombined) {
        nbOfCharts.current = selection.length;
        for (const country of selection) {
          const newTitle = [`${country.values_.ADMIN}. ${startName} - ${endName}`]
          if (['Sudan', 'South Sudan'].includes(country.values_.ADMIN)) { newTitle.push(`Sudan and South Sudan have the same grouped values!`) }
          titles.current.push(newTitle)
          const datasets = []
          for (const indicator of tsIndicators) {
            datasets.push(allData[country.values_.ISO_A3][indicator])
          }
          chartsData.current.push(datasets)
          yLabels.current.push(chooseYLabel(
            null,
            options.indicatorsCombined,
            tsIndicators
          ))
        }
        // if countries combined, indicators seperate
      } else if (options.countriesCombined && !options.indicatorsCombined) {
        nbOfCharts.current = tsIndicators.length;
        var titleCountries = ''
        for (const country of selection) {
          titleCountries += (`${country.values_.ADMIN}, `)
        }
        const newTitle = [`${titleCountries}. ${startName} - ${endName}`]
        if (newTitle.includes('Sudan') || newTitle.includes('South Sudan')) { newTitle.push(`Sudan and South Sudan have the same grouped values!`) }
        for (const indicator of tsIndicators) {
          titles.current.push(newTitle)
          const datasets = []
          for (const country of selection) {
            datasets.push(allData[country.values_.ISO_A3][indicator])
          }
          chartsData.current.push(datasets)
          yLabels.current.push(chooseYLabel(
            indicator,
            options.indicatorsCombined,
            tsIndicators
          ))
        }
      } else if (options.countriesCombined && options.indicatorsCombined) {
        nbOfCharts.current = 1;
        var titleCountries = ''
        for (const country of selection) {
          titleCountries += (`${country.values_.ADMIN}, `)
        }
        const newTitle = [`${titleCountries}. ${startName} - ${endName}`]
        if (newTitle.includes('Sudan') || newTitle.includes('South Sudan')) { newTitle.push(`Sudan and South Sudan have the same grouped values!`) }
        titles.current.push(newTitle)
        const datasets = []
        for (const indicator of tsIndicators) {
          for (const country of selection) {
            datasets.push(allData[country.values_.ISO_A3][indicator])
          }
        }
        chartsData.current.push(datasets)
        yLabels.current.push(chooseYLabel(
          null,
          options.indicatorsCombined,
          tsIndicators
        ))
      }
      setChartNb({ value: 0 })
    }
  }, [allData])

  // change the Chart
  useEffect(() => {
    if (plotOptions && Object.keys(allData).length > 0) {
      console.log('set new plot')
      options.current.plugins.title.text = titles.current[chartNb.value]
      options.current.scales.y.title.text = yLabels.current[chartNb.value]
      setData({ labels: labels.current, datasets: chartsData.current[chartNb.value] });
    } else {
      setData(null)
    }
  }, [chartNb])


  /*   function exportCSV() {
      var rowContent = "";
      var title = "";
      var header = "Year";
      if (exportAmt === "displayed") {
        if (plotOptions.combined) {
          title = "combined";
          measurementPoints.forEach((value, i) => {
            var row = value;
            for (const indicator of tsIndicators) {
              const newHeader = `,${currentCountry.current.values_.ADMIN} - ${indicatorValueName[indicator]
                } ${chooseYLabel(currentIndicator.current)}`;
              if (!header.includes(newHeader)) {
                header += newHeader;
              }
              // titel += `, ${Object.assign({}, ...Object.values(indicatorTxtObj))[indicator]}`
              row +=
                "," +
                allData[currentCountry.current.values_.ISO_A3][
                `${indicator}_json`
                ][0][i];
            }
            rowContent += `${row}\r\n`;
          });
        } else {
          header += `,${currentCountry.current.values_.ADMIN} - ${indicatorValueName[
            currentIndicator.current
          ]
            } ${chooseYLabel(currentIndicator.current)}`;
          title = "single";
          measurementPoints.forEach((value, i) => {
            rowContent += `${value},${allData[currentCountry.current.values_.ISO_A3][
              `${currentIndicator.current}_json`
            ][0][i]
              }\r\n`;
          });
        }
      } else if (exportAmt === "all") {
        title = "all";
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
                allData[country.values_.ISO_A3][
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
      link.download = `${title}.csv`;
      link.click();
    } */

  /* function exportJpeg() {
    if (exportAmt === "displayed") {
      const link = document.createElement("a");
      link.download = plotOptions.combined
        ? `Chart - ${currentCountry.current.values_.ADMIN}.jpeg`
        : `Chart - ${currentCountry.current.values_.ADMIN}, ${indicatorValueName[
        currentIndicator.current
        ]
        }.jpeg`;
      link.href = chartRef.current.toBase64Image("image/jpeg", 1);
      link.click();
    } else if (exportAmt === "all") {
      chartFinishedRendering.current = false;
      const startingChartNb = currentChartNb;
      const awaitChartRender = async () => {
        for (let i = 0; i < nbCharts; i++) {
          handleChangeChart((startingChartNb + i) % nbCharts);
          while (true) {
            await new Promise((resolve) => setTimeout(resolve, 10));
            if (chartFinishedRendering.current) {
              break;
            }
          }
          chartFinishedRendering.current = false;
          const link = document.createElement("a");
          link.download = plotOptions.combined
            ? `Chart - ${currentCountry.current.values_.ADMIN}.jpeg`
            : `Chart - ${currentCountry.current.values_.ADMIN}, ${indicatorValueName[
            currentIndicator.current
            ]
            }.jpeg`;
          link.href = chartRef.current.toBase64Image("image/jpeg", 1);
          link.click();
          link.remove();
        }
        handleChangeChart(startingChartNb);
      };
      awaitChartRender();
    }
  } */

  return (
    <>
      {displayChart && data != null && (
        <div style={{ backgroundColor: "white" }}>
          {console.log('er wordt een plot gereturnd', data)}
          <div style={{ height: "300px", display: "flex", alignItems: "center" }} >
            <div>
              <Button onClick={() => setChartNb({ value: Math.max(chartNb.value - 1, 0) })} >
                &#8249;
              </Button>
            </div>
            <div style={{ height: 300 }}>
              <Line
                ref={chartRef}
                data={data}
                options={options.current}
              />
            </div>
            <div>
              <Button onClick={() => setChartNb({ value: Math.min(chartNb.value + 1, nbOfCharts.current - 1) })} >
                &#8250;
              </Button>
            </div>
          </div>
          <Form>
            <Dropdown style={{ position: "absolute", right: 0, bottom: 0 }} drop="end" >
              <Dropdown.Toggle>Export</Dropdown.Toggle>
              <Dropdown.Menu>
                <ToggleButtonGroup variant="secondary" type="radio" name="exportTs" defaultValue="displayed" onChange={(e) => setExportAmt(e)} >
                  <ToggleButton size="sm" id="tbg-exportTs-1" value="displayed">
                    Displayed
                  </ToggleButton>
                  <ToggleButton size="sm" id="tbg-exportTs-2" value="all">
                    All
                  </ToggleButton>
                </ToggleButtonGroup>
                <Dropdown.Item /* onClick={() => exportCSV()} */>
                  CSV
                </Dropdown.Item>
                <Dropdown.Item /* onClick={() => exportJpeg()} */>
                  jpeg
                </Dropdown.Item>
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
                Combined Indicators:
                <ToggleButtonGroup type="radio" name="combinedIndicators" defaultValue={1} onChange={() => setPlotOptions({ ...plotOptions, indicatorsCombined: !plotOptions.indicatorsCombined })}>
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
                Combined Countries:
                <ToggleButtonGroup type="radio" name="combinedCountries" defaultValue={1} onChange={() => setPlotOptions({ ...plotOptions, countriesCombined: !plotOptions.countriesCombined })}>
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
function chooseYLabel(ind, combined = false, all_indicators = []) {
  if (combined) {
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
