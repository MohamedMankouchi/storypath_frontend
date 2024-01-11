import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { ScenarioCard } from "./ScenarioCard";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";

export const ScenarioProfile = (user) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [scenarios, setScenarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef();
  useEffect(() => {
    fetch("https://storypathapi.onrender.com/")
      .then((res) => res.json())
      .then((data) => {
        setScenarios(data.scenarios);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hoeveel stappen bevat het scenario ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            ref={ref}
            type="number"
            min={0}
            placeholder="Aantal stappen"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Sluiten
          </Button>

          <Button
            variant="primary"
            onClick={() => {
              if (
                ref.current.value == 0 ||
                ref.current.value < 0 ||
                Math.sign(ref.current.value) != 1 ||
                Math.floor(ref.current.value) == 0
              ) {
                return;
              }
              window.location.href = `/makeScenario/${ref.current.value}`;
            }}
          >
            Maak
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Scenarios</h1>

        {user.role == "Admin" || user.role == "Teacher" ? (
          <Button onClick={handleShow} variant="primary">
            Maak scenario
          </Button>
        ) : (
          ""
        )}
      </div>
      {!isLoading ? (
        <ScenarioCard data={scenarios} />
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
};
