import "./styles/HomePage.css";
import { React, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import StaticMap from "./homepage-components/StaticMap";
import Graph from "./homepage-components/Graph";
import Timeline from "./homepage-components/Timeline";
import Table from "./homepage-components/Table"

import { yearNbLst } from "./map-components/utilities/createData";

import { yearIndexToYear } from "./util/yearIndexToYear";
import { timelineObjects } from "./util/timelineObjects";

const HomePage = () => {
  const [currentYear, setCurrentYear] = useState(11500);

  return (
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
};

// indicator object, popc : Population Count
export const indicatorTxtObj = {
  demographic : {
      popc : 'Population',
      popd : 'Population Density',
      urbc : 'Urban Population',
      rurc : 'Rural Population'
  },
  landUse : {
      uopp : 'Urban Area',
      cropland : 'Cropland', 
      grazing : 'Grazing Land', 
      pasture : 'Pasture',
      rangeland : 'Rangeland',
      conv_rangeland : 'Conventional Rangeland'   /* Not in nc */
  },
  agricultural : {
      ir_rice : 'Irrigated Rice',
      rf_rice : 'Rainfed Rice', 
      tot_rice : 'Total Rice', 
      ir_norice : 'Irrigated Not Rice', 
      rf_norice : 'Rainfed Not Rice', 
      tot_irri : 'Total Irrigated', 
      tot_rainfed : 'Total Rainfed'
  }
}
const Jumbotron = () => {
  return (
    <div className="jumbotron bg-primary text-white">
      <h1>Hyde Portal</h1>
      <p>
        Through this portal, data from the <strong>HYDE model</strong> can be
        accessed <br />
        The HYDE model is a mathematical model calculating change in <strong>Demographic</strong>, <strong>Land Use</strong> and <strong>Agricultural</strong> indicators, starting from the rise of
        humanity in 10000 B.C. untril our current time. <br />
        These indicators are calculated within each of the current national
        borders, generating timeseries and within 30kmx30km pixels for the globe generating maps.
      </p>
      <h4>Indicators</h4>
      <p>
        There are three main categories of indicators that can be retrieved through this portal:
        <ul>
          <li>Demographic: Population, Population Density, Urban Population and Rural Population</li>
          <li>Land use: Urban Area, Cropland, Pasture, Rangeland and Conventional Rangeland</li>
          <li>Agricultural: Irrigated Rice, Rainfed Rice, Total Rice, Irrigated Other, Rainfed Other, Total Irrigated and Total Rainfed</li>
        </ul>
      </p>
      <h4> Repository </h4>
      The github repository can be entered <a href="https://github.com/UtrechtUniversity/Hyde-Platform">here</a>. This includes a booklet on how one can create such a webapplication themselves
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
  );
};

const InfoSection = ({ currentYear }) => {
  const [roundedYear, setRoundedYear] = useState(1500);
  const [previousYear, setPreviousYear] = useState(null)
  useEffect(() => {
    const updatePreviousYear = () => {
      setPreviousYear(currentYear)
    }
    const timeout = setTimeout(updatePreviousYear, 100)
    return () => clearTimeout(timeout)
  }, [currentYear])

  useEffect(() => {
    if (currentYear === previousYear) {
      setRoundedYear(roundYear(currentYear));
    }
  }, [previousYear])

  const currentTimeLineObject = timelineObjects.find(
    (timelineObject) => timelineObject.endYear >= currentYear
  );
  return (
    <div className="infosection" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <h1 style={{ color: currentTimeLineObject.color }}>
          {currentTimeLineObject.title}
        </h1>
        <h3 style={{ fontWeight: 300 }}>{yearIndexToYear(currentYear)}</h3>
      </div>
      <div className="periodText" >
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            {currentTimeLineObject.periodText}
          </div>
          <div style={{ flex: 1 }}>
            <StaticMap roundedYear={roundedYear} mapId={2} netCDF={true} />
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "50% 50%", gap: 10 }}>
        <Graph roundedYear={roundYear(currentYear)} />
        <Table roundedYear={roundYear(currentYear)} />
      </div>
    </div>
  );
};

function roundYear(year) {
  for (const yearFromList of yearNbLst) {
    if (yearFromList >= year - 10000) {
      return yearFromList;
    }
  }
}

export default HomePage;
