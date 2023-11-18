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
      <div className="top-section">
        <div className="jumbotron bg-primary text-white">
          <h1>Hyde Portal</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            euismod dictum urna, in efficitur ipsum tincidunt a. Nullam eget
            odio at libero vestibulum dapibus non et velit. Sed vel nulla vitae
            neque feugiat bibendum. Duis varius quam ut diam eleifend, a
            hendrerit tortor commodo. In hac habitasse platea dictumst. Proin
            vitae sapien nec enim consectetur eleifend. Vivamus convallis tortor
            a est ultrices, sit amet luctus felis mattis. Curabitur id ex quis
            purus semper tempor. Vestibulum hendrerit fringilla tellus, id
            laoreet nunc. Integer nec elit quis urna feugiat venenatis vitae ut
            libero. Vivamus vel gravida risus.
          </p>
          <p>
            Sed at efficitur tellus. Aliquam erat volutpat. Proin tincidunt, leo
            vel scelerisque bibendum, ex purus euismod nulla, vitae facilisis
            elit elit a purus. Integer eget mauris nec arcu hendrerit congue vel
            at ipsum. Nunc euismod, augue eu eleifend vehicula, arcu nisi
            fringilla elit, id lacinia dui justo nec mauris. Sed bibendum risus
            nec leo fermentum, vel interdum velit consequat. Curabitur tristique
            urna ac nunc hendrerit, eu fringilla orci ultricies. Aenean a velit
            vel tellus cursus scelerisque a ut tortor. Sed sit amet fringilla
            ligula. Vivamus luctus, mi a luctus fringilla, elit elit gravida
            mauris, id vulputate risus nisi id libero. Sed ac fringilla felis,
            sit amet fermentum purus. Quisque sit amet nunc id mauris tincidunt
            laoreet eget non elit. Sed eu dolor vitae purus gravida vestibulum
            eget non ex. Maecenas vel fringilla purus.
          </p>
        </div>
        <div className="infosectin"></div>
      </div>
      {/* <InformationOverlay /> */}
      {/* <GraphsOverlay /> */}
      {/* <div className="logo"> */}
      {/* Hyde Portal */}
      {/* <StaticMap /> */}
      {/* </div> */}
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
