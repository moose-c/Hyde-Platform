import { useState } from "react"

export default function Legend({ }) {
    const [legend, setLegend] = useState(null)

    fetch(`http://localhost:8080/ncWMS2/wms?REQUEST=GetLegendGraphic&VERSION=1.3.0
                            &LAYERS=${window.layerName}&COLORBARONLY=FALSE
                            &STYLES=default-scalar/${style}&HEIGHT=200&WIDTH=50
                            &COLORSCALERANGE=${minmax.min},${minmax.max}`)
        .then(response => response.blob())
        .then(blob => {
            const legendUrl = URL.createObjectURL(blob)
            setLegend(legendUrl)
        })

    return (<>
        {legend && <img src={legend} alt="Legend" />}
    </>)

}