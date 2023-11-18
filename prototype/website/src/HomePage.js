import "./styles/HomePage.css";
import Card from "react-bootstrap/Card";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import StaticMap from "./homepage-components/StaticMap";
import Graph from "./homepage-components/Graph";
import Timeline from "./homepage-components/Timeline"


const HomePage = () => {
  const [year, setYear] = useState('0')
  console.log(year)
  return (
    <div className="homepage">
      <InformationOverlay />
      <GraphsOverlay year={year} />
      <Link to='\web'>
        <div className="logo">
          Hyde Portal
          <StaticMap width={400} height={200} mapId={2} />
        </div>
      </Link>
      <div className="timeline-overlay">
        <Timeline year={year} setYear={setYear} />
      </div>
    </div>
  );
};

const GraphsOverlay = ({ year }) => {
  return (
    <div className="graphs-overlay">
      <Card>
        <Card.Header>Timeseries Example</Card.Header>
        <Card.Body>
          <Graph year={year} />
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Map Example</Card.Header>
        <Card.Body>
          <Card.Text>
            {/* <StaticMap year={year} width={250} height={200} mapId={1} netCDF={true} /> */}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

const InformationOverlay = () => {
  return (
    <div className="information-overlay">
      <Card bg="primary" text="white" className="information-card">
        <Card.Body>
          <h1>Hyde Portal</h1>
          <p>Through this portal, the information from the HYDE Model can be visualized and extracted. <br/>
          Specifically, a user can do the following:
          <ul>
            <li>Investigate a global map</li>
            <li>Request txt data</li>
          </ul>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default HomePage;
