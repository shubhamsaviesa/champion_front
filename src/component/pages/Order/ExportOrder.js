import React, { useContext, useState, useEffect } from "react";
import "../../style/order/exportorder.css";
import { Button, styled } from "@mui/material";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Btn = styled(Button)`
  font: normal normal normal 15px Poppins;
  background: #e2e2e2 0% 0% no-repeat padding-box;
  letter-spacing: 0px;
  text-transform: capitalize;
  color: #282c45;
  margin-right: 20px;
  width: 8vw;
  height: 5.5vh;
  &:hover {
    background-color: #e2e2e2;
  }
`;
const Btn1 = styled(Button)`
  font: normal normal normal 15px Poppins;
  background: #59c180 0% 0% no-repeat padding-box;
  letter-spacing: 0px;
  text-transform: capitalize;
  width: 8vw;
  height: 5.5vh;
  color: #ffffff;
  &:hover {
    background-color: #59c180;
  }
`;

const ExportOrder = () => {
  const Navigation = useNavigate();
  const { sidenavbar } = useContext(DataContext);
  const [exportFormat, setExportFormat] = useState("");
  const [exportType, setExportType] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState("");

  const handleExportFormatChange = (e) => {
    setExportFormat(e.target.value);
  };

  const handleExportTypeChange = (e) => {
    setExportType(e.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // construct the API endpoint URL based on user input
    let endpointUrl = "/api/orders/export?";
    if (exportFormat !== "") {
      endpointUrl += `exportFormat=${exportFormat}&`;
    }
    if (exportType !== "") {
      endpointUrl += `exportType=${exportType}&`;
      if (exportType === "By Date") {
        if (startDate !== null) {
          endpointUrl += `startDate=${startDate.toISOString()}&`;
        }
        if (endDate !== null) {
          endpointUrl += `endDate=${endDate.toISOString()}&`;
        }
      } else if (exportType === "By Status") {
        if (status !== "") {
          endpointUrl += `status=${status}&`;
        }
      }
    }

    // make the API call and download the file
    fetch(endpointUrl)
      .then((response) => {
        // handle any errors here
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        // get the file name from the Content-Disposition header
        const contentDisposition = response.headers.get(
          "Content-Disposition"
        );
        const fileName = contentDisposition
          ? contentDisposition.split("filename=")[1]
          : "exported_data";

        // convert the response to a blob object
        return response.blob().then((blob) => ({ fileName, blob }));
      })
      .then(({ fileName, blob }) => {
        // create a temporary URL for the blob object and initiate the download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Failed to export data:", error);
        // handle error here
      });
  };

  
  let rendertable;
  if (sidenavbar) {
    rendertable = (
      <>
        <div>
          <div className="headingbar">
            <div className="toptableheading">
              <div
                style={{ position: "relative", left: "2.5%", fontSize: "15px" }}
              >
                <div>Export Order</div>
              </div>
              <div
                style={{ position: "relative", right: "4%", fontSize: "15px" }}
              >
                <span>Order</span>{" "}
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">Export Order</span>
              </div>
            </div>
          </div>

          <div className="amazonConnectContainer">
            <div>
              <div className="amazonForm">
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <div>
                        <label htmlFor="text">Export Format</label>
                      </div>
                    </div>
                    <div>
                      <select
                        style={{
                          border: "none",
                          background: "#F6F7F8 0% 0% no-repeat padding-box",
                          borderRadius: "9px",
                          width: "40vw",
                          height: "5.3vh",
                        }}
                        id="export-format"
                        name="export-format"
                        value={exportFormat}
                        onChange={handleExportFormatChange}
                      >
                        <option value="">Select</option>
                        <option value="Excel">Excel</option>
                        <option value="CSV">CSV</option>
                        <option value="TXT">TXT</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <div>
                        <label htmlFor="text">Export Type</label>
                      </div>
                    </div>
                    <div>
                      <select
                        style={{
                          border: "none",
                          background: "#F6F7F8 0% 0% no-repeat padding-box",
                          borderRadius: "9px",
                          width: "40vw",
                          height: "5.3vh",
                        }}
                        id="export-type"
                        name="export-type"
                        value={exportType}
                        onChange={handleExportTypeChange}
                      >
                        <option value="">Select</option>
                        <option value="ByDate">By Date</option>
                        <option value="ByStatus">By Status</option>
                        <option value="AllOrders">All Orders</option>
                      </select>
                    </div>
                  </div>
                  {exportType === "By Date" && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "black",
                      }}
                    >
                      <div>
                        <div>
                          <label htmlFor="start-date">Start Date</label>
                        </div>
                      </div>
                      <div>
                        <DatePicker
                          id="start-date"
                          selected={startDate}
                          onChange={handleStartDateChange}
                          dateFormat="MM/dd/yyyy"
                        />
                      </div>
                      <div>
                        <div>
                          <label htmlFor="end-date">End Date</label>
                        </div>
                      </div>
                      <div>
                        <DatePicker
                          id="end-date"
                          selected={endDate}
                          onChange={handleEndDateChange}
                          dateFormat="MM/dd/yyyy"
                        />
                      </div>
                    </div>
                  )}
                  {exportType === "By status" && (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>
                        <div>
                          <label htmlFor="status">Status</label>
                        </div>
                      </div>
                      <div>
                        <select
                          id="status"
                          name="status"
                          value={status}
                          onChange={handleStatusChange}
                          style={{
                            border: "none",
                            background: "#F6F7F8 0% 0% no-repeat padding-box",
                            borderRadius: "9px",
                            width: "40vw",
                            height: "5.3vh",
                          }}
                        >
                          <option value="">Select</option>
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div
                    style={{
                      width: "40vw",
                      textAlign: "center",
                      marginTop: "200px",
                    }}
                  >
                    <Btn onClick={() => Navigation(-1)}>Cancel</Btn>
                    <Btn1 type="submit">Connect</Btn1>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    rendertable = (
      <>
        <div>
          <div className="headingbar2">
            <div className="toptableheading">
              <div
                style={{ position: "relative", left: "2.5%", fontSize: "15px" }}
              >
                <div>Connect to Amazon</div>
              </div>
              <div
                style={{ position: "relative", right: "4%", fontSize: "15px" }}
              >
                <span>Channels</span>{" "}
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">Listing</span>
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">Amazon</span>
              </div>
            </div>
          </div>

          <div className="amazonConnectContainer2">
            <div>
              <div className="amazonForm">
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <div>
                        <label htmlFor="text">Export Format</label>
                      </div>
                    </div>
                    <div>
                      <select
                        style={{
                          border: "none",
                          background: "#F6F7F8 0% 0% no-repeat padding-box",
                          borderRadius: "9px",
                          width: "40vw",
                          height: "5.3vh",
                        }}
                        id="export-format"
                        name="export-format"
                        value={exportFormat}
                        onChange={handleExportFormatChange}
                      >
                        <option value="">Select</option>
                        <option value="Excel">Excel</option>
                        <option value="CSV">CSV</option>
                        <option value="TXT">TXT</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <div>
                        <label htmlFor="text">Export Type</label>
                      </div>
                    </div>
                    <div>
                      <select
                        style={{
                          border: "none",
                          background: "#F6F7F8 0% 0% no-repeat padding-box",
                          borderRadius: "9px",
                          width: "40vw",
                          height: "5.3vh",
                        }}
                        id="export-type"
                        name="export-type"
                        value={exportType}
                        onChange={handleExportTypeChange}
                      >
                        <option value="">Select</option>
                        <option value="ByDate">By Date</option>
                        <option value="ByStatus">By Status</option>
                        <option value="AllOrders">All Orders</option>
                      </select>
                    </div>
                  </div>
                  {exportType === "By Date" && (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>
                        <div>
                          <label htmlFor="start-date">Start Date</label>
                        </div>
                      </div>
                      <div>
                        <DatePicker
                          id="start-date"
                          selected={startDate}
                          onChange={handleStartDateChange}
                          dateFormat="MM/dd/yyyy"
                        />
                      </div>
                      <div>
                        <div>
                          <label htmlFor="end-date">End Date</label>
                        </div>
                      </div>
                      <div>
                        <DatePicker
                          id="end-date"
                          selected={endDate}
                          onChange={handleEndDateChange}
                          dateFormat="MM/dd/yyyy"
                        />
                      </div>
                    </div>
                  )}
                  {exportType === "By status" && (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>
                        <div>
                          <label htmlFor="status">Status</label>
                        </div>
                      </div>
                      <div>
                        <select
                          id="status"
                          name="status"
                          value={status}
                          onChange={handleStatusChange}
                          style={{
                            border: "none",
                            background: "#F6F7F8 0% 0% no-repeat padding-box",
                            borderRadius: "9px",
                            width: "40vw",
                            height: "5.3vh",
                          }}
                        >
                          <option value="">Select</option>
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div
                    style={{
                      width: "40vw",
                      textAlign: "center",
                      marginTop: "200px",
                    }}
                  >
                    <Btn onClick={() => Navigation(-1)}>Cancel</Btn>
                    <Btn1 type="submit">Connect</Btn1>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return <>{rendertable}</>;
};

export default ExportOrder;
