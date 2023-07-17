import React, { useState } from "react";
import Reportscss from "../../style/Reports/reports.module.css";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import ReportTableSku from "./Table/ReportTableSku";
import { ReportSkuColumn } from "./Table/ReportSkuColumn";

const BySku = () => {
  const [tablesku, setTablesku] = useState("false");

  const getReport = () => {
    setTablesku(!tablesku);
  };

  let RenderPage;

  if (tablesku) {
    RenderPage = (
      <>
        <div className="headingbaronaction">
          <div className="toptableheading">
            <div className="subtoptableheadingone">
              <div>Reports</div>
            </div>
            <div className="subtoptableheadingone">
              <span>Reports</span>{" "}
              <span>
                <MdOutlineArrowForwardIos />
              </span>
              <span className="subMenu_subheading">Sales Report By Sku</span>
            </div>
          </div>
        </div>
        <div className={Reportscss.globalfiltersListing}>
          <div style={{ marginLeft: "5%" }}>
            <div className={Reportscss.productDateonListing}>
              <lable style={{ fontSize: "15px", color: "grey" }}>
                SKU with quantity available less than
              </lable>
              <br />
              <input
                type="text"
                style={{
                  color: "#7D8D9D",
                  textAlign: "center",
                  paddingRight: "15px",
                  fontSize: "15px",
                  border: "0.2px solid grey",
                  width: "18rem",
                }}
              />
            </div>
          </div>

          <div className={Reportscss.channelfilteronlisitng}>
            <div className={Reportscss.channnelcontaineronListing}>
              <select
                className="itemcondtion"
                name="item_condition"
                style={{
                  color: "#888888",
                  background: "#F1F1F1",
                  borderRadius: "23px",
                  width: "92%",
                }}
              >
                {/* <option  className="dropdown-item" >Used:Like New </option> */}
                <option>Channels</option>
                <option>Home Decor</option>
                <option>Industrial & Tools</option>
                <option>Personal Care</option>
                <option>Auromobiles</option>
                <option>All</option>
              </select>
              <div></div>
            </div>
          </div>
          <div>
            <button className={Reportscss.exportbtn} onClick={getReport}>
              Get Report
              <BsArrowRight />
            </button>
          </div>
        </div>
      </>
    );
  } else {
    RenderPage = (
      <>
        <div className="headingbaronaction">
          <div className="toptableheading">
            <div className="subtoptableheadingone">
              <div>Reports</div>
            </div>
            <div className="subtoptableheadingone">
              <span>Reports</span>{" "}
              <span>
                <MdOutlineArrowForwardIos />
              </span>
              <span className="subMenu_subheading">Sales Report By Time</span>
            </div>
          </div>
        </div>
        <div className={Reportscss.globalfiltersListing}>
          <div style={{ marginLeft: "5%" }}>
            <div className={Reportscss.productDateonListing}>
              <lable style={{ fontSize: "15px", color: "grey" }}>
                SKU with available less than
              </lable>
              <br />
              <input
                type="text"
                style={{
                  color: "#7D8D9D",
                  textAlign: "center",
                  paddingRight: "15px",
                  fontSize: "15px",
                  border: "0.2px solid grey",
                  width: "18rem",
                }}
              />
            </div>
          </div>

          <div className={Reportscss.channelfilteronlisitng}>
            <div className={Reportscss.channnelcontaineronListing}>
              <select
                className="itemcondtion"
                name="item_condition"
                style={{
                  color: "#888888",
                  background: "#F1F1F1",
                  borderRadius: "23px",
                  width: "92%",
                }}
              >
                {/* <option  className="dropdown-item" >Used:Like New </option> */}
                <option>Channels</option>
                <option>Home Decor</option>
                <option>Industrial & Tools</option>
                <option>Personal Care</option>
                <option>Auromobiles</option>
                <option>All</option>
              </select>
              <div></div>
            </div>
          </div>
          <div>
            <button className={Reportscss.exportbtn} onClick={getReport}>
              Get Report
              <BsArrowRight />
            </button>
          </div>
          <div></div>
        </div>
        <ReportTableSku />
      </>
    );
  }

  return (
    <div>
      <div className="backgroundcontainer">{RenderPage}</div>
    </div>
  );
};

export default BySku;
