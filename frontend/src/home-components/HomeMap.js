/* Displays maps on Home, either Static or changing based on currentYear, 
in the later case a raster from the -- val -- .nc is displayed  */

import React, { useEffect, useState } from "react";

import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ.js";
import { TileWMS } from "ol/source";

import { rangeValues, styleValues } from "../util/createData";

export default function HomeMap({
  roundedYear = 0,
  mapId = 0,
  width = 400,
  height = 200,
  netCDF = false,
}) {
  const [map, setMap] = useState([]);
  const [overlay, setOverlay] = useState([]);

  const idTag = mapId ? `map-${mapId}` : "map";

  useEffect(() => {
    const base = new TileLayer({
      source: new XYZ({
        url:
          "https://server.arcgisonline.com/ArcGIS/rest/services/" +
          "World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      }),
    });

    setMap(
      new Map({
        target: idTag,
        layers: [base],
        view: new View({
          projection: "EPSG:3857",
          center: [0, 0],
          zoom: 1,
        }),
        controls: [],
        interactions: [],
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // add raster to only render after scrolling has stopped
    if (map && netCDF) {
      var time = `${roundedYear}-05-01`;
      const style = styleValues["lu"];
      const layer = "cropland/cropland";
      // uses the ncWMS backend
      var domainName =
        window.apiUrl === "" ? window.apiUrl : `${window.apiUrl}:8080`;
      const fill = new TileLayer({
        source: new TileWMS({
          url: `${domainName}/ncWMS/wms`,
          params: {
            LAYERS: layer,
            STYLES: `default-scalar/${style}`,
            TIME: time,
            COLORSCALERANGE: rangeValues["lu"],
            BELOWMINCOLOR: "transparent",
            ABOVEMAXCOLOR: "extend",
            NUMCOLORBANDS: 8,
            LOGSCALE: false,
          },
          projection: "EPSG:4326",
        }),
        opacity: 0.8,
      });
      /* Change the previous Map */
      setMap((previousMap) => {
        const newMap = previousMap;
        if (overlay.length > 0) {
          overlay.forEach((layer) => {
            newMap.removeLayer(layer);
          });
        }
        newMap.addLayer(fill);
        return newMap;
      });
      setOverlay([fill]);
    }
    /* roundedYear updates only if currentYear == previousYear */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, roundedYear]);

  return <div style={{ aspectRatio:false, width: width, height: height }} id={idTag}></div>;
}
