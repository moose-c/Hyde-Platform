import { React, useState} from "react"

import { yearsObject, yearValueList, indicatorNcObj, indicatorTxtObj} from "../../util/createData"  /* as ind.type : {ind -> Indicator Name} */

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Dropdown from 'react-bootstrap/Dropdown'
import RangeSlider from 'react-bootstrap-range-slider';

import Select from "react-select"

export default function OverlayForm({ currentYear, setCurrentYear, ovIndicator, setOvIndicator }) {
    // Changing currentYear causes retrieval of netcdf. To do this continuously is to intensive, therefore sliderYear changes continuosly but currentYear only after sliding has finished
    const [sliderYear, setSliderYear] = useState(currentYear)

    // Create options for Select
    const overlayOptions = Object.entries(indicatorNcObj).map(([category, categorizedIndicators]) => ({
        label: category,
        options: Object.entries(categorizedIndicators).map(([indicatorValue, indicatorName]) => ({
            value: indicatorValue,
            label: indicatorName
        }))
    }))

    // interesting code no longer used: Object.assign({}, ...Object.values(tsIndicatorsObj)) // Remove the categorization

    function handleSelect(e) {
        if (e) {
            setOvIndicator(e.value)
        } else {
            setOvIndicator(e)
        }
    }

    async function exportAsc() {
        const uglyInd = Object.keys(Object.assign({}, ...Object.values(indicatorTxtObj)))[Object.keys(Object.assign({}, ...Object.values(indicatorNcObj))).indexOf(ovIndicator)]
        const fetchUrl = `http://${window.apiUrl}:8100/asc/${uglyInd}/${currentYear}`
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
        const fetchUrl = `http://${window.apiUrl}:8100/png/${uglyInd}/${currentYear}`
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
                    <Form.Label style={{ marginTop: '3px' }}>Year {yearsObject[sliderYear]} <br />
                        <div style={{ display: 'flex', justifyContent: "center" }}>
                            <RangeSlider type="range" min={0} max={yearValueList.length - 1} step={1} value={yearValueList.indexOf(sliderYear)} onChange={(e) => setSliderYear(yearValueList[e.target.value])} tooltipStyle={{ display: "none" }} style={{ width: 200 }} onAfterChange={(e) => setCurrentYear(yearValueList[e.target.value])}  />
                        </div>
                    </Form.Label>
                </Row>
                <Row>
                    <Form.Label style={{}}>Indicator
                        <div style={{ width: 200, margin: '0 auto' }}>
                            <Select menuPortalTarget={document.body} isClearable options={overlayOptions} placeholder="None Selected" onChange={(e) => handleSelect(e)} />
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
                            <Dropdown.Item onClick={() => exportAsc()}>asc</Dropdown.Item>
                            <Dropdown.Header>Access <a href="https://landuse.sites.uu.nl/datasets/">YODA</a> for .nc and zipped .asc</Dropdown.Header>
                        </Dropdown.Menu>
                    </Dropdown>
                </Row>
            </Form>
        </>
    )
}