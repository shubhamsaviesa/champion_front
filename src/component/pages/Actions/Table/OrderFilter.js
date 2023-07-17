import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { BiExport } from "react-icons/bi";
import SearchIcon from "../../../images/bookcommerceimage/Path 332.png";
import Listings from "../../../style/Actions/Listings.module.css";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ExportListingTable from "../../../layout/Poppers/ExportListingTable";
import AddOrder from "../../../layout/Poppers/AddOrder";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BackspaceIcon from "@mui/icons-material/Backspace";
export const GlobalFilter = ({
  filter,
  setFilter,
  getDatefrom,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const [value, setValue] = useState(filter);
  const [inputvalue, setInputValue] = useState("");
  const [channelVal, setChannelVal] = useState("");
  const [dateVal, setDateVal] = useState("");

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 0);

  const onChangeChannel = useAsyncDebounce((value) => {
    setChannelVal(value);
    setFilter(
      value === "All" || value === "Channels" ? undefined : value || undefined
    ); // if "All" selected, clear filter
  }, 0);

  const onChangeCategory = useAsyncDebounce((value) => {
    setChannelVal(value);
    setFilter(
      value === "All" || value === "Category" ? undefined : value || undefined
    ); // if "All" selected, clear filter
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
  const clearDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setDateVal(null);
  };

  const handleExportPopper = () => {};

  return (
    <>
      <div className={Listings.actionbutton}>
        <div className={Listings.exportbutton}>
          <button
            type="button"
            className={Listings.exportbtn}
            onClick={handleExportPopper}
          >
            <AddOrder />
          </button>
        </div>
      </div>
      <div className={Listings.globalfiltersListing}>
        <div className={Listings.searchbaronListing}>
          <div
            className={Listings.searchfieldonListing}
            style={{ marginTop: "16px" }}
          >
            <img src={SearchIcon} alt="loading..." />
            <input
              type="search"
              value={inputvalue || ""}
              onChange={inputHandle}
              placeholder="Search..."
              style={{ border: "none", outline: "none" }}
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
              <option>Channels</option>
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
              onChange={(e) => onChangeCategory(e.target.value)}
              style={{
                color: "#888888",
                background: "#F1F1F1",
                borderRadius: "23px",
                width: "92%",
              }}
            >
              {/* <option  className="dropdown-item" >Used:Like New </option> */}
              <option>Category</option>
              <option>Home Decor</option>
              <option>electric</option>
              <option>Industrial & Tools</option>
              <option>Personal Care</option>
              <option>Auromobiles</option>
              <option>All</option>
            </select>
            <div></div>
          </div>
        </div>

        {/* <div className={Listings.fdateonLisiting}>
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
        </div> */}
        <div
          className={` ${Listings.fdateonLisiting} custom-datepicker-wrapper`}
          style={{ marginRight: "3%" }}
        >
          <div className={Listings.productDateonListing}>
            <span className={Listings.productDatespan}>From Date:</span>{" "}
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText=" 25/02/2023"
              style={{ fontSize: "14px", color: "black", width: "50%" }}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
            />
            <CalendarMonthIcon style={{ marginLeft: "6px" }} />
          </div>
          <div className={Listings.productDateonListing}>
            <span className={Listings.productDatespan}>To Date:</span>{" "}
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholderText=" 25/03/2023"
              style={{ fontSize: "14px", color: "black" }}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
            />
            <CalendarMonthIcon style={{ marginLeft: "4px" }} />
          </div>
          <span onClick={clearDateFilter} className={Listings.clearDateSpan}>
            <BackspaceIcon />
          </span>
        </div>
      </div>
    </>
  );
};
