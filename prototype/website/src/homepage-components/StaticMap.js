import React from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ.js";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

const StaticMap = ({mapId, width=400, height=200}) => {
  const [map, setMap] = useState([])
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

  return <Link to="/map">
    <div ref={mapRef} style={{width: width, height: height}} id={idTag}></div>
  </Link>
};

export default StaticMap;