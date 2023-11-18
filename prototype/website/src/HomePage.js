import "./styles/HomePage.css";
import Card from "react-bootstrap/Card";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import StaticMap from "./homepage-components/StaticMap";
import Graph from "./homepage-components/Graph";
import Timeline from "./homepage-components/Timeline"


const HomePage = () => {
  const [currentYear, setCurrentYear] = useState(0)
  const [roundedYear, setRoundedYear] = useState(0)
  useState(() => {
    newRoundedYear = roundYear(currentYear)
    if (rounded)
  },[year])
  return (
    <div className="homepage">
      <div className="top-section">
        <div className="jumbotron bg-primary text-white">
          <h1>Hyde Portal</h1>
          <p>
            Through this portal, data from the <strong>HYDE model</strong> can be accessed <br />
            The HYDE model is a mathematical model calculating change in <strong>Demographic</strong>, <strong>Land Use</strong> and <strong>Agricultural</strong> indicators, starting from the rise of humanity in 10000 B.C. <br />
            These indicators are calculated within each of the current national borders, and within 30kmx30km pixels for the globe.
          </p>
          <h4>1) Country Information </h4>
          <p></p>
          <h4>2) Spatial Information </h4>
          <p></p>
          <Link to="/map">
            <h1 style={{ color: "black", fontWeight: 400 }}>Go to HYDE Portal</h1>
            <StaticMap />
          </Link>
        </div>
      </div>
      <div className="infosectin"></div>
      {/* <InformationOverlay /> */}
      <GraphsOverlay currentYear={currentYear}/>
      {/* <div className="logo"> */}
      {/* Hyde Portal */}
      {/* <StaticMap /> */}
      {/* </div> */}
      <div className="timeline-overlay">
        <Timeline currentYear={currentYear} setCurrentYear={setCurrentYear} />
      </div>
    </div >
  );
};

const GraphsOverlay = ({ currentYear }) => {
  return (
    <div className="graphs-overlay">
      <Card>
        <Card.Header>Timeseries Example</Card.Header>
        <Card.Body>
          <Graph currentYear={currentYear} />
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
          <p>Through this portal, the information from the HYDE Model can be visualized and extracted. <br />
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
