
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
  // State, contains Openlayers map element
  const [map, setMap] = useState(false);

  // Contains countries currently selected
  const [selection, setSelection] = useState([]);

  // Contains which raster overlay
  const [overlay, setOverlay] = useState([]);

  const [ovIndicator, setOvIndicator] = useState(null);

  const [currentYear, setCurrentYear] = useState("ce_0");

  // Hide modal after first show
  const [show, setShow] = useState(true);

  // Change page within Modal
  const [modalPage, setModalPage] = useState(0);
  return (
    <>
      {/* Modal is the popup which shows when you enter the website, this contains information about how to use the webpage */}
      <Modal show={show} onHide={() => setShow(false)} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Instructions HYDE Portal</Modal.Title>
        </Modal.Header>
          {/* Change page content depending on page number, change content and change arrows dynamically */}
        {modalPage === 0 && (
          <Modal.Body>
            In this portal the data from the HYDE (History database of the
            Global Environment) is made visable and extractable. <br />
            Here the user can learn how this portal should be used.
          </Modal.Body>
        )}
        {[1, 2, 3, 4].includes(modalPage) && (
          <Modal.Body>
            <Image
              src={process.env.PUBLIC_URL + `/modal-images/M${modalPage}.png`}
              style={{ width: 450, height: 250 }}
            />
          </Modal.Body>
        )}
        {modalPage === 5 && (
          <Modal.Body>
            <Image
              src={process.env.PUBLIC_URL + `/modal-images/M${modalPage}.png`}
              style={{ width: 450, height: 150 }}
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
        </Modal.Footer>
      </Modal>
      <div className="App">
        <PortalMap
          map={map}
          setMap={setMap}
          selection={selection}
          setSelection={setSelection}
          overlay={overlay}
          ovIndicator={ovIndicator}
          currentYear={currentYear}
        />
        <Page
          map={map}
          setMap={setMap}
          selection={selection}
          setSelection={setSelection}
          overlay={overlay}
          setOverlay={setOverlay}
          ovIndicator={ovIndicator}
          setOvIndicator={setOvIndicator}
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
        />
      </div>
    </>
  );
};