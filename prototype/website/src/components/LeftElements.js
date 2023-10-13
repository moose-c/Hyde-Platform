import { useEffect, useState } from "react"
import { indicatorTxtObj, years } from "./utilities/create_data"

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import Select from "react-select"


export default function LeftElements({ selection, startYear, setStartYear, endYear, setEndYear, indicators, setIndicators, plotOptions, setPlotOptions }) {
    const [displayForm, setDisplayForm] = useState(false)

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ alignSelf: 'flex-end', border: '0px solid black', width: '230px' }}>
                    <Button style={{ pointerEvents: 'auto' }} variant="primary" onClick={() => setDisplayForm(!displayForm)}>
                        Plot Timeseries
                    </Button>
                    <div style={{ pointerEvents: 'auto', display: displayForm ? 'block' : 'none' }}>
                        <TimeseriesForm startYear={startYear} setStartYear={setStartYear} endYear={endYear} setEndYear={setEndYear} indicators={indicators} setIndicators={setIndicators} plotOptions={plotOptions} setPlotOptions={setPlotOptions} />
                    </div>
                </div>
                <div style={{ alignSelf: 'flex-end', width: '120px', margin: '5px', padding: '5px' }}>   {/* width chosen such that Selected countries on 1 line */}
                    <p style={{ fontWeight: 'bold' }}>Selected Countries</p>
                    <Selection selection={selection} />
                </div>
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
                <ListGroup.Item key={`country ${count}`}>
                    {feature.values_.name}
                </ListGroup.Item>
            )
        }))
    }, [selection])
    return (
        <>
            <ListGroup variant="flush" style={{ display: 'inline' }}>{countryList}</ListGroup>
        </>
    )
}

function TimeseriesForm({ startYear, setStartYear, endYear, setEndYear, indicators, setIndicators, plotOptions, setPlotOptions }) {
    const optionsYears = Object.entries(years).map(([key, value]) => (
        { value: key, label: value }
    ))

    const optionsIndicators = Object.entries(indicatorTxtObj).map(([category, categorizedIndicators]) => ({
        label: category,
        options: Object.entries(categorizedIndicators).map(([indicatorValue, indicatorName]) => ({
            value: indicatorValue,
            label: indicatorName
        }))
    }))

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
            <Form>
                <Row>
                    <Col>
                        <Form.Label> Start year
                            <Select required options={optionsYears} defaultValue={{ value: startYear, label: years[startYear] }} onChange={(e) => setStartYear(e.value)} />
                        </Form.Label>
                    </Col>
                    <Col>
                        <Form.Label> End year
                            <Select required options={optionsYears} defaultValue={{ value: endYear, label: years[endYear] }} onChange={(e) => setEndYear(e.value)} />
                        </Form.Label>
                    </Col>
                </Row>
                <Row>
                    <Form.Label> Indicators
                        <Select isMulti menuPlacement="top" closeMenuOnSelect={false} options={optionsIndicators} placeholder="None Selected" required onClick={(e) => handleSelection(e.target.value)} />
                    </Form.Label>
                </Row>

                <Button variant="primary" onClick={() => setPlotOptions({ ...plotOptions, plotting: true })}>Request Figures</Button>
                <br />
                <Form.Label> Change X-axis    
                    <ToggleButtonGroup type="radio" name="xAxis" defaultValue={1} onChange={() => setPlotOptions({ ...plotOptions, absolute: !plotOptions.absolute })}>
                        <ToggleButton id="tbg-radio-1" value={1}>Relative</ToggleButton>
                        <ToggleButton id="tbg-radio-2" value={2}>Absolute</ToggleButton>
                    </ToggleButtonGroup>
                </Form.Label>
                <Form.Label> Change Graphs 
                <ToggleButtonGroup type="radio" name="xAxis" defaultValue={1} onChange={() => setPlotOptions({ ...plotOptions, combined: !plotOptions.combined })}>
                        <ToggleButton id="tbg-radio-1" value={1}>Seperate</ToggleButton>
                        <ToggleButton id="tbg-radio-2" value={2}>Combined</ToggleButton>
                    </ToggleButtonGroup>
                </Form.Label>
            </Form>
        </>
    )
}