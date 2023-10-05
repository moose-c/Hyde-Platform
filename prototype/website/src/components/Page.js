import { useState } from 'react'
import GridLayout from 'react-grid-layout'

import '../styles/Page.css'

import LeftElements from './left/LeftElements'
import MiddleElements from './MiddleElements'
import RightElements from './right/RightElements'
import { none } from 'ol/centerconstraint'


export default function Page({selection, overlay, onOverlay}) {
    const [startYear, setStartYear] = useState('bce_10000')
    const [endYear, setEndYear] = useState('ce_2017')
    const [indicators, setIndicators] = useState([])
    const [plotting, setPlotting] = useState(false)
    const [plotOptions, setPlotOptions] = useState({
        absolute: false,
        combine: false
    })
    
    const plottingStyle = {display: none, border: '2px solid black'}
    if (plotting) {
        plottingStyle.display = 'block'
    }

    const layout = [
        { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
        { i: "b", x: 1, y: 0, w: 3, h: 2, static: false },
        { i: "c", x: 4, y: 0, w: 1, h: 2, static: false }
    ];
    return (
        <GridLayout
            className="layout"
            layout={layout}
            autoSize={true}
            cols={12}
            rowHeight={10}
            width={1200}
        >
            <div className="left" key="a" style={{border: '0px solid black'}}><LeftElements selection={selection} startYear={startYear} setStartYear={setStartYear} endYear={endYear} setEndYear={setEndYear} indicators={indicators} setIndicators={setIndicators} plotting={plotting} setPlotting={setPlotting} plotOptions={plotOptions} setPlotOptions={setPlotOptions}/></div>
            <div className="middle" key="b" style={plottingStyle}><MiddleElements selection={selection} startYear={startYear} endYear={endYear} indicators={indicators} plotOptions={plotOptions}/></div>
            <div className="right" key="c" style={{border: '2px solid black'}}><RightElements /></div>
        </GridLayout>
    )
}