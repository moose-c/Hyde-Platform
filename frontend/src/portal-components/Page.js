import { React, useState } from 'react'

import '../styles/Page.css'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import TimeseriesForm from './page-components/TimeseriesForm';
import Selection from './page-components/Selection';
import Charts from './page-components/Charts';
import OverlayForm from './page-components/OverlayForm';
import Legend from './page-components/Legend'
import Attributions from './page-components/Attributions'

export default function Page({ map, setMap, setCurrentlySelecting, selection, setSelection, ovIndicator, setOvIndicator, currentYear, setCurrentYear, setPopoverInfo }) {
    const [startYear, setStartYear] = useState('bce_10000')
    const [endYear, setEndYear] = useState(`ce_${process.env.REACT_APP_END_YEAR}`)
    const [tsIndicators, setTsIndicators] = useState([])
    // Plot options for charts
    // use a dictionary since if now change plotting to the same value 'true' rerender page
    const [plotOptions, setPlotOptions] = useState({
        plotting: false,
        absolute: true,
        combinedCountries: false,
        combinedIndicators: false
    })

    return (
        <>
            <div style={{ position: 'fixed', top: 0, backgroundColor: 'white' }}>
                {/* The first two tabs are for selecting countries, the last is for laying raster over the map. This changes regime according to which tab is selected */}
                {<Tabs transition={false} style={{ fontWeight: 'bold' }} onSelect={(e) => { if (e === 'mapsForm') { setCurrentlySelecting(false) } else { setCurrentlySelecting(true) } }}>
                    <Tab eventKey="selection" title="Selected Countries" >
                        <Selection selection={selection} setSelection={setSelection} />
                    </Tab>
                    <Tab eventKey="tsForm" title="Timeseries">
                        <TimeseriesForm startYear={startYear} endYear={endYear} setStartYear={setStartYear} setEndYear={setEndYear} setTsIndicators={setTsIndicators} setPlotOptions={setPlotOptions} />
                    </Tab>
                    <Tab eventKey="mapsForm" title="Maps">
                        <OverlayForm map={map} setMap={setMap} currentYear={currentYear} setCurrentYear={setCurrentYear} ovIndicator={ovIndicator} setOvIndicator={setOvIndicator} setPopoverInfo={setPopoverInfo}/>
                    </Tab>
                </Tabs>}
            </div>

            <div style={{ position: 'fixed', bottom: 0, left: 0 }}>
                <Charts selection={selection} startYear={startYear} endYear={endYear} tsIndicators={tsIndicators} plotOptions={plotOptions} setPlotOptions={setPlotOptions} />
            </div>

            <div style={{ position: 'fixed', right: 0, top: 0 }}>
                <Legend currentYear={currentYear} ovIndicator={ovIndicator} />
            </div>

            <div style={{ position: 'fixed', right: 0, bottom: 0 }}>
                <Attributions />
            </div>
        </>
    )
}