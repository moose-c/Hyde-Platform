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

export default function MapWrapper() {

  // set intial state
  const [ map, setMap ] = useState()
  const [ featuresLayer, setFeaturesLayer ] = useState()
  const [ selectedCoord , setSelectedCoord ] = useState()
  
  // create state ref that can be accessed in OpenLayers onclick callback function
  //  https://stackoverflow.com/a/60643670
  const mapRef = useRef()
  mapRef.current = map

  // initialize map on first render - logic formerly put into componentDidMount
  useEffect( () => {

    // create borders, seperate from groundlayer to allow clickability
    const borders = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: 'https://raw.githubusercontent.com/openlayers/ol3/6838fdd4c94fe80f1a3c98ca92f84cf1454e232a/examples/data/geojson/countries.geojson'
      }),
      style: new Style({
        fill: new Fill({
          color: '#EEEEE'
        }),
        stroke: new Stroke({
          color: '#3399CC',
          width: 2,
        }),
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
      controls: []
    })

    // set map onclick handler
    initialMap.on('click', handleMapClick)

    // save map and vector layer references to state
    setMap(initialMap)

  },[])

  // map click handler
  const handleMapClick = (event) => {
    
    // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
    //  https://stackoverflow.com/a/60643670
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

    console.log(clickedCoord)
    
  }

  // render component
  return (      
    <div>
      
      <div id='map' className="map-container"></div>

    </div>
  ) 

}