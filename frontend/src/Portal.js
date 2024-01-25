// Import css
import './styles/Portal.css'
/* Importing CSS styles and React components from the react-bootstrap library. */
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import { React, useState } from "react";

// Two main components, the map and the things lying on top of the map
import PortalMap from "./portal-components/PortalMap";
import Page from "./portal-components/Page";



export default function Portal() {
  // There are two seperate ways the map can be used:
  //    1) Countries can be selected after which charts can be requested 
  //    2) Global raster can be displayed on top of the base map
  // This state knows in which of the two cases we are currently operating
  const [currentlySelecting, setCurrentlySelecting] = useState(true)

  // Contains countries currently selected
  const [selection, setSelection] = useState([]);

  // value & year for overlay indicators
  const [ovIndicator, setOvIndicator] = useState(null);
  const [currentYear, setCurrentYear] = useState("ce_0");

  // To print pixel info when clicking a pixel, in the Map state
  const [popoverInfo, setPopoverInfo] = useState(null)

  // Hide modal after first show
  const [show, setShow] = useState(true);

  // Change page within Modal
  const [modalPage, setModalPage] = useState(0);
  return (
    <>
      {/* Modal is the popup which shows when you enter the website, this contains information about how to use the webpage */}
      <Modal show={show} onHide={() => setShow(false)} centered={true} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Instructions HYDE Portal</Modal.Title>
        </Modal.Header>
        {/* Change page content depending on page number, change content and change arrows dynamically */}
        {modalPage === 0 && (
          <Modal.Body>
            In this portal the data from the HYDE (History database of the
            Global Environment) model can be visualized and downloaded in an interactive display. <br />
            Here the user can learn how this portal should be used.
          </Modal.Body>
        )}
        {[1, 2, 3, 4, 5].includes(modalPage) && (
          <Modal.Body style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              {modalPage === 1 && (
                <>
                  <h2>Overview</h2>
                  <p>When the first two tabs are selected: Click the map to <u>select countries</u><br />
                    When the final tab is selected: Click the map to <u>learn pixel value</u></p>
                </>
              )}
              {modalPage === 2 && (
                <>
                  <h2>Selecting Countries Tab</h2>
                  <p>Click the map to <u>select countries</u> <br />
                    Reclick country or click the cross in the list to deselect a country</p>
                </>
              )}
              {modalPage === 3 && (
                <>
                  <h2>Timeseries Tab</h2>
                  <p>Click the map to <u>select countries</u> <br />
                    Use the form to request figures</p>
                </>
              )}
              {modalPage === 4 && (
                <>
                  <h2>Example Graph</h2>
                  <p>Click the map to <u>select countries</u> <br />
                  After requesting an image, view resulting image in the bottom left</p>
                </>
              )}
              {modalPage === 5 && (
                <>
                  <h2>Maps Tab</h2>
                  Use form to request global rasters for the selected year and indicator
                  <p>Click the map to <u>learn pixel value</u> <br /></p>
                </>
              )}
            </div>
            <Image
              src={process.env.PUBLIC_URL + `/modal-images/M${modalPage}.PNG`}
              style={{ height: 420, objectFit: 'contain' }}
            />
          </Modal.Body>

        )}
        <Modal.Footer>
          {modalPage > 0 && (
            <Button
              onClick={() => setModalPage((prevModalPage) => prevModalPage - 1)}
            >
              Previous
            </Button>
          )}
          {modalPage < 5 && (
            <Button
              onClick={() => setModalPage((prevModalPage) => prevModalPage + 1)}
            >
              Next
            </Button>
          )}
          {modalPage === 5 && (
            <Button onClick={() => setShow(false)}>Start Exploring</Button>
          )}
        </Modal.Footer>
      </Modal>
      <div className="App">
        <PortalMap
          currentlySelecting={currentlySelecting}
          selection={selection}
          setSelection={setSelection}
          ovIndicator={ovIndicator}
          setOvIndicator={setOvIndicator}
          currentYear={currentYear}
          popoverInfo={popoverInfo}
          setPopoverInfo={setPopoverInfo}
        />
        <Page
          setCurrentlySelecting={setCurrentlySelecting}
          selection={selection}
          setSelection={setSelection}
          ovIndicator={ovIndicator}
          setOvIndicator={setOvIndicator}
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
          setPopoverInfo={setPopoverInfo}
        />
      </div>
    </>
  );
};