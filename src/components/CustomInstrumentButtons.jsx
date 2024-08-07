import React, { useState } from "react";
import InstrumentForms from "./InstrumentForms";

const CustomInstrumentButtons = (props) => {
  const [show, setShow] = useState(false);

  const editElement = {
    instrumentId: props.data.instrument_id,
    instrumentName: props.data.instrument_name,
    instrumentVersion: props.data.version,
    instrumentVendor: props.data.vendor
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
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
        <button type="button" className="btn btn-danger">
          Delete
        </button>
      </div>
      <InstrumentForms 
        optype="edit"
        show={show}
        handleClose={handleClose}
        element={editElement}
      />
    </>
  );
};

export default CustomInstrumentButtons;
