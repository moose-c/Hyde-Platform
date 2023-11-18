import "./styles/HomePage.css";
import {React, useState} from "react";
import { Link } from "react-router-dom";
import StaticMap from "./homepage-components/StaticMap";
import Graph from "./homepage-components/Graph";
import Timeline from "./homepage-components/Timeline"


const HomePage = () => {
  const [year, setYear] = useState()
  return (
    <div className="homepage">
      <div className="information-overlay">
        Information Hub Information HubInformation HubInformation Hub{" "}
      </div>
      <div className="graphs-overlay" style={{display: "flex", flexDirection: "column"}}>
        <Graph year={year}/>
        <StaticMap year={year} width={250} height={200} mapId={1}/>
        Graphs Overlay Graphs Overlay Graphs Overlay Graphs OverlayGraphs
        Overlay Graphs Overlay
      </div>
      <div className="logo">
        Hyde Portal
        <StaticMap width={400} height={200} mapId={2}/>
      </div>
      <div className="timeline-overlay">
        <Timeline year={year} setYear={setYear}/>
        <Link to="/map">
          <button>Klik hier om naar de map te gaan!</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
