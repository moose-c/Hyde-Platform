import "./styles/HomePage.css";
import React from "react";
import Timeline from "./homepage-components/Timeline";

const HomePage = () => {
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
        <InfoSection />
      </div>
      <div className="timeline-overlay">
        <Timeline />
      </div>
    </div>
  );
};

const InfoSection = () => {
  return (
    <div className="infosection">
      <h1>Year</h1>
      <div>
        Nunc euismod, augue eu eleifend vehicula, arcu nisi fringilla elit, id
        lacinia dui justo nec mauris. Sed bibendum risus nec leo fermentum, vel
        interdum velit consequat. Curabitur tristique urna ac nunc hendrerit, eu
        fringilla orci ultricies. Aenean a velit vel tellus cursus scelerisque a
        ut tortor. Sed sit amet fringilla ligula. Vivamus luctus, mi a luctus
        fringilla, elit elit gravida mauris, id vulputate risus nisi id libero.
        Sed ac fringilla felis, sit amet fermentum purus. Quisque sit amet nunc
        id mauris tincidunt laoreet eget non elit. Sed eu dolor vitae purus
        gravida vestibulum eget non ex. Maecenas vel fringilla purus.
      </div>
    </div>
  );
};
export default HomePage;
