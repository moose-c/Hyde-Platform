import React from "react";
import { Link } from "react-router-dom";
import Timeline from "./homepage-components/Timeline";

const HomePage = () => {
  return (
    <div style={{ display: "grid" }}>
      Home
      <Link to="/map">
        <button>Klik hier om naar de map te gaan!</button>
      </Link>
      <div style={{ width: "100%", position: "absolute", bottom: 0 }}>
        <Timeline />
      </div>
    </div>
  );
};

export default HomePage;
