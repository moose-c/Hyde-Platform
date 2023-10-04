import TimeseriesForm from './TimeseriesForm'

import { useEffect, useState } from "react"

export default function LeftElements({ selection }) {
    return (
        <>
            <div>
                <Selection selection={selection} />
                <button onClick={displayFom}>
                    Display Timeseries Plotting Form
                </button>
            </div>
            <div>
                <TimeseriesForm />
                <label>
                    <input type="checkbox" id="x-axis" />
                    <span id="relative">Relative</span>/<span id="absolute">Absolute</span>{" "}
                    scale
                </label>
                <br />
                <label>
                    <input type="checkbox" id="combine" />
                    <span id="seperate">Seperate</span>/<span id="combined">Combined</span>{" "}
                    figure
                </label>
            </div>
        </>
    )
}

function displayFom() {
    
}

function Selection({ selection }) {
    let [countryList, setCountryList] = useState([])
    useEffect(() => {
        setCountryList(selection.map((feature, count) => {
            return (
                <li key={`country ${count}`}>
                    {feature.values_.name}
                </li>
            )
        }))
    }, [selection])
    return (
        <>
            <ol>{countryList}</ol>
        </>
    )
}