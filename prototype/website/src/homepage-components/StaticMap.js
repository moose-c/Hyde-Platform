import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import { Style, Fill, Stroke } from "ol/style.js";
import VectorLayer from "ol/layer/Vector.js";
import TileLayer from "ol/layer/Tile";
import VectorSource from "ol/source/Vector.js";
import XYZ from "ol/source/XYZ.js";
import GeoJSON from "ol/format/GeoJSON.js";
import CountryLayer from "../data/countries.geojson";

const StaticMap = () => {
  const [map, setMap] = useState(null);

  const mapRef = useRef();
  const borders = new VectorLayer({
    source: new VectorSource({
      format: new GeoJSON(),
      url: CountryLayer,
    }),
    style: new Style({
      fill: new Fill({
        color: "rgba(255, 255, 0, 0)",
      }),
    }),
  });
  const base = new TileLayer({
    source: new XYZ({
      url:
        "https://server.arcgisonline.com/ArcGIS/rest/services/" +
        "World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    }),
  });
  const initialMap = new Map({
    target: "map",
    layers: [base, borders],
    view: new View({
      projection: "EPSG:3857",
      center: [0, 0],
      zoom: 2,
    }),
    controls: [
      /* new Zoom() */
    ],
  });

  useEffect(() => {
    setMap(initialMap);
    mapRef.current = initialMap;
  }, []);

  return <div ref={mapRef} style={{ width: 400, height: 200 }} id="map"></div>;
};

export default StaticMap;
