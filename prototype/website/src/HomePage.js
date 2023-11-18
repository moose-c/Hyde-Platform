import "./styles/HomePage.css";
import Card from "react-bootstrap/Card";
import React from "react";
import StaticMap from "./homepage-components/StaticMap";
import Timeline from "./homepage-components/Timeline";

const HomePage = () => {
  return (
    <div className="homepage">
      <InformationOverlay />
      <GraphsOverlay />
      <div className="logo">
        Hyde Portal
        <StaticMap />
      </div>
      <div className="timeline-overlay">
        <Timeline />
      </div>
    </div>
  );
};

const GraphsOverlay = () => {
  return (
    <div className="graphs-overlay">
      <Card>
        <Card.Header>Henkensteijn</Card.Header>
        <Card.Body>
          <Card.Title>Henkensteijn Biodiversity Unit</Card.Title>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Henkensteijn</Card.Header>
        <Card.Body>
          <Card.Title>Henkensteijn Biodiversity Unit</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

const InformationOverlay = () => {
  return (
    <div className="information-overlay">
      <Card bg="primary" text="white" className="information-card">
        {/* <Card.Header>Hyde Portal </Card.Header> */}
        <Card.Body>
          <Card.Title>Hyde Portal Biodiversity Unit</Card.Title>
          <Card.Text>
            <p>
              Lit buggin beef chucks fam, bodega cheddar jordans. Bum rush
              doorknocker earrings crib jam, train projects guap fight og. Trees
              gas 40 quarter water. Cheez doodles tropical fantasy. 99cent store
              credit corner store flex. Down low bae cab pump, slang dying
              building loosies 4loko. Apartment blunt koolaid, munchies yo
              lockdown liquor, numbers brother ante. Joint chips sike suspect
              stoop pizza parks. cash eighth jay buckfifty pound thot crime
              neighbors kids. Vans chains gang swishers. 22 blunt hoodrich facts
              808 grind baby daddy chill cipher bomb dealy. Banger crew, 730
              benz juice, drop science dawg all that chin check, digits G
              clockin homie sauce fiend. Dope flow dis ghetto dime get down
              waddup cold deuces beats. Crackin dip be easy, benjamins faded cop
              dozens, busta faking jacks aight.
            </p>
            <p>
              Booty go off ends baby mama biscuit fly. Freestyle baller grill
              foreals pyt front hard rock gully in game. Fasho shots OD set.
              Kicks hustler grind ice, run it hood vic parlay piece. Jake math,
              herb one love pop, jack mami scrilla player, mack daddy crunk
              saggin blow strapped turn up. Wreck holla serve shank, ut played
              out L shawty. Peace newjack son tax hoodbooger snuff. True dat
              skeezer up. Spit 44 hottie zooted. 411 hype man bars, old school
              downtown ox, wack thick whip. Copy kid kickin straight. Toy cop
              lifted hoodrat.
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default HomePage;
