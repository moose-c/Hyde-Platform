import Map from 'ol/Map.js';
import View from 'ol/View.js';

// default background provided, should be oke but changing should also be easy.
import {OSM, TileWMS} from 'ol/source';

// Renders sources that provide tiled images in grids that are organized by zoom levels for specific resolutions.
import TileLayer from 'ol/layer/Tile.js';

export function plotMap(){
    const base = new TileLayer({
        source: new OSM(),
        })

    const map = new Map({
        target: 'map',
        layers: [base],
        view: new View({
            center: [0, 0],
            zoom: 2,
            projection : 'EPSG:4326',
        }),
    });
    return(map)
}

export async function changeOverlay(map, current_layer, layer, year) {
    current_layer = await current_layer // to finally resolve promise..
    if (current_layer) {
        map.removeLayer(current_layer[0])
        map.removeLayer(current_layer[1])
    }
    const time = `${year}-05-01`
    const style = 'seq-YlOrRd' // Option: allow user to set manually?

    var minmax;
    let response = await fetch(`http://localhost:8080/ncWMS2/wms?REQUEST=GetMetadata&ITEM=minmax&VERSION=1.3.0&STYLES=&CRS=CRS:84&WIDTH=1000&HEIGHT=900&BBOX=-180,-90,179.9,89.9&
        TIME=${time}&
        LAYERS=${layer}`)
    minmax = await response.json()

    if (minmax.min < 0) {
        console.log('map has no values I think, do something else?')
    }
    const fill = new TileLayer({
        source: new TileWMS({
            url: 'http://localhost:8080/ncWMS2/wms',
            params: {
                'LAYERS': `${layer}`,
                'STYLES': `default-scalar/${style}`,
                'TIME': time,
                'COLORSCALERANGE': `${minmax.min+0.00000001},${minmax.max}`,
                'BELOWMINCOLOR': 'transparent'
            },
            projection: 'EPSG:4326',
        }),
        opacity: 0.8
    })

    const contour = new TileLayer({
        source: new TileWMS({
            url: 'http://localhost:8080/ncWMS2/wms',
            params: {
                'LAYERS': `${layer}`,
                'STYLES': `colored_contours/${style}`,
                'TIME': time,
            },
            projection: 'EPSG:4326',
        }),
        opacity: 0.8
    })

    const legend_request = await fetch(`http://localhost:8080/ncWMS2/wms?REQUEST=GetLegendGraphic&VERSION=1.3.0&LAYERS=${layer}&COLORBARONLY=FALSE&STYLES=default-scalar/${style}&HEIGHT=200&WIDTH=50&COLORSCALERANGE=${minmax.min},${minmax.max}`)
    const legend_blob = await legend_request.blob()
    const legend = document.getElementById('legend')
    legend.src = URL.createObjectURL(legend_blob)

    map.addLayer(fill)
    map.addLayer(contour)
    current_layer = [fill, contour]
    return(current_layer)
}