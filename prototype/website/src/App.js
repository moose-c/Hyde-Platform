import './App.css';

// react
import React, { useState, useEffect } from 'react';

// openlayers
import GeoJSON from 'ol/format/GeoJSON'

// components
import MapWrapper from './components/MapWrapper'

function App() {
  return (
    <div className="App">
      
      <div className="app-label">
        <p>React Functional Components with OpenLayers Example</p>
        <p>Click the map to reveal location coordinate via React State</p>
      </div>
      
      <MapWrapper/>

    </div>
  )
}

export default App
