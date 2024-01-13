import { React, useEffect, useRef, useState } from "react"
import { rangeValues, styleValues } from "../../util/createData"  /* as ind.type : {ind -> Indicator Name} */


export default function Legend({ currentYear, ovIndicator }) {
    /* Creates the Legend within the top right corner. 
    Makes use of ncWMS.
    Different values and colours based on certain hardcoded indicators.*/
    const [legend, setLegend] = useState(null)
    var year = currentYear.split('_')[0] === 'ce' ? '' : '-'
    year += `${currentYear.split('_')[1]}`
    const style = ['population', 'population_density', 'urban_population', 'rural_population'].includes(ovIndicator) ? styleValues['pop'] : styleValues['lu']
    const range = ['population', 'urban_population', 'rural_population'].includes(ovIndicator) ? rangeValues['popAbs'] : 'population_density' === ovIndicator ? rangeValues['popDens'] : rangeValues['lu']  
    const scale = useRef()

    useEffect(() => {
        if (ovIndicator !== null ) {
            if ('population_density' === ovIndicator) {
                scale.current = '[inh/km2'
            } else if (['population', 'urban_population', 'rural_population'].includes(ovIndicator)) {
                scale.current = '[inh'
            } else {
                scale.current = '[km2'
            }
            scale.current += '/cell]'
            var domainName = window.apiUrl === '' ? window.apiUrl  : `${window.apiUrl}:8080`
            const legendUrl = `${domainName}/ncWMS/wms?REQUEST=GetLegendGraphic&VERSION=1.3.0
                &COLORBARONLY=TRUE
                &HEIGHT=200&WIDTH=50
                &COLORSCALERANGE=${range}
                &PALETTE=${style}
                &NUMCOLORBANDS=8
                `
                fetch(legendUrl)
                    .then(response => response.blob())
                    .then(blob => {
                        const legendFigure = URL.createObjectURL(blob)
                        setLegend(legendFigure)
                    })
            }
        else {
            scale.current = null
            setLegend(null)
        } // eslint-disable-next-line
    }, [currentYear, ovIndicator])

    return (<>
        {legend && <>
            <div style={{ width: 70, fontWeight: 'bold', backgroundColor: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div>
                    <span>{range.split(',')[1]}</span>
                    <img src={legend} alt="Legend" />
                    <span>{range.split(',')[0]}</span>
                </div>
                {/* scale potitioning is not correct yet */}
                <span style={{ transform: 'rotate(90deg)', transformOrigin: 'bottom left', whiteSpace: 'nowrap' }}>{scale.current}</span>
            </div></>}
    </>)

}