// react
import React, { useEffect, useRef } from 'react';

// Utilized openlayers elements
import { Map, View } from 'ol'
import { Style, Fill, Stroke } from 'ol/style.js'
import VectorLayer from 'ol/layer/Vector.js'
import TileLayer from 'ol/layer/Tile'
import VectorSource from 'ol/source/Vector.js'
import XYZ from 'ol/source/XYZ.js';
import GeoJSON from 'ol/format/GeoJSON.js'

// Does this work now?
import CountryLayer from "../data/countries.geojson"

import { indicatorNcOrder } from "../util/createData"

export default function PortalMap({ map, setMap, selection, setSelection, overlay, ovIndicator, currentYear }) {
  const mapRef = useRef()
  // Custom hook which allows for knowing the previous value of selection
  function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }
  const prevSelection = usePrevious(selection)

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
    mapRef.current = initialMap

    // eslint-disable-next-line
  }, [])

  // If clicked on map, do one of two things
  function handleClick(e) {
    if (overlay.length === 0) {
      // If there is no overlay: update the selection
      // Only use first of the selected values, this way when you select precicely a border only 1 country is selected
      const firstFeature = mapRef.current.getFeaturesAtPixel([e.pageX, e.pageY])[0]
      if (firstFeature) {
        if (!selection.includes(firstFeature)) {
          setSelection([...selection, firstFeature])
        } else {
          setSelection((oldSelection) => {
            const newSelection = oldSelection.slice(0)
            newSelection.splice(selection.indexOf(firstFeature), 1)
            return newSelection
          })
        }
      }
    } else {
      // BETA If there is an overlay: when a pixel is selected display the value at that pixel
      var pixel = [117.77521, 28.2917]
      const layer = window.apiUrl === 'localhost' ? '2/irrigated_rice' : `${indicatorNcOrder.indexOf(ovIndicator) + 1}/${ovIndicator}`
      const time = `${currentYear.split('_')[1]}-05-01`
      const url = `http://${window.apiUrl}:8080/ncWMS/wms?REQUEST=GetFeatureInfo&VERSION=1.3.0&CRS=CRS:84&QUERY_LAYERS=${layer}&TIME=${time}-05-01&LAYERS=${layer}&INFO_FORMAT=text/plain&I=1&J=1&BBOX=${pixel[0] - 0.001},${pixel[1] - 0.001},${pixel[0] + 0.001},${pixel[1] + 0.001}&WIDTH=400&HEIGHT=600`
      /* const request = fetch(url)
      const featureInfo = request.text
      console.log(featureInfo) */
      console.log(url)
    }
  }

  useEffect(() => {
    if (selection && prevSelection) {
      if (prevSelection.length > selection.length) {
        const removed = prevSelection.filter(f => !selection.includes(f))
        removed.forEach(feature => feature.setStyle(undefined))
      } else if (prevSelection.length < selection.length) {
        const highlightStyle = new Style({
          fill: new Fill({
            color: '#EEEEE',
          }),
          stroke: new Stroke({
            color: '#3399CC',
            width: 2,
          }),
        })
        const newFeature = selection.filter(f => !prevSelection.includes(f))
        newFeature[0].setStyle(highlightStyle)
      }
    }
  }, [selection])

  // render component
  return (
    <div id='map' className="map-container" onClick={(e) => handleClick(e)}></div>
  )
}