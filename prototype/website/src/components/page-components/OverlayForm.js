import { React, useRef, useEffect, } from "react"

// default background provided, should be oke but changing should also be easy.
import { TileWMS } from 'ol/source';

// Renders sources that provide tiled images in grids that are organized by zoom levels for specific resolutions.
import TileLayer from 'ol/layer/Tile.js';

import { years, yearval_lst, indicatorNcObj, indicatorNcOrder } from "../utilities/createData"  /* as ind.type : {ind -> Indicator Name} */

import Form from 'react-bootstrap/Form'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Row from 'react-bootstrap/Row'
import Dropdown from 'react-bootstrap/Dropdown'
import RangeSlider from 'react-bootstrap-range-slider';

import Select from "react-select"

export default function OverlayForm({ map, setMap, setSelection, currentYear, setCurrentYear, ovIndicator, setOvIndicator, overlay, setOverlay, afterChange, setAfterChange }) {
    const mapRef = useRef()
    mapRef.current = map
    console.log('map is', map)

    const overlayOptions = Object.entries(indicatorNcObj).map(([category, categorizedIndicators]) => ({
        label: category,
        options: Object.entries(categorizedIndicators).map(([indicatorValue, indicatorName]) => ({
            value: indicatorValue,
            label: indicatorName
        }))
    }))

    // interesting code no longer used: Object.assign({}, ...Object.values(tsIndicatorsObj)) // Remove the categorization

    useEffect(() => {
        // This is not correct
        if (ovIndicator !== null && afterChange) {
            console.log('inside')
            var year = currentYear.split('_')[0] === 'ce' ? '' : '-'
            year += `${currentYear.split('_')[1]}`
            var time = `${year}-05-01`
            const style = 'seq-YlOrRd'
            const layer = window.apiUrl === 'localhost' ? '2/irrigated_rice' : `${indicatorNcOrder.indexOf(ovIndicator) + 1}/${ovIndicator}`
            const url = `http://${window.apiUrl}:8080/ncWMS/wms?REQUEST=GetMetadata&ITEM=minmax&VERSION=1.3.0&STYLES=&CRS=CRS:84&WIDTH=1000&HEIGHT=900&BBOX=-180,-90,179.9,89.9&TIME=${time}&LAYERS=${layer}`
            fetch(url)
                .then((response) => response.json())
                .then(minmax => {
                    if (minmax.max === 0.5) {
                        console.log('no data available')
                        return
                    }
                    const fill = new TileLayer({
                        source: new TileWMS({
                            url: `http://${window.apiUrl}:8080/ncWMS/wms`,
                            params: {
                                'LAYERS': layer,
                                'STYLES': `default-scalar/${style}`,
                                'TIME': time,
                                'COLORSCALERANGE': `${minmax.min + 0.00000001},${minmax.max}`,
                                'BELOWMINCOLOR': 'transparent',
                                'NUMCOLORBANDS': 6,
                                'LOGSCALE': false
                            },
                            projection: 'EPSG:4326',
                        }),
                        opacity: 0.8
                    })

                    const contour = new TileLayer({
                        source: new TileWMS({
                            url: `http://${window.apiUrl}:8080/ncWMS/wms`,
                            params: {
                                'LAYERS': layer,
                                'STYLES': `colored_contours/${style}`,
                                'TIME': time,
                                'NUMCOLORBANDS': 6,
                                'LOGSCALE': false
                            },
                            projection: 'EPSG:4326',
                        }),
                        opacity: 0.8
                    })
                    mapRef.current.addLayer(fill)
                    mapRef.current.addLayer(contour)
                    setMap(mapRef.current)
                    setOverlay([fill, contour])
                })
        } else if (map) {
            setSelection([])
            overlay.forEach(layer => {
                mapRef.current.removeLayer(layer)
            });
            setOverlay([])
            setMap(mapRef.current)
        }
        // eslint-disable-next-line
    }, [ovIndicator, currentYear, afterChange])

    function handleSelect(e) {
        if (e) {
            setOvIndicator(e.value)
        } else {
            setOvIndicator(e)
        }
    }
    return (
        <>
            <Form>
                <Row>
                    <Form.Label style={{ marginTop: '3px' }}>Year {years[currentYear]} <br />
                        <div style={{ display: 'flex', justifyContent: "center" }}>
                            <RangeSlider tooltipStyle={{ display: "none" }} style={{ width: 200 }} onChange={(e) => { setAfterChange(false); setCurrentYear(yearval_lst[e.target.value]) }} onAfterChange={() => setAfterChange(true)} type="range" min="0" max="74" step="1" value={yearval_lst.indexOf(currentYear)} />
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
                    <Form.Label> Change Overlay
                        <ToggleButtonGroup type="radio" name="overlay" defaultValue={1} onChange=''>
                            <ToggleButton variant="outline-secondary" size="sm" id="tbg-overlay-1" value={1}>World</ToggleButton>
                            <ToggleButton variant="outline-secondary" size="sm" id="tbg-overlay-2" value={2}>Countries</ToggleButton>
                        </ToggleButtonGroup>
                    </Form.Label>
                </Row>
                <Row>
                    <Dropdown drop="down">
                        <Dropdown.Toggle>
                            Export
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-2">Single Year (Tiff)</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">All Years (netCDF)</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Selection (netCDF)</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Row>
            </Form>
        </>
    )
}