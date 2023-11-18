import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{display: "grid"}}>
      Home
      <Link to="/map">
        <button>Klik hier om naar de map te gaan!</button>
      </Link>
    </div>
  );
};

export default HomePage;
