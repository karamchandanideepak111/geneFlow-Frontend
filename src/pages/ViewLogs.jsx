import axios from "axios";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Loader from "../components/Loader";

const dateComparator = (date1, date2) => {
  const date1Number = monthToComparableNumber(date1);
  const date2Number = monthToComparableNumber(date2);
  if (date1Number === null && date2Number === null) {
    return 0;
  }

  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }
  return date1Number - date2Number;
};

const monthToComparableNumber = (date) => {
  if (date === undefined || date === null) {
    return null;
  }
  return date.valueOf();
};

const ViewLogs = () => {
  const [logsData, setLogsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [colDefs, setColDefs] = useState([
    { headerName: "Connector ID", field: "connector_id" },
    { headerName: "Key", field: "key" },
    { headerName: "Instrument Name", field: "instrument_name", sort: "desc" },
    { headerName: "Instrument Version", field: "instrument_version" },
    { headerName: "IP Address", field: "ip_address" },
    { headerName: "Timestamp", field: "timestamp", comparator: dateComparator },
  ]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://g72n55b78l.execute-api.us-east-2.amazonaws.com/Dev/ViewLogs"
      )
      .then((response) => {
        setLoading(false);
        setLogsData(response.data);
      });
  }, []);

  const logs = loading ? (
    <div className="d-flex justify-content-center vh-100">
      <Loader />
    </div>
  ) : (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{ width: "100%", height: "100%" }}
        className="ag-theme-quartz"
      >
        <AgGridReact rowData={logsData} columnDefs={colDefs} />
      </div>
    </div>
  );

  return logs;
};

export default ViewLogs;
