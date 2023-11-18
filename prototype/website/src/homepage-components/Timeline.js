import Accordion from 'react-bootstrap/Accordion';

export default function Timeline({ }) {
    const eraStyle = { border: 'solid', flex: 1, flexDirection: 'column-reverse' }

    return (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', display: "flex", gap: 10, border: "solid", alignContent: 'stretch' }}>
            div
            <Accordion style={eraStyle}>
                <Accordion.Item style={{flexDirection: 'column-reverse'}}>
                    <Accordion.Header>Accordion Item 1</Accordion.Header>
                    <Accordion.Body>Hier dan allemaal informatie</Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion style={eraStyle}>
                <Accordion.Item style={eraStyle}>
                    <Accordion.Header>Accordion Item 2</Accordion.Header>
                    <Accordion.Body>Hier dan allemaal informatie</Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}