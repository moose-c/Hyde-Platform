import { React, useState, useEffect } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"

export default function Selection({ selection, setSelection }) {
    let [countryList, setCountryList] = useState([])
    useEffect(() => {
        setCountryList(selection.map((feature, count) => {
            console.log(feature)
            return (
                <ListGroup.Item key={`country ${count}`}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        {feature.values_.ADMIN} <span style={{cursor: "pointer"}} onClick={() => setSelection(oldSelection => oldSelection.filter(item => item.ol_uid !== feature.ol_uid))}>X</span>
                    </div>
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
