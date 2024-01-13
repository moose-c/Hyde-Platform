import { React, useState, useEffect } from "react"
import ListGroup from "react-bootstrap/ListGroup"

export default function Selection({ selection, setSelection }) {
    /* Dynamicly showing the currently selected countries.
    POI: Users can click the X to remove a country from the list, AND the map.*/
    let [countryList, setCountryList] = useState([])
    useEffect(() => {
        setCountryList(selection.map((feature, count) => {
            return (
                <ListGroup.Item key={`country ${count}`}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {feature.values_.ADMIN} <span style={{ cursor: "pointer" }} onClick={() => setSelection(oldSelection => {
                            feature.setStyle(undefined)
                            return oldSelection.filter(item => item.ol_uid !== feature.ol_uid);
                        })}>X</span>
                    </div>
                </ListGroup.Item>
            )
        }))
    }, [selection, setSelection])
    return (
        <>
            <ListGroup variant="flush" style={{ display: 'inline' }}>{countryList}</ListGroup>
        </>
    )
}
