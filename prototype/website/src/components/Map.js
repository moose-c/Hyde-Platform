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
import { TileWMS } from 'ol/source'

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
        format: new GeoJSON(),   /* Make GeoJSON available offline, would be better. */
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

    // save map and vector layer references to state
    setMap(initialMap)

    // set map onclick handler
    initialMap.on('click', handleMapClick)


    // eslint-disable-next-line
  }, [])

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

  useEffect(() => {
    if (!overlay) {
    } else {
      // time should be in state
      const time = '0-05-01'
      const style = 'seq-YlOrRd' // Option: allow user to set manually?
      var minmax;
      let response = fetch(`http://localhost:8080/ncWMS2/wms?REQUEST=GetMetadata&ITEM=minmax&VERSION=1.3.0&STYLES=&CRS=CRS:84&WIDTH=1000&HEIGHT=900&BBOX=-180,-90,179.9,89.9&
        TIME=${time}&
        LAYERS=${overlay.name}`)
      minmax = response.json()
      if (minmax.min < 0) {
        console.log('map has no values')
      }
      const fill = new TileLayer({
        source: new TileWMS({
          // URL should be fixed to point to server
          url: 'http://localhost:8080/ncWMS2/wms',
          params: {
            'LAYERS': `${overlay.name}`,
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
            'LAYERS': `${overlay.name}`,
            'STYLES': `colored_contours/${style}`,
            'TIME': time,
          },
          projection: 'EPSG:4326',
        }),
        opacity: 0.8
      })

      // Following should be where we actually want the legend
      // const legend_request = fetch(`http://localhost:8080/ncWMS2/wms?REQUEST=GetLegendGraphic&VERSION=1.3.0&LAYERS=${window.layerName}&COLORBARONLY=FALSE&STYLES=default-scalar/${style}&HEIGHT=200&WIDTH=50&COLORSCALERANGE=${minmax.min},${minmax.max}`)
      // const legend_blob = legend_request.blob()
      // const legend = document.getElementById('legend')
      // legend.src = URL.createObjectURL(legend_blob)

      // Overlay will be an object, with attrs name, fill, countour
      map.addLayer(fill)
      map.addLayer(contour)
      overlay.fill = fill
      overlay.contour = contour
    }
  }, [overlay])
  // render component
  return (
    <div id='map' className="map-container"></div>
  )

}