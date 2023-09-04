import {Map, View} from 'ol'
import {Style, Fill} from 'ol/style.js'
import VectorLayer from 'ol/layer/Vector.js'
import TileLayer from 'ol/layer/Tile'
import VectorSource from 'ol/source/Vector.js'
import XYZ from 'ol/source/XYZ.js';
import {Zoom} from 'ol/control.js'
import GeoJSON from 'ol/format/GeoJSON.js'

export var map

export function createMap() {

    // A bit unclear whether the following is necessary, https://developers.arcgis.com/openlayers/maps/change-the-basemap-style/:
    // const esriKey = import.meta.env.VITE_ESRI_KEY
    // const basemapId = "arcgis/streets";
    // const basemapURL = `https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles/${basemapId}?token=${esriKey}`;

    // create borders, seperate from groundlayer to allow clickability
    const borders = new VectorLayer({
        source: new VectorSource({
            // countries.geojson is retrieved from https://github.com/datasets/geo-countries/blob/master/data/countries.geojson
            url: './src/borders/countries.geojson',
            format: new GeoJSON()
        }),
        style : new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 0, 0)'
            })
        })
    });

    const base = new TileLayer({
        source: new XYZ({
          attributions:
            'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
          url:
            'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        }),
      })

    map = new Map({
        controls: [new Zoom()],   /* makes sure that only zoom buttons remain */
        projection : 'EPSG:3857',
        layers: [base, borders],
        target: 'map',
        view: new View({
            center: [0, 0],
            zoom: 2,
        }),
    });

}