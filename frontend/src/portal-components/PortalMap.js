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
import { Zoom } from 'ol/control';

import CloseButton from 'react-bootstrap/CloseButton';

// Borders
import Borders from "../data/countries.geojson"

import { indicatorNcObj, rangeValues, styleValues } from "../util/createData"


export default function PortalMap({ currentlySelecting, setSelection, ovIndicator, setOvIndicator, currentYear, popoverInfo, setPopoverInfo }) {
  // Openlayers map element
  const map = useRef()
  const overlay = useRef([])

  // Only do something if people click, not if they drag
  const [mouseDownPosition, setMouseDownPosition] = useState(null)

  // Display message for 5 seconds at the mouse when changing between selecting countries and clicking pixels
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tooltipMessage, setTooltipMessage] = useState('');

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
      controls: [new Zoom()]
    })
  }, [])

  const displayMessage = (message) => {
    setTooltipMessage(message);
    setTimeout(() => setTooltipMessage(''), 10000); // Clear message after 10 seconds
  };

  window.addEventListener('mousemove', (event) => {
    setMousePosition({ x: event.clientX + 15, y: event.clientY });
  });

  // Change between selecting and overlay regime
  useEffect(() => {
    if (currentlySelecting) {
      setOvIndicator(null)
      setPopoverInfo(null)
      displayMessage('Click on Countries to select them'); // Message when starting selection
    } else {
      setSelection((previousSelection) => {
        previousSelection.forEach((feature) => feature.setStyle(undefined))
        return ([])
      })
      displayMessage('After Indicator selected, click a pixel to learn its value'); // Message when starting selection
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
  function handleMouseUp(e) {
    if (mouseDownPosition[0] === e.clientX && mouseDownPosition[1] === e.clientY) {
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
  }
  // render component
  function handleMove(e) {
    if (e.buttons === 1) {
      setPopoverInfo(null)
    }
  }
  return (
    <>
      <div id='map' className="map-container" onPointerMove={(e) => handleMove(e)} onMouseDown={(e) => setMouseDownPosition([e.clientX, e.clientY])} onMouseUp={(e) => handleMouseUp(e)}></div>
      {/* When there is raster overlay, clicking a pixel displays a popup showing the value at that pixel */}
      {popoverInfo !== null && (
        <div style={{ border: 'solid black 1px', borderRadius: 5, backgroundColor: 'white', position: 'fixed', left: popoverInfo.left, top: popoverInfo.top, padding: 3 }}><div style={{
          borderBottom: 'solid black 1px',
          borderRadius: '5px 5px 0 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h5 style={{
            color: '#0A58CA',
            fontWeight: 'bold',
            marginBottom: 0,
            paddingLeft: 5,
            paddingRight: 10
          }}>
            Pixel Information
          </h5>
          <CloseButton onClick={() => setPopoverInfo(null)} />
        </div>

          <div>
            Longitude = {popoverInfo.lon.toFixed(3)} <br />
            Latitude = {popoverInfo.lat.toFixed(3)} <br />
            {popoverInfo.value !== null && (<span style={{ fontWeight: 'bold' }}> {Object.assign({}, ...Object.values(indicatorNcObj))[ovIndicator]} = {popoverInfo.value.toFixed(3)}<br /></span>)}
            {popoverInfo.value === null && (<span style={{ fontWeight: 'bold' }}>No Pixel Value<br /></span>)}
          </div>
        </div>
      )}
      {tooltipMessage && (
        <div
          className='styled-div'
          style={{
            position: 'absolute',
            left: mousePosition.x,
            top: mousePosition.y,
            pointerEvents: 'none', // To not interfere with mouse events
          }}
        >
          {tooltipMessage}
        </div>
      )}
    </>
  )
}