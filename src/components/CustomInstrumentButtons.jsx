import React, { useState } from "react";
import InstrumentForms from "./InstrumentForms";
import Swal from "sweetalert2";

const CustomInstrumentButtons = (props) => {
  // const [show, setShow] = useState(false);

  // const editElement = {
  //   instrumentId: props.data.instrument_id,
  //   instrumentName: props.data.instrument_name,
  //   instrumentVersion: props.data.version,
  //   instrumentVendor: props.data.vendor
  // }

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // console.log(props);
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      color: "#EBF1F5",
      background: "#1d2333",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#bd1d32",
      cancelButtonColor: "#1d2333",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        successToast("Success");
      }
    });
  };

  return (
    <>
      <div>
        {/* <button
          onClick={handleShow}
          type="button"
          className="btn btn-primary mx-2"
        >
          Edit
        </button> */}
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
      {/* <InstrumentForms 
        optype="edit"
        show={show}
        handleClose={handleClose}
        element={editElement}
      /> */}
    </>
  );
};

export default CustomInstrumentButtons;
