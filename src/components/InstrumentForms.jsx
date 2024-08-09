import React, { useState } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const InstrumentForms = ({
  optype,
  element = {
    instrumentID: "",
    instrumentName: "",
    instrumentVendor: "",
    instrumentVersion: "",
  },
  show,
  handleClose,
}) => {
  const [data, setData] = useState(element);

  function handleChange(inputIdentifier, newValue) {
    setData((prevData) => {
      return { ...prevData, [inputIdentifier]: newValue };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const registerData = {
      instrument_name: data.instrumentName,
      instrument_vendor: data.instrumentVendor,
      instrument_version: data.instrumentVersion,
    };

    console.log(registerData);
    if (optype === "add") {
      axios
        .post(
          "https://g72n55b78l.execute-api.us-east-2.amazonaws.com/Dev/CreateInstrument",
          registerData
        )
        .then((response) => {
          toast.success("Registration successful");
          console.log(response);
          handleClose;
        });
    } else {
      handleClose();
    }
  }

  function handleReset(event) {
    event.preventDefault();
    setData(element);
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {optype === "add"
            ? "Instrument Registration Form"
            : "Update Instrument Registration"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formBasicInstrumentName"
          >
            <Form.Label column sm={4}>
              <b>Instrument Name:</b>
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Enter Instrument Name"
                value={data.instrumentName}
                onChange={(e) => handleChange("instrumentName", e.target.value)}
                required
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formBasicInstrumentVersion"
          >
            <Form.Label column sm={4}>
              <b>Instrument Version:</b>
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Enter Instrument Version"
                value={data.instrumentVersion}
                onChange={(e) =>
                  handleChange("instrumentVersion", e.target.value)
                }
                required
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formBasicVendor">
            <Form.Label column sm={4}>
              <b>Vendor:</b>
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Enter Vendor"
                value={data.instrumentVendor}
                onChange={(e) =>
                  handleChange("instrumentVendor", e.target.value)
                }
                required
              ></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 3 }}>
              <Button
                className="form-reset-button"
                variant="secondary"
                onClick={handleReset}
                type="submit"
              >
                Reset
              </Button>
              <Button
                className="form-submit-button"
                variant="success"
                onClick={handleSubmit}
                type="submit"
              >
                {optype === "add" ? "Submit" : "Update"}
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default InstrumentForms;
