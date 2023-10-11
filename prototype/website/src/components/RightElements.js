import { useRef, useEffect, useState } from "react"

// default background provided, should be oke but changing should also be easy.
import { TileWMS } from 'ol/source';

// Renders sources that provide tiled images in grids that are organized by zoom levels for specific resolutions.
import TileLayer from 'ol/layer/Tile.js';

import { years, yearval_lst, indNc } from "./utilities/create_data"   /* as ind.type : {ind -> Indicator Name} */

const uuUrl = 'hydeprod.geo.uu.nl'
const variableId = 4

export default function RightElements({ map, setMap, overlay, setOverlay }) {

    const [year, setYear] = useState('ce_0')
    const [indicator, setIndicator] = useState('none')
    const mapRef = useRef()
    mapRef.current = map


    // interesting code no longer used: Object.assign({}, ...Object.values(indicatorsObj)) // Remove the categorization

    useEffect(() => {
        overlay.forEach(layer => {
            mapRef.current.removeLayer(layer)
        });
        if (indicator !== 'none') {
            console.log(indicator)
            const time = `${year.split('_')[1]}-05-01`
            const style = 'seq-YlOrRd' // Option: allow user to set manually?
            fetch(`http://${uuUrl}:8080/ncWMS/wms?REQUEST=GetMetadata&ITEM=minmax&VERSION=1.3.0&STYLES=&CRS=CRS:84&WIDTH=1000&HEIGHT=900&BBOX=-180,-90,179.9,89.9&
            TIME=${time}&
            LAYERS=${indNc.indexOf(indicator) + 1}/${indicator}`)
                .then((response) => response.json())
                .then(minmax => {
                    console.log(minmax)
                    if (minmax.min < 0) {
                        console.log('map has no values, select something else?')
                    }
                    const fill = new TileLayer({
                        source: new TileWMS({
                            url: `http://${uuUrl}:8080/ncWMS/wms`,
                            params: {
                                'LAYERS': `${indNc.indexOf(indicator) + 1}/${indicator}`,
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
                            url: 'http://localhost:8080/ncWMS/wms',
                            params: {
                                'LAYERS': `${indNc.indexOf(indicator) + 1}/${indicator}`,
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
            // eslint-disable-next-line
        }
    }, [indicator, year])
    return (
        <>
            <Legend />
            <div>
                <label>
                    <input onChange={(e) => setYear(yearval_lst[e.target.value])} type="range" min="0" max="74" step="1" value={yearval_lst.indexOf(year)} />
                    <p>Years: {years[year]}</p>
                </label>
            </div>
            <div>
                <div onChange={(e) => setIndicator(e.target.value)}>
                    <label>
                        <input type="radio" name="layer" value={'none'} />
                        {'No Overlay'}
                        <br />
                    </label>
                    {indNc.map((value, index) => (
                        <label key={index}>
                            <input type="radio" name="layer" value={value} />
                            {value[0].toUpperCase() + value.slice(1).replaceAll('_', ' ')}
                            <br />
                        </label>
                    ))}
                </div>
            </div>
        </>
    )
}

function Legend() {
    return (
        <>

        </>
    )
}