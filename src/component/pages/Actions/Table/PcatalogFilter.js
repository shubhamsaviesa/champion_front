import React, { useState, useCallback } from "react";
import { useAsyncDebounce } from "react-table";
import SearchIcon from "../../../images/bookcommerceimage/Path 332.png";
import Listings from "../../../style/Actions/Listings.module.css";
import ListingTable from "../../../layout/Poppers/ListingTable";
import { DateFilterProductCatalogDataa } from "../../../../rtk/features/Action/productCatalogsSlice";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector, useDispatch } from "react-redux";
import DeleteListing from "../../Popups/ActionForDeleteAll";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import Popover from "@mui/material/Popover";
import Popper from "@mui/material/Popper";
import { BiExport } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BackspaceIcon from "@mui/icons-material/Backspace";


export const GlobalFilter = ({
  filter,
  setFilter,
  defaultData,
  multipleIdDelete,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const [value, setValue] = useState(filter);
  const [inputvalue, setInputValue] = useState("");
  const [channelVal, setChannelVal] = useState("");
  const [dateVal, setDateVal] = useState("");
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = React.useState();

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 0);

  // const onChangeChannel = useAsyncDebounce((value) => {
  //   setChannelVal(value);
  //   setFilter(value || undefined);
  // }, 0);

  // Use useCallback to avoid unnecessary re-renders
  const handleStartDateChange = useCallback((e) => {
    setStartDate(e.target.value);
  }, []);

  // Use useCallback to avoid unnecessary re-renders
  const handleEndDateChange = useCallback((e) => {
    setEndDate(e.target.value);
  }, []);

  const onChangeChannel = useAsyncDebounce((value) => {
    setChannelVal(value);
    setFilter(
      value === "All" || value === "Category" ? undefined : value || undefined
    ); // if "All" selected, clear filter
  }, 0);

  const inputHandle = (e) => {
    setInputValue(e.target.value);
  };

  const submitHandle = () => {
    setValue(inputvalue);
    onChange(inputvalue);
  };

  const clearHandle = () => {
    setValue(null);
    onChange(null);
    setInputValue("");
  };

  const onChangeDate = useAsyncDebounce((value) => {
    setDateVal(value);
    setFilter({
      ...filter,
      date: { min: value.min || "", max: value.max || "" },
    });
  }, 0);

  const handleExportPopper = (event) => {
    if (multipleIdDelete.length > 0) {
      return <ListingTable multipleIdDelete={multipleIdDelete} />;
    } else {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const clearDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setDateVal(null);
  };

  return (
    <>
      <div className={Listings.actionbutton}>
        <div className={Listings.exportbutton}>
          <button
            type="button"
            className={Listings.exportbtn}
            onClick={handleExportPopper}
          >
            {multipleIdDelete.length > 0 ? (
              <ListingTable multipleIdDelete={multipleIdDelete} />
            ) : (
              <span>
                Export Listings <BiExport size={20} />
              </span>
            )}
          </button>
        </div>
      </div>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        TransitionComponent={Fade}
      >
        <Paper>
          <div style={{ padding: "10px 20px 10px 20px" }}>
            Please select at least one item for export.
          </div>
        </Paper>
      </Popover>

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
            <ClearIcon
              sx={{ fontSize: 20, marginRight: "1rem", color: "black" }}
              onClick={clearHandle}
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
              <option>Category</option>
              <option>IndustrialAndTool</option>
              <option>Automotive</option>
              <option>Electronics </option>
              <option>HealthAndPersonal</option>
              <option>ToysCategory</option>
              <option>Media</option>
              <option>Animal</option>
              <option>MusicalInstrument</option>
              <option>Lawa&Garden</option>
              <option>Clothing</option>
              <option>Jewelry</option>
              <option>HomeDecor</option>
              <option>All</option>
            </select>
            <div></div>
          </div>
        </div>

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
