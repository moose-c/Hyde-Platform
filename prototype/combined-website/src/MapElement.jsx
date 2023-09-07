import React from "react";
import {Layers, Map, layer} from "react-openlayers";



export default function MapElement() {
  return (
    <Map
        view={{
          center: [0, 0],
          zoom: 10
        }}
      >
        <Layers>
          <layer.Tile source={OSM} />
        </Layers>
      </Map>
  )
}
