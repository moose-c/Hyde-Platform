import "./styles/HomePage.css";
import Card from "react-bootstrap/Card";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import StaticMap from "./homepage-components/StaticMap";
import Graph from "./homepage-components/Graph";
import Timeline from "./homepage-components/Timeline";
import { yearIndexToYear } from "./util/yearIndexToYear";
import { timelineObjects } from "./data/timelineObjects";

function roundYear(year) {
  return 0;
}

const HomePage = () => {
  const [currentYear, setCurrentYear] = useState(11500);
  const [roundedYear, setRoundedYear] = useState(11500);
  useState(() => {
    const newRoundedYear = roundYear(currentYear);
    if (newRoundedYear !== roundedYear) {
    }
  }, [currentYear]);
  return (
    <div className="homepage">
      <div className="top-section">
        <div className="jumbotron bg-primary text-white">
          <h1>Hyde Portal</h1>
          <p>
            Through this portal, data from the <strong>HYDE model</strong> can
            be accessed <br />
            The HYDE model is a mathematical model calculating change in{" "}
            <strong>Demographic</strong>, <strong>Land Use</strong> and{" "}
            <strong>Agricultural</strong> indicators, starting from the rise of
            humanity in 10000 B.C. <br />
            These indicators are calculated within each of the current national
            borders, and within 30kmx30km pixels for the globe.
          </p>
          <h4>1). Country Information </h4>
          <p></p>
          <h4>2). Spatial Information </h4>
          <p></p>
          <Link to="/map">
            <h1 style={{ fontWeight: 400 }}>Go to HYDE Portal</h1>
            <div
              style={{
                width: "400px",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <StaticMap />
            </div>
          </Link>
        </div>
        <InfoSection currentYear={currentYear} />
      </div>
      <div className="timeline-overlay">
        <Timeline currentYear={currentYear} setCurrentYear={setCurrentYear} />
      </div>
    </div>
  );
};

const InfoSection = ({ currentYear }) => {
  const currentTimeLineObject = timelineObjects.find(
    (timelineObject) => timelineObject.endYear >= currentYear
  );

  return (
    <div className="infosection">
      <h1 style={{ color: currentTimeLineObject.color }}>
        {currentTimeLineObject.title}
      </h1>
      <h3 style={{ fontWeight: 300 }}>{yearIndexToYear(currentYear)}</h3>
      {currentTimeLineObject.periodText ? (
        currentTimeLineObject.periodText
      ) : (
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla</p>
      )}
    </div>
  );
};
export default HomePage;
