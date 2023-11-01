import { React, useEffect, useRef, useState } from 'react'

import '../styles/Page.css'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import TimeseriesForm from './page-components/TimeseriesForm';
import Selection from './page-components/Selection';
import Charts from './page-components/Charts';
import OverlayForm from './page-components/OverlayForm';
import Legend from './page-components/Legend'
import Attributions from './page-components/Attributions'

export default function Page({ map, setMap, selection, setSelection, overlay, setOverlay }) {
    const [startYear, setStartYear] = useState('ce_1930')
    const [endYear, setEndYear] = useState('ce_1953')
    const [tsIndicators, setTsIndicators] = useState([])
    const [ovIndicator, setOvIndicator] = useState(null)
    const [currentYear, setCurrentYear] = useState('ce_0')
    // use a dictionary since if now change plotting to the same value 'true' rerender page
    const [plotOptions, setPlotOptions] = useState({
        plotting: false,
        absolute: false,
        combine: false
    })

    return (
        <>
            <div style={{ position: 'fixed', top: 0, margin: 5, backgroundColor: 'white' }}>
                <Tabs transition={false} style={{ fontWeight: 'bold' }}>
                    <Tab eventKey="selection" title="Selected Countries">
                        <Selection selection={selection} setSelection={setSelection}/>
                    </Tab>
                    <Tab eventKey="tsForm" title="Timeseries">
                        <TimeseriesForm startYear={startYear} endYear={endYear} setStartYear={setStartYear} setEndYear={setEndYear} setTsIndicators={setTsIndicators} plotOptions={plotOptions} setPlotOptions={setPlotOptions} />
                    </Tab>
                    <Tab eventKey="ovForm" title="Overlay">
                        <OverlayForm map={map} setMap={setMap} currentYear={currentYear} setCurrentYear={setCurrentYear} ovIndicator={ovIndicator} setOvIndicator={setOvIndicator} overlay={overlay} setOverlay={setOverlay} />
                    </Tab>
                </Tabs>
            </div>

            <div style={{ position: 'fixed', bottom: 0 }}>
                <Charts selection={selection} startYear={startYear} endYear={endYear} tsIndicators={tsIndicators} plotOptions={plotOptions} setPlotOptions={setPlotOptions} />
            </div>

            <div style={{ position: 'fixed', right: 0, top: 0, margin: 5 }}>
                <Legend currentYear={currentYear} ovIndicator={ovIndicator} />
            </div>

            <div style={{ position: 'fixed', right: 0, bottom: 0 }}>
                <Attributions />
            </div>
        </>
    )
}