import React from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";

const ViewConnectors = ({ show, handleClose, element }) => {
  console.log(element);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Connector Detailed View</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid className="lead">
          <Row className="mb-3">
            <Col>
              <b>Connector ID: </b> {element.connectorId}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <b>Connector Name: </b> {element.connectorName}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <b>Key: </b> {element.key}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <b>Instrument Name: </b> {element.instrumentName}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <b>Instrument Version: </b> {element.instrumentVersion}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <b>Status: </b> {element.status === 1 ? "Active" : "Inactive"}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ViewConnectors;
