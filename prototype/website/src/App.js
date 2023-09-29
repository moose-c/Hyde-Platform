import './App.css';

// react
import React, { useState, useEffect } from 'react';

// components
import Map from './components/Map'
import Page from './components/Page'

export default function App() {
  const [selection, setSelection] = useState([])
  const [overlay, setOverlay] = useState([])

  return (
    <div className='App'>
      <Map selection={selection} overlay={overlay} onSelection={setSelection} />
      <Page selection={selection} overlay={overlay} onOverlay={setOverlay} />
    </div>
  )
}
