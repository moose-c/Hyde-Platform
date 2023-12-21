// react
import React, { useEffect, useRef, useState } from 'react';

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

import { rangeValues, styleValues } from "../util/createData"


export default function PortalMap({ currentlySelecting, setSelection, ovIndicator, setOvIndicator, currentYear }) {
  // Openlayers map element
  const map = useRef()
  const overlay = useRef([])

  const [popoverInfo, setPopoverInfo] = useState(null)

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
      setPopoverInfo(null)
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
      const style = ['population', 'population_density', 'urban_population', 'rural_population'].includes(ovIndicator) ? styleValues['pop'] : styleValues['lu']
      const range = ['population', 'urban_population', 'rural_population'].includes(ovIndicator) ? rangeValues['popAbs'] : 'population_density' === ovIndicator ? rangeValues['popDens'] : rangeValues['lu']
      const layer = window.apiUrl === 'localhost' ? 'cropland/cropland' : `${ovIndicator}/${ovIndicator}`
      var domainName = window.apiUrl === '' ? window.apiUrl : `${window.apiUrl}:8080`
      const fill = new TileLayer({
        className: 'overlay',
        source: new TileWMS({
          url: `${domainName}/ncWMS/wms`,
          params: {
            'LAYERS': layer,
            'STYLES': `default-scalar/${style}`,
            'TIME': time,
            'COLORSCALERANGE': range,
            'BELOWMINCOLOR': 'transparent',
            'ABOVEMAXCOLOR': 'extend',
            'NUMCOLORBANDS': 8,
            'LOGSCALE': false
          },
          projection: 'EPSG:3857',
        }),
        opacity: 0.8
      })
      setSelection([])
      overlay.current.forEach(layer => {
        map.current.removeLayer(layer)
      });
      overlay.current = []
      map.current.addLayer(fill)
      overlay.current = [fill]
    } else if (map.current) {
      setSelection([])
      setOvIndicator(null)
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
        const viewRes = view.getResolution()
        const projection = view.values_.projection
        const url = overlayLayer.getFeatureInfoUrl(
          map.current.getCoordinateFromPixel(pixel),
          viewRes,
          projection,
          { 'INFO_FORMAT': 'text/xml' }
        );
        if (url) {
          fetch(url)
            .then((response) => response.text())
            .then((html) => {
              const parser = new DOMParser();
              const xmlDoc = parser.parseFromString(html, 'text/xml');

              const lon = parseFloat(xmlDoc.getElementsByTagName('longitude')[0].textContent)
              const lat = parseFloat(xmlDoc.getElementsByTagName('latitude')[0].textContent)
              const value = xmlDoc.getElementsByTagName('value').length > 0 ? parseFloat(xmlDoc.getElementsByTagName('value')[0].textContent) : null
              setPopoverInfo({ left: e.clientX, top: e.clientY, lon: lon, lat: lat, value: value })
            });
        }
      }
    }
  }

  // render component
  return (
    <>
      <div id='map' className="map-container" onClick={(e) => handleClick(e)}></div>
      {/* When there is raster overlay, clicking a pixel displays a popup showing the value at that pixel */}
      {popoverInfo !== null && (
        <div style={{ border: 'solid black 1px', borderRadius: 5, backgroundColor: 'white', position: 'fixed', left: popoverInfo.left, top: popoverInfo.top }}>
          <div style={{ display: 'flex', borderBottom: 'solid black 1px', borderRadius: '5px 5px 0px 0px', padding: '1px 3px 0px 3px' }}><h6 style={{ color: '#0A58CA', fontWeight: 'bold', marginBottom: 0, paddingRight: 5 }}>Pixel Information</h6><span style={{ cursor: "pointer" }} onClick={() => setPopoverInfo(null)}>X</span></div>
          <div>
            Longitude = {popoverInfo.lon.toFixed(3)} <br />
            Latitude = {popoverInfo.lat.toFixed(3)} <br />
            {popoverInfo.value !== null && (<span style={{ fontWeight: 'bold' }}>Pixel Value = {popoverInfo.value.toFixed(3)}<br /></span>)}
            {popoverInfo.value === null && (<span style={{ fontWeight: 'bold' }}>No Pixel Value<br /></span>)}
          </div>
        </div>
      )}
    </>
  )
}