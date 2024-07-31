import React, { useState } from "react";
import Forms from "./Forms";
import ViewConnectors from "../pages/ViewConnectors";

const CustomButtons = (props) => {
  const [show, setShow] = useState(false);
  const [viewShow, setViewShow] = useState(false);

  const editElement = {
    connectorId: props.data.connector_id,
    connectorName: props.data.connector_name,
    key: props.data.key,
    instrumentName: props.data.instrument_name,
    instrumentVersion: props.data.instrument_version,
    status: props.data.status,
  };

  const handleClose = () => setShow(false);
  const handleViewClose = () => setViewShow(false);
  const handleShow = () => setShow(true);
  const handleViewShow = () => setViewShow(true);
  console.log(props);
  return (
    <>
      <div>
        <button
          onClick={handleShow}
          type="button"
          className="btn btn-primary mx-2"
        >
          Edit
        </button>
        <button
          onClick={handleViewShow}
          type="button"
          className="btn btn-secondary mx-2"
        >
          View
        </button>
        {props.data.status === 1 ? null : (
          <button type="button" className="btn btn-danger mx-2">
            Delete
          </button>
        )}
      </div>
      <Forms
        optype="edit"
        show={show}
        handleClose={handleClose}
        element={editElement}
      />
      <ViewConnectors
        show={viewShow}
        handleClose={handleViewClose}
        element={editElement}
      />
    </>
  );
};

export default CustomButtons;
