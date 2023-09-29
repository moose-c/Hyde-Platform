import './App.css';

// react
import React, { useState } from 'react';

// components
import Map from './components/Map'
import Page from './components/Page'

export default function App() {
  const [selection, setSelection] = useState([])
  const [overlay, setOverlay] = useState([])

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
