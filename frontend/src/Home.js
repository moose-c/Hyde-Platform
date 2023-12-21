/* Homepage of the HYDE portal.
Components used by this Homepage are stored within `homepage-components` folder */
import "./styles/HomePage.scss";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import HomeMap from "./home-components/HomeMap";
import Graph from "./home-components/Graph";
import Timeline from "./home-components/Timeline";
import Table from "./home-components/Table";

import { yearIndexToYear } from "./util/yearIndexToYear";
import { timelineObjects } from "./util/timelineObjects";
import { roundYear } from "./util/roundYear";
import opaqueColor from "./util/opaqueColor";

const ChevronDown = () => {
  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAVdJREFUaEPtll0SwjAIhOnN9GTqyfRomoc4mZg/lkXbkT51pgndjyWBTQ7+bAfXLwHwawfDgXDAmIEoIWMCzdvDAXMKjQH+3oGTiDyMSTTFsDhwFZGLiNxeAOkdecwxUID84ywagWDEgIa5ZPm9kW4NRC0+hztrS5LlgMaJnnhNAt75QwFSAEQIsmd4tiwAWgi6+CTACrAK4SKeBTCDSN/TdVs/UM3XQRgO5Ji9LLdqmCKe4UDdRVcgavG768QjiFr8bjtxC6InXtNDPsoROQOrnbiEmInfbSfOQ1457FGvVMSB2a0zumGo4hm3kEaQZu3yaG5xQOOEi3iGAysQ0YlH9cQooTI+0omX6721kA0wGuzSN9oMlGE8AHoQdPHMQ9xyd9SJTWVTbvZyoLydsiM00d8EcBEdAO5pVfzA+wwopGBLAwDLG29XOMDLJRYpHMDyxtt1eAeeL3ZYMXLKSvQAAAAASUVORK5CYII=" />;
};

export default function Home() {
  /* The year 10000 bc is assigned 0, and start increasing from there  */
  const [currentYear, setCurrentYear] = useState(11500);
  return (
    /* Homepage, consisting of top part, and timeline at the bottom. The top consists of a jumbotron (left) and an infosection (right) */
    <div className="homepage">
      <Jumbotron />
      <InfoSection currentYear={currentYear} setCurrentYear={setCurrentYear} />
    </div>
  );
}

const Jumbotron = () => {
  return (
    <div className="jumbotron">
      <div className="content">
        <div className="left-content">
          <h1>Hyde Portal</h1>
          <p>
            Through this portal, data from the <strong>Hyde model</strong> can
            be accessed. The HYDE model is a mathematical model created by
            Utrecht University, that calculates change in{" "}
            <strong>demographic</strong>, <strong>land use</strong> and{" "}
            <strong>agricultural</strong> indicators, starting from the rise of
            humanity in 10000 B.C. untril our current time. These indicators are
            calculated within each of the current national borders, generating
            timeseries and within 30kmx30km pixels for the globe generating
            maps.
          </p>
          <p>
            We have created a <strong>timeline</strong> showing an example of
            what can be done with the Hyde model. This tiemline can be found at
            the bottom of this page. The timeline shows the change in{" "}
            <strong>cropland area</strong> and <strong>population</strong> over
            time.
          </p>
          <p>
            If you want to explore the data yourself you can directly go to the{" "}
            <strong>Hyde portal</strong> by clicking on the globe on the right
            or by clicking <Link to="/portal">this link</Link>.
          </p>
          <h4> Repository </h4>
          The github repository can be entered{" "}
          <a href="https://github.com/UtrechtUniversity/Hyde-Platform">here</a>.
          This includes a booklet on how one can create such a webapplication
          themselves.
        </div>
        <div className="right-content">
          <div className="hydeportal-wrapper relative">
            {/* Link from react-router-dom, allows changing webpages  */}
            <Link to="/portal">
              <div className="hydeportal-globe">
                <img src="hyde-portal.png" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="call-to-scroll">
        go to the Hyde timeline
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path d="m12 15.586-4.293-4.293-1.414 1.414L12 18.414l5.707-5.707-1.414-1.414z"></path>
          <path d="m17.707 7.707-1.414-1.414L12 10.586 7.707 6.293 6.293 7.707 12 13.414z"></path>
        </svg>
      </div>
    </div>
  );
};

const InfoSection = ({ currentYear, setCurrentYear }) => {
  const [roundedYear, setRoundedYear] = useState(1500);
  const [previousYear, setPreviousYear] = useState(null);
  /* From this infosection we want the HomeMap to update after the slides has arived at it's final location, 
  since requesting it during the sliding process for each change in current Year is to memory intensive.
  For this reason, a variables previousYear is created which is equal to value of the currentYear a small time ago.
  If this is equal to currentYear, the sliding is stopped, and the HomeMap is updated. */
  useEffect(() => {
    const updatePreviousYear = () => {
      setPreviousYear(currentYear);
    };
    const timeout = setTimeout(updatePreviousYear, 100);
    return () => clearTimeout(timeout);
  }, [currentYear]);

  useEffect(() => {
    if (currentYear === previousYear) {
      setRoundedYear(roundYear(currentYear));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousYear]);

  /* The code is finding the timeline object whose end year is greater than or equal to the current year. */
  const currentTimeLineObject = timelineObjects.find(
    (timelineObject) => timelineObject.endYear >= currentYear
  );
  return (
    <div className="infosection-wrapper">
      <div className="infosection-top-content">
        <div className="infosection-text">
          <div className="infosection-title">
            <div>
              <h1 style={{ color: currentTimeLineObject.color }}>
                {currentTimeLineObject.title}
              </h1>
              <h3 style={{ fontWeight: 300 }}>
                {yearIndexToYear(currentYear)}
              </h3>
            </div>
            <Link to="/portal">
              <button className="explore-button">
                Click here to explore the Hyde portal!
              </button>
            </Link>
          </div>

          <div className="textMapCombo" style={{ display: "flex", gap: 20 }}>
            <div
              className="periodText"
              style={{
                backgroundColor: opaqueColor(currentTimeLineObject.color, 0.2),
              }}
            >
              {currentTimeLineObject.periodText}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h4>Cropland Area</h4>
              <HomeMap
                roundedYear={roundedYear}
                mapId={2}
                netCDF={true}
                width={600}
                height={400}
              />
              {/* <Table roundedYear={roundYear(currentYear)} /> */}
            </div>
          </div>
        </div>
        <div className="infosection-graph">
          <Graph roundedYear={roundYear(currentYear)} />
        </div>
      </div>
      <div className="timeline-overlay">
        <Timeline currentYear={currentYear} setCurrentYear={setCurrentYear} />
      </div>
    </div>
  );
};
