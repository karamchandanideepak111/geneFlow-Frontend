import axios from "axios";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Loader from "../components/Loader";
import CustomInstrumentButtons from "../components/CustomInstrumentButtons";
import { Button, Container, Row, Col } from "react-bootstrap";
import InstrumentForms from "../components/InstrumentForms";

const ViewInstruments = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [editShow, setEditShow] = useState(false);

  const handleEditClose = () => { 
    console.log("Inside handle Close");
    setEditShow(false)
  };
  const handleEditShow = () => setEditShow(true);

  const [colDefs, setColDefs] = useState([
    { headerName: "Instrument Name", field: "instrument_name" },
    { headerName: "Version", field: "version" },
    { headerName: "Vendor", field: "vendor" },
    { headerName: "Action", cellRenderer: CustomInstrumentButtons, cellRendererParams: {
      handleEditClose: handleEditClose
    }},
  ]);

  const instrumentBody = JSON.stringify({ method: "instrument" });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
        setRowData(response.data.records);
      });
  }, [show]);

  return (
    <>
      <Container fluid>
        <Row className="mb-3 d-flex flex-row">
          <Col></Col>
          <Col xs={2} className="p-2 justify-item-end">
            <Button onClick={handleShow}>Register New Instrument</Button>
          </Col>
        </Row>
      </Container>
      {loading ? (
        <div className="d-flex justify-content-center vh-100">
          <Loader />
        </div>
      ) : (
        <>
          <div style={{ width: "100%", height: "100%" }}>
            <div
              style={{ width: "100%", height: "100%" }}
              className="ag-theme-quartz"
            >
              <AgGridReact rowData={rowData} columnDefs={colDefs} />
            </div>
          </div>
          <InstrumentForms optype="add" show={show} handleClose={handleClose} />
        </>
      )}
    </>
  );
};

export default ViewInstruments;
