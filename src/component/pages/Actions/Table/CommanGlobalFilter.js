import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { BiExport } from "react-icons/bi";
import SearchIcon from "../../../images/bookcommerceimage/Path 332.png";
import productcatalog from "../../../style/Actions/ProductCatalog.module.css";
import GlobalActionPopper from "../../../layout/Poppers/GlobalActionPopper";
import DeleteListing from "../../../layout/Poppers/ExportListing";

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

  return (
    <>
      <div className="actionbutton">
        <div>
          <div className="headinglisting"></div>
        </div>
        <div className="exportbutton">
          <button type="button" className={productcatalog.exportbtn}>
            <DeleteListing />
          </button>
        </div>
      </div>
      <div className="globalfiltersCommon">
        <div className="searchbar">
          <h5
            style={{ marginBottom: "2px", marginLeft: "7px", fontSize: "16px" }}
          >
            Search
          </h5>
          <div className="searchfield" style={{ marginTop: "0px" }}>
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

        <div className="channelfilter">
          <div className="channnelcontainertwo">
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
              <option>Category</option>
              <option>Home Decor</option>
              <option>Industrial & Tools</option>
              <option>Personal Care</option>
              <option>Auromobiles</option>
              <option>All</option>
            </select>
            <div></div>
          </div>
        </div>
        <div className="fdate">
          <div className="productDate1">
            <span>From Date</span>{" "}
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
            <span>To Date</span>{" "}
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
