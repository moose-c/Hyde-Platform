import './styles/App.css';

// react
import React, { useState } from 'react';

// components
import Map from './components/Map'
import Page from './components/Page'

export default function App() {

  // set openlayers map
  const [map, setMap] = useState()

  // Contains countries currently selected
  const [selection, setSelection] = useState([])
  
  // Contains which raster overlay
  const [overlay, setOverlay] = useState([])

  // function handleSelection(newSelection) {
  //   setSelection(newSelection)
  // }

  return (
    <div className='App'>
      <Map map={map} setMap={setMap} selection={selection} handleSelection={setSelection} />
      <Page map={map} setMap={setMap} selection={selection} overlay={overlay} setOverlay={setOverlay} />
    </div>
  )
}
