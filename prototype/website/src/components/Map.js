// react
import React, { useEffect } from 'react';

// openlayers
import { Map, View } from 'ol'
import { Style, Fill, Stroke } from 'ol/style.js'
import VectorLayer from 'ol/layer/Vector.js'
import TileLayer from 'ol/layer/Tile'
import VectorSource from 'ol/source/Vector.js'
import XYZ from 'ol/source/XYZ.js';
import { Zoom } from 'ol/control.js'
import GeoJSON from 'ol/format/GeoJSON.js'

import CountryLayer from "../data/countries.geojson"

// 'MapWrapper' chosen since 'Map' already declared from openlayers, since default export of little importance
export default function MapWrapper({ map, setMap, selection, handleSelection }) {

  // initialize map on first render
  useEffect(() => {
    // create borders, seperate from groundlayer to allow clickability
    const borders = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: CountryLayer
      }),
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 0, 0)'
        })
      })
    });

    // World Topo Map chosen as baselayer.
    const base = new TileLayer({
      source: new XYZ({
        url:
          'https://server.arcgisonline.com/ArcGIS/rest/services/' +
          'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      }),
    })

    // create map
    const initialMap = new Map({
      target: 'map',
      layers: [base, borders],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2
      }),
      controls: [/* new Zoom() */]
    })

    // save map and vector layer references to state
    setMap(initialMap)

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (map) {
      // set map onclick handler
      map.on('click', (event) => {
        const highlightStyle = new Style({
          fill: new Fill({
            color: '#EEEEE',
          }),
          stroke: new Stroke({
            color: '#3399CC',
            width: 2,
          }),
        });

        map.forEachFeatureAtPixel(event.pixel, function (f) {
          if (!selection.includes(f)) {
            f.setStyle(highlightStyle)
            handleSelection([...selection, f])
          } else {
            f.setStyle(undefined)
            const newSelection = selection.slice(0)
            newSelection.splice(selection.indexOf(f), 1)
            handleSelection(newSelection)
          }
        })
      })
    }
  }, [map, selection])




  // render component
  return (
    <div id='map' className="map-container"></div>
  )

}