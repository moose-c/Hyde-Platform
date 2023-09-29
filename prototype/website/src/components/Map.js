// react
import React, { useState, useEffect, useRef } from 'react';

// openlayers
import { Map, View } from 'ol'
import { Style, Fill, Stroke } from 'ol/style.js'
import VectorLayer from 'ol/layer/Vector.js'
import TileLayer from 'ol/layer/Tile'
import VectorSource from 'ol/source/Vector.js'
import XYZ from 'ol/source/XYZ.js';
import { Zoom } from 'ol/control.js'
import GeoJSON from 'ol/format/GeoJSON.js'

export default function MapWrapper({ selection, overlay, handleSelection }) {

  // set intial state
  const [map, setMap] = useState()

  // create state ref that can be accessed in OpenLayers onclick callback function
  //  https://stackoverflow.com/a/60643670
  const mapRef = useRef()
  mapRef.current = map

  const selectionRef = useRef()
  selectionRef.current = selection

  // initialize map on first render - logic formerly put into componentDidMount
  useEffect(() => {

    // create borders, seperate from groundlayer to allow clickability
    const borders = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: 'https://raw.githubusercontent.com/openlayers/ol3/6838fdd4c94fe80f1a3c98ca92f84cf1454e232a/examples/data/geojson/countries.geojson'
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
        attributions:
          'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
          'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
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
      controls: [new Zoom()]
    })

    // set map onclick handler
    initialMap.on('click', handleMapClick)

    // save map and vector layer references to state
    setMap(initialMap)
// eslint-disable-next-line
  }, [])

  // useEffect(() => {
  //   console.log('actually foking changed')
  // }, [selection])

  // map click handler
  const handleMapClick = (event) => {
    const highlightStyle = new Style({
      fill: new Fill({
        color: '#EEEEE',
      }),
      stroke: new Stroke({
        color: '#3399CC',
        width: 2,
      }),
    });

    mapRef.current.forEachFeatureAtPixel(event.pixel, function (f) {
      if (!selectionRef.current.includes(f)) {
        f.setStyle(highlightStyle)
        handleSelection([...selectionRef.current, f])
      } else {
        f.setStyle(undefined)
        const newSelection = selectionRef.current.slice(0)
        newSelection.splice(selectionRef.current.indexOf(f), 1)
        handleSelection(newSelection)
      }
    })
  }

  // render component
  return (
    <div id='map' className="map-container"></div>
  )

}