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

export default function Home() {
  /* The year 10000 bc is assigned 0, and start increasing from there  */
  const [currentYear, setCurrentYear] = useState(11500);
  return (
    /* Homepage, consisting of top part, and timeline at the bottom. The top consists of a jumbotron (left) and an infosection (right) */
    <div className="homepage">
      <div className="top-section">
        <Jumbotron />
        <InfoSection currentYear={currentYear} />
      </div>
      <div className="timeline-overlay">
        <Timeline currentYear={currentYear} setCurrentYear={setCurrentYear} />
      </div>
    </div>
  );
}

const Jumbotron = () => {
  return (
    <div className="jumbotron bg-primary text-white">
      <h1 style={{ fontSize: 80 }}>Hyde Portal</h1>
      <p>
        Welcome to the HYDE model data and visualization portal. <br />
        The HYDE model offers data about the quantitative and spatial distribution of the human population,
        land use and agricultural practice (and more) over time, dating back from the first emergence of agriculture until now!
        To learn more about the model, click <a href="https://landuse.sites.uu.nl/hyde-project/">HERE</a>
        <br />
        In this portal you can interact with the model data through visualizations or download the data on your own computer to use as you wish.
        You may view these indicators within current national borders, generating time-series and generating global scale maps (5 arcmin ~9.21 x 9.21km spatial resolution).
        Enjoy your experience viewing how we humans have interacted with our environment over time.
      </p>
      <h4> Repository </h4>
      The github repository can be entered{" "}
      <a href="https://github.com/UtrechtUniversity/Hyde-Platform">here</a>.
      This includes a booklet on how one can create such a webapplication
      themselves. Here the developer of this portal can also be contacted for improvements or other projects.
      <p></p>
      <div className="hydeportal-wrapper relative">
        {/* Link from react-router-dom, allows changing webpages  */}
        <div className="click-for-portal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path d="m12 15.586-4.293-4.293-1.414 1.414L12 18.414l5.707-5.707-1.414-1.414z"></path>
            <path d="m17.707 7.707-1.414-1.414L12 10.586 7.707 6.293 6.293 7.707 12 13.414z"></path>
          </svg>
          Click the globe to enter the Hyde portal!
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
        <Link to="/portal">
          <div className="hydeportal-globe">
            <img src="hyde-portal.png" />
          </div>
        </Link>
      </div>
    </div>
  );
};

const InfoSection = ({ currentYear }) => {
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
      <div className="infosection-text">
        <div>
          <h1 style={{ color: currentTimeLineObject.color }}>
            {currentTimeLineObject.title}
          </h1>
          <h3 style={{ fontWeight: 300 }}>{yearIndexToYear(currentYear)}</h3>
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2>Cropland Area</h2>
            <HomeMap roundedYear={roundedYear} mapId={2} netCDF={true} width={600} height={400} />
            {/* <Table roundedYear={roundYear(currentYear)} /> */}
          </div>
        </div>
      </div>
      <div className="infosection-graph">
        <Graph roundedYear={roundYear(currentYear)} />
      </div>
    </div>
  );
};
