import { useEffect, useState } from "react"
import { indicatorsObj, years } from "../utilities/create_data"


export default function LeftElements({ selection, startYear, setStartYear, endYear, setEndYear, indicators, setIndicators, plotting, setPlotting, plotOptions, setPlotOptions }) {
    const [displayForm, setDisplayForm] = useState(false)

    var style = { display: "none" }
    if (displayForm) {
        style.display = "block"
    }
    return (
        <>
            <div>
                <Selection selection={selection} />
                <button onClick={() => setDisplayForm(!displayForm)}>
                    Display Plotting Form
                </button>
            </div>
            <div style={style}>
                <TimeseriesForm startYear={startYear} setStartYear={setStartYear} endYear={endYear} setEndYear={setEndYear} indicators={indicators} setIndicators={setIndicators} plotting={plotting} setPlotting={setPlotting} plotOptions={plotOptions} setPlotOptions={setPlotOptions} />
            </div>
        </>
    )
}

// Selection Component
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
            <ol style={{ display: 'inline' }}>{countryList}</ol>
        </>
    )
}

function TimeseriesForm({ startYear, setStartYear, endYear, setEndYear, indicators, setIndicators, plotting, setPlotting, plotOptions, setPlotOptions }) {
    // Utilities to change fontWeight on plotting options
    const boldStyle = { fontWeight: "bold" }
    function isBold(option) {
        if (option) {
            return boldStyle
        } else {
            return {}
        }
    }

    function handleSelection(newIndicator) {
        if (indicators.includes(newIndicator)) {
            const newindicators = indicators.slice(0)
            newindicators.splice(newindicators.indexOf(newIndicator), 1)
            setIndicators(newindicators)
        } else {
            setIndicators([...indicators, newIndicator])
        }
    }

    return (
        <>
            <form id="timeseries-form">
                <select multiple required onClick={(e) => handleSelection(e.target.value)}>
                    <optgroup label="Demographics">{
                        Object.entries(indicatorsObj.demographic).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}</optgroup>
                    <optgroup label="Land Use">{
                        Object.entries(indicatorsObj.landUse).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}</optgroup>
                    <optgroup label="Agricultural">{
                        Object.entries(indicatorsObj.agricultural).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}</optgroup>
                </select>
                <p>Hold Ctrl (windows) or Command (Mac) to select multiple indicators.</p>
                {/* Maybe the above values display when hover over select? Chatgpt had implementation ideas */}
                <label> Select start year:
                    <select required value={startYear} onChange={(e) => setStartYear(e.target.value)}>
                        {Object.entries(years).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </select>
                </label><br />
                <label> Select end year:
                    <select required value={endYear} onChange={(e) => setEndYear(e.target.value)}>
                        {Object.entries(years).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </select><br /> <br/>
                </label>
                <button onClick={(e) => {e.preventDefault(); setPlotOptions({...plotOptions, plotting: true});}}>Request Figures</button>
            </form>
            <div>
                <label> {/* Checkbox, if selected change value of the relevant plotting option */}
                    <input type="checkbox" onChange={() => setPlotOptions({...plotOptions, absolute: !plotOptions.absolute})} />
                    {/* And colour the option currently selected */}
                    <span style={isBold(!plotOptions.absolute)}>Relative</span>/<span style={isBold(plotOptions.absolute)}>Absolute</span> scale
                </label>
                <br />
                <label>   {/* Checkbox, if selected change value of the relevant plotting option */}
                    <input type="checkbox" onChange={() => setPlotOptions({...plotOptions, combined: !plotOptions.combined})} />
                    {/* And colour the option currently selected */}
                    <span style={isBold(!plotOptions.combined)}>Seperate</span>/<span style={isBold(plotOptions.combined)}>Combined</span> figure
                </label>
            </div>
        </>
    )
}