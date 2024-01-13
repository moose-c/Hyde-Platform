import { indicatorTxtObj, yearsObject } from "../../util/createData"

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { React, useEffect, useRef } from "react";

import Select from "react-select"

export default function TimeseriesForm({ startYear, setStartYear, endYear, setEndYear, setTsIndicators, plotOptions, setPlotOptions }) {
    /* Form to request timeseries. */
    const optionsYears = Object.entries(yearsObject).map(([key, value]) => (
        { value: key, label: value }
    ))
    const optionsStartYear = useRef(JSON.parse(JSON.stringify(optionsYears)))
    const optionsEndYear = useRef(JSON.parse(JSON.stringify(optionsYears)))

    // create options object for the indicators
    const optionsIndicators = Object.entries(indicatorTxtObj).map(([category, categorizedIndicators]) => ({
        label: category,
        options: Object.entries(categorizedIndicators).map(([indicatorValue, indicatorName]) => ({
            value: indicatorValue,
            label: indicatorName
        }))
    }))

    // Modify the options such that endYear >= startYear
    useEffect(() => {
        for (let i = 0; i < Object.keys(yearsObject).indexOf(startYear); i++) {
            optionsEndYear.current[i].isDisabled = true
        }
    }, [startYear])

    useEffect(() => {
        for (let i = Object.keys(yearsObject).indexOf(endYear)+1; i < Object.keys(yearsObject).length; i++) {
            optionsStartYear.current[i].isDisabled = true
        }
    }, [endYear])
    
    return (
        <>
            <Form>
                <Row>
                    <Col>
                        <Form.Label> Start year
                            <Select maxMenuHeight={200} required options={optionsStartYear.current} value={optionsStartYear.current[Object.keys(yearsObject).indexOf(startYear)]} onChange={(e) => setStartYear(e.value)} />
                        </Form.Label>
                    </Col>
                    <Col>
                        <Form.Label> End year
                            <Select maxMenuHeight={200} required options={optionsEndYear.current} value={optionsEndYear.current[Object.keys(yearsObject).indexOf(endYear)]} onChange={(e) => setEndYear(e.value)} />
                        </Form.Label>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Form.Label> Indicators
                        <div style={{ width: '250px', margin: '0 auto' }}>
                            <Select menuPortalTarget={document.body} maxMenuHeight={250} isMulti height='300' closeMenuOnSelect={false} options={optionsIndicators} placeholder="None Selected" required onChange={(e) => setTsIndicators(e.map((input) => input.value))} />
                        </div>
                    </Form.Label>
                </Row>
                <Row className="justify-content-center">
                    <Button style={{ width: 200 }} variant="primary" onClick={() => setPlotOptions(prevOptions => ({ ...prevOptions, plotting: !prevOptions.plotting }))}>Request Figures</Button>
                </Row>
            </Form>
        </>
    )
}