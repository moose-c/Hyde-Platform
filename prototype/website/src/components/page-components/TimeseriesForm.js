import { useState } from "react"
import { indicatorTxtObj, years } from "../utilities/createData"

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormLabel from 'react-bootstrap/FormLabel'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

import Select from "react-select"

export default function TimeseriesForm({ startYear, setStartYear, endYear, setEndYear, setIndicators, plotOptions, setPlotOptions }) {
    const [displayForm, setDisplayForm] = useState(false)

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

    return (
        <>
            <Button style={{ pointerEvents: 'auto' }} variant="primary" onClick={() => setDisplayForm(!displayForm)}>
                Plot Timeseries
            </Button>
            <Form>
                <Row>
                    <Col>
                        <Form.Label> Start year
                            <Select maxMenuHeight={200} required options={optionsYears} defaultValue={{ value: startYear, label: years[startYear] }} onChange={(e) => setStartYear(e.value)} />
                        </Form.Label>
                    </Col>
                    <Col>
                        <Form.Label> End year
                            <Select maxMenuHeight={200} required options={optionsYears} defaultValue={{ value: endYear, label: years[endYear] }} onChange={(e) => setEndYear(e.value)} />
                        </Form.Label>
                    </Col>
                </Row>
                <Row>
                    <Form.Label> Indicators
                        <Select maxMenuHeight={250} isMulti closeMenuOnSelect={false} options={optionsIndicators} placeholder="None Selected" required onChange={(e) => setIndicators(e.map((input) => input.value))} />
                    </Form.Label>
                </Row>
                <Button variant="primary" onClick={() => setPlotOptions({ ...plotOptions, plotting: true })}>Request Figures</Button>
                <br />
                <Form.Label> Change X-axis
                    <ToggleButtonGroup type="radio" name="xAxis" defaultValue={1} onChange={() => setPlotOptions({ ...plotOptions, absolute: !plotOptions.absolute })}>
                        <ToggleButton size="sm" id="tbg-axis-1" value={1}>Relative</ToggleButton>
                        <ToggleButton size="sm" id="tbg-axis-2" value={2}>Absolute</ToggleButton>
                    </ToggleButtonGroup>
                </Form.Label>
                <br />
                <Form.Label> Change Graphs
                    <ToggleButtonGroup type="radio" name="figures" defaultValue={1} onChange={() => setPlotOptions({ ...plotOptions, combined: !plotOptions.combined })}>
                        <ToggleButton size="sm" id="tbg-figures-1" value={1}>Seperate</ToggleButton>
                        <ToggleButton size="sm" id="tbg-figures-2" value={2}>Combined</ToggleButton>
                    </ToggleButtonGroup>
                </Form.Label>
            </Form>
        </>
    )
}