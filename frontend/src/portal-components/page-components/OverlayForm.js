import { React, useState } from "react"

import { yearsObject, yearValueList, indicatorNcObj, indicatorTxtObj } from "../../util/createData"  /* as ind.type : {ind -> Indicator Name} */

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Dropdown from 'react-bootstrap/Dropdown'
import RangeSlider from 'react-bootstrap-range-slider';

import Select from "react-select"

export default function OverlayForm({ currentYear, setCurrentYear, ovIndicator, setOvIndicator }) {
    /* Form to request timeseries. */
    // Changing currentYear causes retrieval of netcdf. To do this continuously is to intensive, therefore sliderYear changes continuously but currentYear only after sliding has finished
    const [sliderYear, setSliderYear] = useState(currentYear)

    // Create options for the years
    const optionsYears = Object.entries(yearsObject).map(([key, value]) => (
        { value: key, label: value }
    ))
    
    // Create options for indicators
    const overlayOptions = Object.entries(indicatorNcObj).map(([category, categorizedIndicators]) => ({
        label: category,
        options: Object.entries(categorizedIndicators).map(([indicatorValue, indicatorName]) => ({
            value: indicatorValue,
            label: indicatorName
        }))
    }))

    // Strange because one can select a new indicator, or click the x removing the indicator.
    function handleSelect(e) {
        if (e) {
            setOvIndicator(e.value)
        } else {
            setOvIndicator(e)
        }
    }

    async function exportAsc() {
        const uglyInd = Object.keys(Object.assign({}, ...Object.values(indicatorTxtObj)))[Object.keys(Object.assign({}, ...Object.values(indicatorNcObj))).indexOf(ovIndicator)]
        var domainName = window.apiUrl === '' ? window.apiUrl : `${window.apiUrl}:8100`
        const fetchUrl = `${domainName}/api/raster/asc/${uglyInd}/${currentYear}`
        fetch(fetchUrl).then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]))
                const link = document.createElement('a');
                link.href = url
                link.setAttribute('download', `${ovIndicator}-${currentYear}.asc`)
                link.click()
            })
    }

    async function exportTif() {
        const uglyInd = Object.keys(Object.assign({}, ...Object.values(indicatorTxtObj)))[Object.keys(Object.assign({}, ...Object.values(indicatorNcObj))).indexOf(ovIndicator)]
        var domainName = window.apiUrl === '' ? window.apiUrl : `${window.apiUrl}:8100`
        const fetchUrl = `${domainName}/api/raster/tif/${uglyInd}/${currentYear}`
        fetch(fetchUrl).then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]))
                const link = document.createElement('a');
                link.href = url
                link.setAttribute('download', `${ovIndicator}-${currentYear}.asc`)
                link.click()
            })
    }

    async function exportPNG() {
        const uglyInd = Object.keys(Object.assign({}, ...Object.values(indicatorTxtObj)))[Object.keys(Object.assign({}, ...Object.values(indicatorNcObj))).indexOf(ovIndicator)]
        var domainName = window.apiUrl === '' ? window.apiUrl : `${window.apiUrl}:8100`
        const fetchUrl = `${domainName}/api/raster/png/${uglyInd}/${currentYear}`
        fetch(fetchUrl).then(response => response.blob())
            .then(image => {
                const url = window.URL.createObjectURL(image)
                const link = document.createElement('a');
                link.href = url
                link.setAttribute('download', `${ovIndicator}-${currentYear}.png`)
                link.click()
            })
    }
    return (
        <>
            <Form>
                <Row>
                    <Form.Label style={{ marginTop: '3px' }}>Year  <br />
                        <div style={{ margin: '0 auto', width: 200 }}>
                            <Select menuPortalTarget={document.body} options={optionsYears} value={optionsYears[yearValueList.indexOf(sliderYear)]} onChange={(e) => setSliderYear(yearValueList[e.value])}></Select>
                        </div>
                        <div style={{ display: 'flex', justifyContent: "center" }}>
                            <RangeSlider type="range" min={0} max={yearValueList.length - 1} step={1} value={yearValueList.indexOf(sliderYear)} onChange={(e) => setSliderYear(yearValueList[e.target.value])} tooltipStyle={{ display: "none" }} style={{ width: 200 }} onAfterChange={(e) => setCurrentYear(yearValueList[e.target.value])} />
                        </div>
                    </Form.Label>
                </Row>
                <Row>
                    <Form.Label style={{}}>Indicator
                        <div style={{ width: 200, margin: '0 auto' }}>
                            <Select menuPortalTarget={document.body} isClearable options={overlayOptions} onChange={(e) => handleSelect(e)} />
                        </div>
                    </Form.Label>
                </Row>

                <Row>
                    <Dropdown drop="down">
                        <Dropdown.Toggle>
                            Export
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => exportPNG()}>PNG</Dropdown.Item>
                            <Dropdown.Item onClick={() => exportAsc()}>Esri ASCII</Dropdown.Item>
                            <Dropdown.Item onClick={() => exportTif()}>geoTIFF</Dropdown.Item>
                            <Dropdown.Header>For <b>netCDF</b>, <b>Zipped ASCII</b> <br/> and <b>country/region masks</b> <br/> 
                            Access <a href="https://landuse.sites.uu.nl/datasets/">YODA</a> </Dropdown.Header>
                        </Dropdown.Menu>
                    </Dropdown>
                </Row>
            </Form>
        </>
    )
}