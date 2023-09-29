import { useState } from 'react';

import Map from './components/Map'
import Page from './components/Page'

import './App.css';

export default function App() {
  const [selection, setSelection] = useState([])
  const [overlay, setOverlay] = useState([])

  return (
    <>
      <Map selection={selection} overlay={overlay} onSelection={setSelection}/>
      <Page selection={selection} overlay={overlay} onOverlay={setOverlay}/>
    </>
  )
}
