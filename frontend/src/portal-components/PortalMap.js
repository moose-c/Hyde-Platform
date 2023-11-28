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
import { TileWMS } from 'ol/source';

// Borders
import Borders from "../data/countries.geojson"

import { indicatorNcOrder } from "../util/createData"

export default function PortalMap({ currentlySelecting, setSelection, ovIndicator, setOvIndicator, currentYear }) {
  // Openlayers map element
  const map = useRef()
  const overlay = useRef([])

  // border style of the selected countries
  const highlightStyle = new Style({
    fill: new Fill({
      color: '#EEEEE',
    }),
    stroke: new Stroke({
      color: '#3399CC',
      width: 2,
    }),
  })

  // initialize map on first render
  useEffect(() => {
    // create borders, seperate from groundlayer to allow clickability
    const borders = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: Borders
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

    // create initial map
    map.current = new Map({
      target: 'map',
      layers: [base, borders],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2
      }),
      controls: []
    })
  }, [])

  // Change between selecting and overlay regime
  useEffect(() => {
    if (currentlySelecting) {
      setOvIndicator(null)
    } else {
      setSelection((previousSelection) => {
        previousSelection.forEach((feature) => feature.setStyle(undefined))
        return ([])
      })
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentlySelecting])

  // Overlay raster
  useEffect(() => {
    if (ovIndicator !== null) {
      var year = currentYear.split('_')[0] === 'ce' ? '' : '-'
      year += `${currentYear.split('_')[1]}`
      var time = `${year}-05-01`
      const style = 'seq-YlOrRd'
      const layer = window.apiUrl === 'localhost' ? '2/irrigated_rice' : `${indicatorNcOrder.indexOf(ovIndicator) + 1}/${ovIndicator}`
      const url = `http://${window.apiUrl}:8080/ncWMS/wms?REQUEST=GetMetadata&ITEM=minmax&VERSION=1.3.0&STYLES=&CRS=CRS:84&WIDTH=1000&HEIGHT=900&BBOX=-180,-90,179.9,89.9&TIME=${time}&LAYERS=${layer}`
      fetch(url)
        .then((response) => response.json())
        .then(minmax => {
          const fill = new TileLayer({
            className: 'overlay',
            source: new TileWMS({
              url: `http://${window.apiUrl}:8080/ncWMS/wms`,
              params: {
                'LAYERS': layer,
                'STYLES': `default-scalar/${style}`,
                'TIME': time,
                'COLORSCALERANGE': `${minmax.min + 0.00000001},${minmax.max}`,
                'BELOWMINCOLOR': 'transparent',
                'NUMCOLORBANDS': 6,
                'LOGSCALE': false
              },
              projection: 'EPSG:4326',
            }),
            opacity: 0.8
          })
          map.current.addLayer(fill)
          overlay.current = [fill]
        })
    } else if (map.current) {
      setSelection([])
      overlay.current.forEach(layer => {
        map.current.removeLayer(layer)
      });
      overlay.current = []
    }
    // eslint-disable-next-line
  }, [ovIndicator, currentYear])



  // If clicked on map, do one of two things
  function handleClick(e) {
    if (currentlySelecting) {
      // Only use first of the selected values, this way when you select precicely a border only 1 country is selected
      const firstFeature = map.current.getFeaturesAtPixel([e.pageX, e.pageY])[0]
      // doesn't exist if no country (i.e. sea) was selected
      if (firstFeature) {
        setSelection((previousSelection) => {
          if (!previousSelection.includes(firstFeature)) {
            firstFeature.setStyle(highlightStyle)
            return ([...previousSelection, firstFeature])
          } else {
            firstFeature.setStyle(undefined)
            const newSelection = [...previousSelection]
            newSelection.splice(previousSelection.indexOf(firstFeature), 1)
            return newSelection
          }
        })
      }
    } else {
      if (ovIndicator !== null) {
        // BETA If there is an overlay: when a pixel is selected display the value at that pixel
        var pixel = [e.pageX, e.pageY]
        for (let layer of map.current.values_.layergroup.values_.layers.array_) {
          if (layer.className_ === 'overlay') {
            var overlayLayer = layer.values_.source
            break
          }
        }
        const view = map.current.values_.view
        const projection = view.values_.projection
        console.log(pixel)
        const url = overlayLayer.getFeatureInfoUrl(
          map.current.getCoordinateFromPixel(pixel),
          view,
          projection,
          { 'INFO_FORMAT': 'text/plain' }
        );
        if (url) {
          fetch(url)
            .then((response) => response.text())
            .then((html) => {
              console.log(html)
            });
        }
      }
    }
  }

  // render component
  return (
    <div id='map' className="map-container" onClick={(e) => handleClick(e)}></div>
  )
}