import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ.js";
import { TileWMS } from 'ol/source';

const StaticMap = ({ roundedYear = 0, mapId = 0, width = 400, height = 200, netCDF = false }) => {

  const [map, setMap] = useState([])
  const [overlay, setOverlay] = useState([])
  const mapRef = useRef()
  mapRef.current = map

  const idTag = mapId ? `map-${mapId}` : 'map'

  useEffect(() => {
    const base = new TileLayer({
      source: new XYZ({
        url:
          "https://server.arcgisonline.com/ArcGIS/rest/services/" +
          "World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      }),
    });

    setMap(new Map({
      target: idTag,
      layers: [base],
      view: new View({
        projection: "EPSG:3857",
        center: [0, 0],
        zoom: 1,
      }),
      controls: [
      ],
      interactions: []
    }))

  }, [])

    useEffect(() => {
      if (map && netCDF) {
        if (overlay.length > 0) {
          overlay.forEach(layer => {
            mapRef.current.removeLayer(layer)
          });
          setOverlay([])
          setMap(mapRef.current)
        }
        var time = `${roundedYear}-05-01`
        const style = 'seq-YlOrRd'
        const layer = '2/irrigated_rice'
        const url = `http://${window.apiUrl}:8080/ncWMS/wms?REQUEST=GetMetadata&ITEM=minmax&VERSION=1.3.0&STYLES=&CRS=CRS:84&WIDTH=1000&HEIGHT=900&BBOX=-180,-90,179.9,89.9&TIME=${time}&LAYERS=${layer}`
        fetch(url)
          .then((response) => response.json())
          .then(minmax => {
            const fill = new TileLayer({
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
  
            const contour = new TileLayer({
              source: new TileWMS({
                url: `http://${window.apiUrl}:8080/ncWMS/wms`,
                params: {
                  'LAYERS': layer,
                  'STYLES': `colored_contours/${style}`,
                  'TIME': time,
                  'NUMCOLORBANDS': 6,
                  'LOGSCALE': false
                },
                projection: 'EPSG:4326',
              }),
              opacity: 0.8
            })
            mapRef.current.addLayer(fill)
            mapRef.current.addLayer(contour)
            setMap(mapRef.current)
            setOverlay([fill, contour])
          })
      }
    }, [map, roundedYear])
  

  return (
    <div ref={mapRef} style={{ width: width, height: height }} id={idTag}></div>
  )
};

export default StaticMap;