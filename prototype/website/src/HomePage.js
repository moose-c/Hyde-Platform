import "./styles/HomePage.css";
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="information-overlay">
        Information Hub Information HubInformation HubInformation Hub{" "}
      </div>
      <div className="graphs-overlay">
        Graphs Overlay Graphs Overlay Graphs Overlay Graphs OverlayGraphs
        Overlay Graphs Overlay
      </div>
      <div className="logo">Hyde Portal</div>
      <div className="timeline-overlay">
        Timeline
        <Link to="/map">
          <button>Klik hier om naar de map te gaan!</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
