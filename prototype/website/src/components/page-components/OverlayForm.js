import { useRef, useEffect, useState } from "react"

// default background provided, should be oke but changing should also be easy.
import { TileWMS } from 'ol/source';

// Renders sources that provide tiled images in grids that are organized by zoom levels for specific resolutions.
import TileLayer from 'ol/layer/Tile.js';

import { years, yearval_lst, indicatorNcObj, indicatorNcOrder } from "../utilities/createData"  /* as ind.type : {ind -> Indicator Name} */

import Form from 'react-bootstrap/Form'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

import Select from "react-select"

export default function OverlayForm({ map, setMap, currentYear, setCurrentYear, ovIndicator, setOvIndicator, overlay, setOverlay }) {
    const mapRef = useRef()
    mapRef.current = map

    const overlayOptions = Object.entries(indicatorNcObj).map(([category, categorizedIndicators]) => ({
        label: category,
        options: Object.entries(categorizedIndicators).map(([indicatorValue, indicatorName]) => ({
            value: indicatorValue,
            label: indicatorName
        }))
    }))


    // interesting code no longer used: Object.assign({}, ...Object.values(tsIndicatorsObj)) // Remove the categorization

    useEffect(() => {
        overlay.forEach(layer => {
            mapRef.current.removeLayer(layer)
        });
        if (ovIndicator) {
            const time = `${currentYear.split('_')[1]}-05-01`
            const style = 'seq-YlOrRd' // Option: allow user to set manually?
            fetch(`http://${window.URL}:8080/ncWMS/wms?REQUEST=GetMetadata&ITEM=minmax&VERSION=1.3.0&STYLES=&CRS=CRS:84&WIDTH=1000&HEIGHT=900&BBOX=-180,-90,179.9,89.9&
            TIME=${time}&
            LAYERS=${indicatorNcOrder.indexOf(ovIndicator) + 1}/${ovIndicator}`)
                .then((response) => response.json())
                .then(minmax => {
                    const fill = new TileLayer({
                        source: new TileWMS({
                            url: `http://${window.URL}:8080/ncWMS/wms`,
                            params: {
                                'LAYERS': `${indicatorNcOrder.indexOf(ovIndicator) + 1}/${ovIndicator}`,
                                'STYLES': `default-scalar/${style}`,
                                'TIME': time,
                                'COLORSCALERANGE': `${minmax.min + 0.00000001},${minmax.max}`,
                                'BELOWMINCOLOR': 'transparent'
                            },
                            projection: 'EPSG:4326',
                        }),
                        opacity: 0.8
                    })

                    const contour = new TileLayer({
                        source: new TileWMS({
                            url: `http://${window.URL}:8080/ncWMS/wms`,
                            params: {
                                'LAYERS': `${indicatorNcOrder.indexOf(ovIndicator) + 1}/${ovIndicator}`,
                                'STYLES': `colored_contours/${style}`,
                                'TIME': time,
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
        } // eslint-disable-next-line
    }, [ovIndicator, currentYear])
    return (
        <>
            <Form>
                <Form.Label style={{ marginTop: '3px' }}>Year {years[currentYear]}
                    <Form.Range onChange={(e) => setYear(yearval_lst[e.target.value])} type="range" min="0" max="74" step="1" value={yearval_lst.indexOf(currentYear)} />
                </Form.Label> <br />
                <Form.Label style={{}}>Indicator
                    <Select menuPortalTarget={document.body} options={overlayOptions} placeholder="None Selected" onChange={(e) => setOvIndicator(e.value)} />
                </Form.Label> <br />
                <Form.Label> Change Overlay
                    <ToggleButtonGroup type="radio" name="overlay" defaultValue={1} onChange=''>
                        <ToggleButton size="sm" id="tbg-overlay-1" value={1}>World</ToggleButton>
                        <ToggleButton size="sm" id="tbg-overlay-2" value={2}>Countries</ToggleButton>
                    </ToggleButtonGroup>
                </Form.Label>
            </Form>
        </>
    )
}


const legend_blob = await legend_request.blob()
const legend = document.getElementById('legend')
legend.src = URL.createObjectURL(legend_blob)
