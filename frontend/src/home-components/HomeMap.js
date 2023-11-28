/* Displays maps on Home, either Static or changing based on currentYear, 
in the later case a raster from the -- val -- .nc is displayed  */

import React, { useEffect, useState } from "react";

import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ.js";
import { TileWMS } from 'ol/source';

export default function HomeMap({ roundedYear = 0, mapId = 0, width = 400, height = 200, netCDF = false }) {
  const [map, setMap] = useState([])
  const [overlay, setOverlay] = useState([])

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
      controls: [],
      interactions: []
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // add raster to only render after scrolling has stopped
    if (map && netCDF) {
      var time = `${roundedYear}-05-01`
      const style = 'seq-YlOrRd'
      const layer = 'cropland/cropland'
      // uses the ncWMS backend
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
          /* Change the previous Map */
          setMap(previousMap => {
            const newMap = previousMap
            if (overlay.length > 0) {
              overlay.forEach(layer => {
                newMap.removeLayer(layer)
              });
            }
            newMap.addLayer(fill)
            newMap.addLayer(contour)
            return newMap
          })
          setOverlay([fill, contour])
        })
    }   /* roundedYear updates only if currentYear == previousYear */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, roundedYear])


  return (
    <div style={{ width: width, height: height }} id={idTag}></div>
  )
};