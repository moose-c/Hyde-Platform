import './styles/App.css';

// react
import React, { useState } from 'react';

// components
import Map from './components/Map'
import Page from './components/Page'

export default function App() {
  // Contains countries currently selected
  const [selection, setSelection] = useState([])
  
  // Contains which raster overlay
  const [overlay, setOverlay] = useState(null)

  function handleSelection(newSelection) {
    setSelection(newSelection)
  }

  return (
    <div className='App'>
      <Map selection={selection} overlay={overlay} handleSelection={handleSelection} />
      <Page selection={selection} overlay={overlay} onOverlay={setOverlay} />
    </div>
  )
}
