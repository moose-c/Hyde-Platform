import { useEffect, useRef, useState } from "react"
import { indicatorNcOrder } from "../utilities/createData"  /* as ind.type : {ind -> Indicator Name} */


export default function Legend({ currentYear, ovIndicator }) {
    const [legend, setLegend] = useState(null)

    const time = `${currentYear.split('_')[1]}-05-01`
    const style = 'seq-YlOrRd'
    const minmax = useRef()
    const scale = useRef()

    useEffect(() => {
        if (ovIndicator !== null) {
            
            if ('population_density' === ovIndicator) {
                scale.current = '[inh/km2'
            } else if (['population', 'urban_population', 'rural_population'].includes(ovIndicator)) {
                scale.current = '[inh'
            } else {
                scale.current = '[km2'
            }
            scale.current += '/cell]'
            fetch(`http://${window.apiUrl}:8080/ncWMS/wms?REQUEST=GetMetadata&ITEM=minmax&VERSION=1.3.0&STYLES=&CRS=CRS:84&WIDTH=1000&HEIGHT=900&BBOX=-180,-90,179.9,89.9&
            TIME=${time}&
            LAYERS=${indicatorNcOrder.indexOf(ovIndicator) + 1}/${ovIndicator}`)
                .then((response) => response.json())
                .then(respJs => {
                    minmax.current = respJs
                    const legendUrl = `http://${window.apiUrl}:8080/ncWMS/wms?REQUEST=GetLegendGraphic&VERSION=1.3.0
                    &COLORBARONLY=TRUE
                    &HEIGHT=200&WIDTH=50
                    &PALETTE=${style}
                    `
                    fetch(legendUrl)
                        .then(response => response.blob())
                        .then(blob => {
                            const legendFigure = URL.createObjectURL(blob)
                            setLegend(legendFigure)
                        })
                })
        } else {
            scale.current = null
            setLegend(null)
        } // eslint-disable-next-line
    }, [currentYear, ovIndicator])

    return (<>
        {legend && <>
            <div style={{ width: 70, fontWeight: 'bold', backgroundColor: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div>
                    <span>{minmax.current.max}</span>
                    <img src={legend} alt="Legend" />
                    <span>{minmax.current.min + 0.01}</span>
                </div>
                {/* scale potitioning is not correct yet */}
                <span style={{transform: 'rotate(90deg)', transformOrigin: 'bottom left', height: 100}}>{scale.current}</span>
            </div></>}
    </>)

}