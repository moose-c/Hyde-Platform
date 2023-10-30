import './styles/App.css';

// Necessary to use Bootstrap, a library aiding in styling
import 'bootstrap/dist/css/bootstrap.min.css';

// react
import React, { useState } from 'react';

// Two main components
import Map from './components/Map'
import Page from './components/Page'

export default function App() {
  // State, contains Openlayers map element
  const [map, setMap] = useState(false)

  // Contains countries currently selected
  const [selection, setSelection] = useState([])
  
  // Contains which raster overlay
  const [overlay, setOverlay] = useState([])

  // easily switch from remote and on-site work (production only)
  const UUNetwork = false 
  if (UUNetwork) {
    window.apiUrl = 'hydeprod.geo.uu.nl'
  } else {
    window.apiUrl = 'localhost'
  }

  return (
    <div className='App'>
      <Map map={map} setMap={setMap} selection={selection} handleSelection={setSelection} />
      <Page map={map} setMap={setMap} selection={selection} overlay={overlay} setOverlay={setOverlay} />
    </div>
  )
}
