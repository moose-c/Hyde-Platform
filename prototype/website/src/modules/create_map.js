import Map from 'ol/Map.js';
import View from 'ol/View.js';

import Style from 'ol/style/Style.js';
import Fill from 'ol/style/Fill.js';

import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';

import GeoJSON from 'ol/format/GeoJSON.js';

import {Attribution, Zoom} from 'ol/control.js';

// default background provided, should be oke but changing should also be easy.
import OSM from 'ol/source/OSM.js';

// Renders sources that provide tiled images in grids that are organized by zoom levels for specific resolutions.
import TileLayer from 'ol/layer/Tile.js';

export var map

export function createMap() {

    const vector = new VectorLayer({
        source: new VectorSource({
            url: './src/countries.geojson',
            format: new GeoJSON()
        }),
        style : new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 0, 0)'
            })
        })
    });

    const raster = new TileLayer({
        source: new OSM(),
      })

    map = new Map({
        controls: [new Zoom(), new Attribution()],
        projection : 'EPSG:3857',
        layers: [raster, vector],
        target: 'map',
        view: new View({
            center: [0, 0],
            zoom: 2,
        }),
    });

}