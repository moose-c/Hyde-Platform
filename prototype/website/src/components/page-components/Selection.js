import { React, useState, useEffect } from "react"
import ListGroup from "react-bootstrap/ListGroup"

export default function Selection({ selection }) {
    let [countryList, setCountryList] = useState([])
    useEffect(() => {
        setCountryList(selection.map((feature, count) => {
            return (
                <ListGroup.Item key={`country ${count}`}>
                    {feature.values_.ADMIN}
                </ListGroup.Item>
            )
        }))
    }, [selection])
    return (
        <>
            {/* <p style={{ fontWeight: 'bold' }}>Selected Countries</p> */}
            <ListGroup variant="flush" style={{ display: 'inline' }}>{countryList}</ListGroup>
        </>
    )
}
