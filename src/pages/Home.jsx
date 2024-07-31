import React, { useEffect, useState, useCallback } from "react";
import CustomButtons from "../components/CustomButtons";
import { Container, Row, Col, Button } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
import Forms from "../components/Forms";
import Loader from "../components/Loader";

const Home = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState([]);

  const [colDefs, setColDefs] = useState([
    { headerName: "Connector ID", field: "connector_id", flex: 1 },
    { headerName: "Connector Name", field: "connector_name", flex: 1 },
    { headerName: "Instrument Name", field: "instrument_name", flex: 1 },
    { headerName: "Instrument Version", field: "instrument_version", flex: 1 },
    { headerName: "Key", field: "key", flex: 1 },
    {
      headerName: "Status",
      valueGetter: (p) => (p.data.status === 1 ? "Active" : "Inactive"),
      field: "status",
      flex: 1,
    },
    { headerName: "Action", cellRenderer: CustomButtons, flex: 2 },
  ]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://g72n55b78l.execute-api.us-east-2.amazonaws.com/Dev/ViewConnectors"
      )
      .then((response) => {
        console.log(response.data);
        setRowData(response.data);
        setLoading(false);
      });
  }, [show]);

  return (
    <>
      <Container>
        <Row className="mb-3 d-flex flex-row">
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col className="p-2">
            <Button onClick={handleShow}>Register New Connector</Button>
          </Col>
        </Row>
      </Container>
      {loading ? (
        <div className="align-items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div style={{ width: "100%", height: "100%" }}>
            <div
              style={{ width: "100%", height: "100%" }}
              className={"ag-theme-quartz"}
            >
              <AgGridReact rowData={rowData} columnDefs={colDefs} />
            </div>
          </div>
          <Forms optype="add" show={show} handleClose={handleClose} />
        </>
      )}
    </>
  );
};

export default Home;
