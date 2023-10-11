import { useState } from 'react'

import '../styles/Page.css'

import LeftElements from './LeftElements'
import MiddleElements from './MiddleElements'
import RightElements from './RightElements'

export default function Page({ map, setMap, selection, overlay, setOverlay }) {
    const [startYear, setStartYear] = useState('ce_1930')
    const [endYear, setEndYear] = useState('ce_1953')
    const [indicators, setIndicators] = useState([])
    // use a dictionary since if now change plotting to the same value 'true' rerender page
    const [plotOptions, setPlotOptions] = useState({
        plotting: false,
        absolute: false,
        combine: false
    })

    const style = {
        border: '1px solid black'
    }
    
    return (
        <>
            <div className="part left" key="a" style={{ pointerEvents: 'none', border: '1px solid black' }}><LeftElements style={style} selection={selection} startYear={startYear} setStartYear={setStartYear} endYear={endYear} setEndYear={setEndYear} indicators={indicators} setIndicators={setIndicators} plotOptions={plotOptions} setPlotOptions={setPlotOptions} /></div>
            {(<div style={style} className="part middle" key="b" ><MiddleElements selection={selection} startYear={startYear} endYear={endYear} indicators={indicators} plotOptions={plotOptions} /></div>)}
            <div className="part right" key="c" style={{ border: '0px solid black' }}><RightElements map={map} setMap={setMap} overlay={overlay} setOverlay={setOverlay} /></div>
        </>
    )
}