import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { BiExport } from "react-icons/bi";
import SearchIcon from "../../../images/bookcommerceimage/Path 332.png";
import Listings from "../../../style/Actions/Listings.module.css";
import { FaSync } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ExportListingTable from "../../../layout/Poppers/ExportListingTable";
import ListingTable from "../../../layout/Poppers/ListingTable";

export const GlobalFilter = ({ filter, setFilter, getDatefrom }) => {
  const [value, setValue] = useState(filter);
  const [inputvalue, setInputValue] = useState("");
  const [channelVal, setChannelVal] = useState("");

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 0);

  const onChangeChannel = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 0);

  const onChangeDate = (val, type) => {
    // getDatefrom(val)
    console.log(val, type);
  };

  const inputHandle = (e) => {
    setInputValue(e.target.value);
  };
  const submitHandle = () => {
    setValue(inputvalue);
    onChange(inputvalue);
  };

  const handleExportPopper = () => {};

  return (
    <>
      <div
        className={Listings.actionbutton}
        style={{ justifyContent: "space-between" }}
      >
        <div className={Listings.exportbutton} style={{ marginLeft: "2%" }}>
          <div>Ship From</div>
          <div style={{ color: "grey", fontSize: "10px" }}>
            <div>John Doe </div>
            <div>123 Main street </div>
            <div>New York,NY 10022 </div>
          </div>
        </div>
        <div className={Listings.exportbutton}>
          <div>Ship To</div>
          <div style={{ color: "grey", fontSize: "10px" }}>
            <div>John Doe </div>
            <div>123 Main street </div>
            <div>New York,NY 10022 </div>
          </div>
        </div>
      </div>
      <div className={Listings.globalfiltersListing}>
        <div className={Listings.searchbaronListing}>
          <h5
            style={{ marginBottom: "2px", marginLeft: "7px", fontSize: "16px" }}
          >
            Search
          </h5>
          <div
            className={Listings.searchfieldonListing}
            style={{ marginTop: "0px" }}
          >
            <img src={SearchIcon} alt="loading..." />
            <input
              type="search"
              value={inputvalue || ""}
              onChange={inputHandle}
              placeholder="Search..."
              style={{ border: "none" }}
            />
            <label htmlFor="search" onClick={submitHandle}>
              Search
            </label>
          </div>
        </div>

        <div className={Listings.channelfilteronlisitng}>
          <div className={Listings.channnelcontaineronListing}>
            <select
              className="itemcondtion"
              name="item_condition"
              value={channelVal}
              onChange={(e) => onChangeChannel(e.target.value)}
              style={{
                color: "#888888",
                background: "#F1F1F1",
                borderRadius: "23px",
                width: "92%",
              }}
            >
              {/* <option  className="dropdown-item" >Used:Like New </option> */}
              <option>Marketplace</option>
              <option>Home Decor</option>
              <option>Industrial & Tools</option>
              <option>Personal Care</option>
              <option>Auromobiles</option>
              <option>All</option>
            </select>
            <div></div>
          </div>
          <div className={Listings.channnelcontaineronListing}>
            <select
              className="itemcondtion"
              name="item_condition"
              value={channelVal}
              onChange={(e) => onChangeChannel(e.target.value)}
              style={{
                color: "#888888",
                background: "#F1F1F1",
                borderRadius: "23px",
                width: "92%",
              }}
            >
              {/* <option  className="dropdown-item" >Used:Like New </option> */}
              <option>Status</option>
              <option>Home Decor</option>
              <option>Industrial & Tools</option>
              <option>Personal Care</option>
              <option>Auromobiles</option>
              <option>All</option>
            </select>
            <div></div>
          </div>
        </div>

        <div className={Listings.fdateonLisiting}>
          <div className={Listings.productDateonListing}>
            <span className={Listings.productDatespan}>From Date</span>{" "}
            <input
              type="date"
              style={{
                color: "#7D8D9D",
                textAlign: "center",
                paddingRight: "15px",
              }}
              placeholder="dd-mm-yyyy"
              onChange={(e) => getDatefrom(e.target.value, "from")}
            />
            <span className={Listings.productDatespan}>To Date</span>{" "}
            <input
              type="date"
              style={{
                color: "#7D8D9D",
                textAlign: "center",
                paddingRight: "15px",
              }}
              placeholder="dd-mm-yyyy"
              onChange={(e) => getDatefrom(e.target.value, "to")}
            />
          </div>
        </div>
      </div>
    </>
  );
};
