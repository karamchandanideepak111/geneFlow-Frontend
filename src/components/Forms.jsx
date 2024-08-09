import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const Forms = ({
  optype,
  element = {
    connectorId: "",
    connectorName: "",
    key: "",
    instrumentName: "",
    instrumentVersion: "",
    status: "",
  },
  show,
  handleClose,
}) => {
  const [data, setData] = useState(element);
  const [instrumentData, setInstrumentData] = useState([]);

  const instrumentBody = JSON.stringify({ method: "instrument" });
  const keyBody = JSON.stringify({ method: "key" });

  console.log(instrumentBody);
  console.log(data);
  useEffect(() => {
    axios
      .post(
        "https://g72n55b78l.execute-api.us-east-2.amazonaws.com/Dev/FormInitials",
        instrumentBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setInstrumentData(response.data.records);
      });
  }, [show]);

  function handleRefresh() {
    axios
      .post(
        "https://g72n55b78l.execute-api.us-east-2.amazonaws.com/Dev/FormInitials",
        keyBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) =>
        setData((prevData) => {
          return { ...prevData, key: response.data.key };
        })
      );
  }

  function handleChange(inputIdentifier, newValue) {
    setData((prevData) => {
      return { ...prevData, [inputIdentifier]: newValue };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(data);
    const registerData = {
      connector_name: data.connectorName,
      key: data.key,
      instrument_name: data.instrumentName,
      instrument_version: data.instrumentVersion,
    };
    const editData = {
      connector_id: data.connectorId,
      connector_name: data.connectorName,
      key: data.connectorName,
      instrument_name: data.instrumentName,
      instrument_version: data.instrumentVersion,
      status: data.status,
    };
    if (optype === "add") {
      axios
        .post(
          "https://g72n55b78l.execute-api.us-east-2.amazonaws.com/Dev/Register",
          registerData
        )
        .then((response) => {
          toast.success("Registration Successful");
          console.log(response);
          handleClose();
        });
    } else {
      axios
        .post(
          "https://g72n55b78l.execute-api.us-east-2.amazonaws.com/Dev/Register",
          editData
        )
        .then((response) => {
          toast.success("Connector Updated Successfully");
          console.log(response);
          handleClose();
        });
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
            ? "Connector Registration Form"
            : "Update Connector Registration"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {optype === "edit" ? (
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formBasicConnectorId"
            >
              <Form.Label column sm={4}>
                <b>Connector ID:</b>
              </Form.Label>
              <Col sm={7}>
                <Form.Text>{data.connectorId}</Form.Text>
              </Col>
            </Form.Group>
          ) : null}
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formBasicConnectorName"
          >
            <Form.Label column sm={4}>
              <b>Connector Name:</b>
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                placeholder="Enter Connector Name"
                value={data.connectorName}
                onChange={(e) => handleChange("connectorName", e.target.value)}
                required
              ></Form.Control>
            </Col>
          </Form.Group>
          {optype === "edit" ? (
            <Form.Group as={Row} className="mb-3" controlId="formBasicKey">
              <Form.Label column sm={4}>
                <b>Key:</b>
              </Form.Label>
              <Col sm={7}>
                <Form.Text>{data.key}</Form.Text>
              </Col>
            </Form.Group>
          ) : null}
          {/* <Form.Group as={Row} className="mb-3" controlId="formBasicKey">
            <Form.Label column sm={4}>
              <b>Key:</b>
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                readOnly
                value={data.key}
                onChange={(e) => handleChange("key", e.target.value)}
                required
              ></Form.Control>
            </Col>
            <Col sm={1}>
              <h2 onClick={handleRefresh}>
                <i className="bi bi-arrow-clockwise"></i>
              </h2>
            </Col>
          </Form.Group> */}
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formBasicInstrumentName"
          >
            <Form.Label column sm={4}>
              <b>Instrument Name:</b>
            </Form.Label>
            <Col sm={7}>
              <Form.Select
                aria-label="Select Instrument Name"
                value={data.instrumentName}
                onChange={(e) => handleChange("instrumentName", e.target.value)}
              >
                <option value="">---Select the Instrument Name---</option>
                {instrumentData.map((inst) => (
                  <option key={inst.instrument_id} value={inst.instrument_name}>
                    {inst.instrument_name}
                  </option>
                ))}
              </Form.Select>
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
            <Col sm={7}>
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
          {optype === "edit" ? (
            <Form.Group as={Row} className="mb-3" controlId="formBasicStatus">
              <Form.Label column sm={4}>
                <b>Status:</b>
              </Form.Label>
              <Col sm={7}>
                <Form.Select
                  aria-label="Select Status"
                  value={data.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                >
                  <option value="0">Inactive</option>
                  <option value="1">Active</option>
                </Form.Select>
              </Col>
            </Form.Group>
          ) : null}
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

export default Forms;
