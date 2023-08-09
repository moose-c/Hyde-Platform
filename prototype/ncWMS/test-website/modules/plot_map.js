import Map from 'ol/Map.js';
import View from 'ol/View.js';

// default background provided, should be oke but changing should also be easy.
import {OSM, TileWMS} from 'ol/source';

// Renders sources that provide tiled images in grids that are organized by zoom levels for specific resolutions.
import TileLayer from 'ol/layer/Tile.js';

export async function plotMap(){
    const layer = 'irrigated_rice'
    const time = '2020-05-01'
    const style = 'seq-YlOrRd' // Option: allow user to set manually?

    var minmax;
    let response = await fetch(`http://localhost:8080/wms?REQUEST=GetMetadata&ITEM=minmax&VERSION=1.3.0&STYLES=&CRS=CRS:84&WIDTH=1000&HEIGHT=900&BBOX=-180,-90,179.9,89.9&
        TIME=${time}&
        LAYERS=1/${layer}`)
    minmax = await response.json()
    console.log(minmax)

    const base = new TileLayer({
        source: new OSM(),
        })

    if (minmax.min < 0) {
        console.log('map has no values I think, do something else?')
    }
    const rice_fill = new TileLayer({
        source: new TileWMS({
            url: 'http://localhost:8080/wms',
            params: {
                'LAYERS': `1/${layer}`,
                'STYLES': `default-scalar/${style}`,
                'TIME': time,
                'COLORSCALERANGE': `${minmax.min+0.00000001},${minmax.max}`,
                'BELOWMINCOLOR': 'transparent'
            },
            projection: 'EPSG:4326',
        }),
        opacity: 0.8
    })

    const rice_contour = new TileLayer({
        source: new TileWMS({
            url: 'http://localhost:8080/wms',
            params: {
                'LAYERS': `1/${layer}`,
                'STYLES': `colored_contours/${style}`,
                'TIME': time,
            },
            projection: 'EPSG:4326',
        }),
        opacity: 0.8
    })

    new Map({
        target: 'map',
        layers: [base, rice_contour, rice_fill],
        // layers: [base, rice_fill],
        view: new View({
            center: [0, 0],
            zoom: 2,
            projection : 'EPSG:4326',
        }),
    });
}