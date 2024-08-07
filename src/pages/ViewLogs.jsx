import axios from "axios";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Loader from "../components/Loader";

const ViewLogs = () => {
  const [logsData, setLogsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [colDefs, setColDefs] = useState([
    { headerName: "Connector ID", field: "connector_id" },
    { headerName: "Key", field: "key" },
    { headerName: "Instrument Name", field: "instrument_name" },
    { headerName: "Instrument Version", field: "instrument_version" },
    { headerName: "IP Address", field: "ip_address" },
    { headerName: "Timestamp", field: "timestamp" },
  ]);

  useEffect(() => {
    axios
      .get(
        "https://g72n55b78l.execute-api.us-east-2.amazonaws.com/Dev/ViewLogs"
      )
      .then((response) => setLogsData(response.data));
  }, []);

  console.log(logsData);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{ width: "100%", height: "100%" }}
        className="ag-theme-quartz"
      >
        <AgGridReact rowData={logsData} columnDefs={colDefs} />
      </div>
    </div>
  );
};

export default ViewLogs;
