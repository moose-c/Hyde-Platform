import Map from 'ol/Map.js';
import View from 'ol/View.js';

// default background provided, should be oke but changing should also be easy.
import { OSM, TileWMS } from 'ol/source';

// Renders sources that provide tiled images in grids that are organized by zoom levels for specific resolutions.
import TileLayer from 'ol/layer/Tile.js';

export function plotMap() {
    const base = new TileLayer({
        source: new OSM(),
    })

    window.map = new Map({
        target: 'map',
        layers: [base],
        view: new View({
            center: [0, 0],
            zoom: 2,
            projection: 'EPSG:4326',
        }),
    });
}

export async function changeOverlay() {
    console.log(window.currentLayers)
    if (window.currentLayer) {
        window.map.removeLayer(window.currentLayer[0])
        window.map.removeLayer(window.currentLayer[1])
    }
    const time = `${window.year}-05-01`
    const style = 'seq-YlOrRd' // Option: allow user to set manually?
    var minmax;
    let response = await fetch(`http://localhost:8080/ncWMS2/wms?REQUEST=GetMetadata&ITEM=minmax&VERSION=1.3.0&STYLES=&CRS=CRS:84&WIDTH=1000&HEIGHT=900&BBOX=-180,-90,179.9,89.9&
        TIME=${time}&
        LAYERS=${window.layerName}`)
    minmax = await response.json()

    if (minmax.min < 0) {
        console.log('map has no values I think, do something else?')
    }
    const fill = new TileLayer({
        source: new TileWMS({
            url: 'http://localhost:8080/ncWMS2/wms',
            params: {
                'LAYERS': `${window.layerName}`,
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
            url: 'http://localhost:8080/ncWMS2/wms',
            params: {
                'LAYERS': `${window.layerName}`,
                'STYLES': `colored_contours/${style}`,
                'TIME': time,
            },
            projection: 'EPSG:4326',
        }),
        opacity: 0.8
    })

    const legend_request = await fetch(`http://localhost:8080/ncWMS2/wms?REQUEST=GetLegendGraphic&VERSION=1.3.0&LAYERS=${window.layerName}&COLORBARONLY=FALSE&STYLES=default-scalar/${style}&HEIGHT=200&WIDTH=50&COLORSCALERANGE=${minmax.min},${minmax.max}`)
    const legend_blob = await legend_request.blob()
    const legend = document.getElementById('legend')
    legend.src = URL.createObjectURL(legend_blob)

    window.map.addLayer(fill)
    window.map.addLayer(contour)
    window.current_layers = [fill, contour]
}

export async function alternativeChangeOverlay() {
    if (typeof window.current_layer !== 'undefined' ) {
        window.map.removeLayer(window.current_layer[0])
    }
    const time = `0-05-01`
    // const style = 'seq-YlOrRd' // Option: allow user to set manually? I would eventually also like this from geoserver if it is better
    /* var minmax; Something like this also needs to happen sometime
    let response = await fetch(`http://localhost:8080/ncWMS2/wms?REQUEST=GetMetadata&ITEM=minmax&VERSION=1.3.0&STYLES=&CRS=CRS:84&WIDTH=1000&HEIGHT=900&BBOX=-180,-90,179.9,89.9&
        TIME=${time}&
        LAYERS=${window.layerName}`)
    minmax = await response.json()

    if (minmax.min < 0) {
        console.log('map has no values I think, do something else?')
    } */
    // This renders very fast. Perhaps Geoserver is better.
    if (window.layerName === '2/irrigated_rice') {
        var type = 'netCDF'
        var layer = `netCDF%3Airrigated_rice`
        var src= 'EPSG%3A4326'
    } else if (window.layerName === '1/irrigated_not_rice') {
        var type = 'ascii'
        var layer = 'ascii%3Air_rice0AD'
        var src= 'EPSG%3A404000'
    }
    const url = `http://localhost:4000/geoserver/${type}/wms?service=WMS&version=1.3.0&request=GetMap&layers=${layer}&bbox=-180%2C-90%2C180%2C90&src=${src}&styles=&format=image/jpeg`
    console.log(url)
    const fill = new TileLayer({
        source: new TileWMS({
            url: `http://localhost:4000/geoserver/${type}/wms?service=WMS&version=1.3.0&request=GetMap&layers=
            ${layer}&bbox=-180%2C-90%2C180%2C90&src=${src}&styles=&format=image/jpeg`,
            projection: 'EPSG:4326',
        }),
        /* params: {
            Layers: layer,
            Time: time,
            VERSION: '1.3.0'
        },   */
        opacity: 0.8
    })

    window.map.addLayer(fill)
    window.current_layer = [fill]
}