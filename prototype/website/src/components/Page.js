import { useState } from 'react'
import GridLayout from 'react-grid-layout'

import '../styles/Page.css'

import LeftElements from './LeftElements'
import MiddleElements from './MiddleElements'
import RightElements from './RightElements'

export default function Page({selection, overlay, onOverlay}) {
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

    const layout = [
        { i: "a", x: 0, y: 0, w: 1.5, h: 2, static: true },
        { i: "b", x: 2, y: 0, w: 5, h: 4, static: true },
        { i: "c", x: 8, y: 0, w: 1, h: 2, static: true }
    ];
    return (
        <GridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={10}
            width={1200}
        >
            <div className="part left" key="a" style={{border: '0px solid black'}}><LeftElements style={style} selection={selection} startYear={startYear} setStartYear={setStartYear} endYear={endYear} setEndYear={setEndYear} indicators={indicators} setIndicators={setIndicators} plotOptions={plotOptions} setPlotOptions={setPlotOptions}/></div>
            {(<div style={style} className="part middle" key="b" ><MiddleElements selection={selection} startYear={startYear} endYear={endYear} indicators={indicators} plotOptions={plotOptions}/></div>)}
            <div className="part right" key="c" style={{border: '2px solid black'}}><RightElements /></div>
        </GridLayout>
    )
}