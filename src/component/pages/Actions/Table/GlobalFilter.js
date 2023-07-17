import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChampionlisterFile from "../../../../file/chaimpionlistertemplate.xlsx";
import AmazonFile from "../../../../file/Amazon.xlsx";
import { useAsyncDebounce } from "react-table";
import { Select, MenuItem, styled } from "@mui/material";
import bulkimport from "../../../style/Actions/bulkimport.module.css";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { sendBulkUploadData } from "../../../../rtk/features/Action/bulkImportSlice";
export const GlobalFilter = ({ filter, setFilter }) => {
  // const {setGetTemplateListingData}=useContext(DataContext)

  const [anchorStyle, setAnchorStyle] = useState(true);

  const [value, setValue] = useState(filter);
  const [inputvalue, setInputValue] = useState("");
  const [channelVal, setChannelVal] = useState("Template");
  const [sampleVal, setSampleVal] = useState("");
  const Navigation = useNavigate();
  const customId = "custom-id-yes";
  const dispatch = useDispatch();

  const optionStyle = {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 0px 22px #8282824D",
    color: "grey",
    textAlign: "left",
    height: "10px",
  };
  const [file, setFile] = useState();
  const [tempName, setTempName] = useState("");

  //for download sample
  const onDownload = (val) => {
    const link = document.createElement("a");
    if (val === "chaimpionlistertemplate") {
      link.download = `chaimpionlistertemplate.xlsx`;
      link.href = ChampionlisterFile;
    } else if (val === "Amazon.com") {
      link.download = `Amazon.xlsx`;
      link.href = AmazonFile;
    } else {
      link.download = `Amazon.xlsx`;
      link.href = AmazonFile;
    }
    link.click();
  };

  const onChangeSample = (val) => {
    let newVal = val.substring(1);
    setSampleVal(val);
    onDownload(newVal);
  };

  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 0);

  const onChangeChannel = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 0);

  const templatedetails = useSelector(
    (state) => state.bulkimport?.bulkimportData?.templatedetails
  );

  const mappedTemplates = templatedetails?.filter(
    (template) => template.status === "Mapped"
  );

  const templateNames = mappedTemplates?.map((template) => template.tempName);

  //file upload and submit

  const uploadFileResponse = useSelector(
    (state) => state.bulkimport.bulkimportData.status
  );
  console.log("uploadFileResponse after file upload", uploadFileResponse);
  useEffect(() => {
    switch (uploadFileResponse) {
      case "succes":
        toast.success("success", {
          toastId: customId,
        });
        Navigation("/palkotemplate");

        break;
      case "failed":
        toast.error("first add template and do mapping properly.", {
          toastId: customId,
        });
        break;
      case "mapping field are not properly matched":
        toast.error("mapping field are not properly matched.", {
          toastId: customId,
        });
        break;
      case "Internal server error":
        toast.error("Backend server Crash", {
          toastId: customId,
        });
        break;
      default:
        break;
    }
  }, [uploadFileResponse]);

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      if (!tempName) {
        throw new Error("Please select the Template name");
      }
      if (!file) {
        throw new Error("Please select a file");
      }
      await dispatch(sendBulkUploadData({ file, tempName }));
    } catch (error) {
      toast.error(error.message, {
        toastId: customId,
      });
    }
  };

  return (
    <>
      <div className="actionbutton">
        <div>
          <div className="headinglisting"></div>
        </div>
        <div className={bulkimport.sampletemplate}>
          <select
            className={bulkimport.sampletemplatedropbox}
            value={sampleVal}
            onChange={(e) => onChangeSample(e.target.value)}
            style={{
              color: "#888888",
              background: "#F1F1F1",
              borderRadius: "23px",
              width: "92%",
            }}
          >
            <option className="dropdown-item">Sample Template </option>
            <option value="Walmart" style={optionStyle}>
              -Walmart
            </option>
            <option style={optionStyle}>-Amazon.com</option>
            <option style={optionStyle}>-eBay</option>
            <option style={optionStyle}>-Sears</option>
            <option style={optionStyle}>-Newegg</option>
            <option style={optionStyle}>-Wish</option>
            <option style={optionStyle}>-Biblio</option>
            <option style={optionStyle}>-eBay</option>
            <option style={optionStyle}>-Championlister</option>
          </select>
        </div>
      </div>
      <div className="globalfiltersCommon">
        <div className={bulkimport.tampleonbulkimport}>
          <div className={bulkimport.channnelcontainertwoonbulkimport}>
            <select
              className={bulkimport.itemcondtiononBulkimport}
              name="item_condition"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              style={{
                color: "#888888",
                background: "#F1F1F1",
                borderRadius: "23px",
                width: "92%",
              }}
            >
              <option value="">Champ Template</option>
              {Array.isArray(templateNames) &&
                templateNames.length > 0 &&
                templateNames.map((name, index) => {
                  return <option key={index}>{name}</option>;
                })}
            </select>

            <div></div>
          </div>
        </div>

        <div className={bulkimport.searchbaronBulkUpload}>
          <div
            className={bulkimport.searchfieldonBulkUpload}
            style={{ marginTop: "0px" }}
          >
            <label
              className={bulkimport.buttonlablebulkimport}
              htmlFor="file"
              style={{
                width: "287px",
                height: "35px",
                borderRadius: "20px",
                background: "#F1F1F1",
                justifyContent: "space-around",
                alignItems: "center",
                fontSize: "14px",
                padding: "2px",
              }}
            >
              {" "}
              {file
                ? file.name.substring(0, 20) + "..."
                : "Choose a file to upload"}
              <FileUploadRoundedIcon />
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              placeholder="Choose a file to upload"
              style={{ border: "none" }}
            />
          </div>
          <label
            className={bulkimport.buttonlablebulkimportt}
            onClick={submitHandle}
          >
            Submit
          </label>
        </div>
        <button
          className={bulkimport.addtemplate}
          onClick={() => {
            Navigation("/AddTemplate");
          }}
        >
          Add Template
          <FiPlus />
        </button>
      </div>
    </>
  );
};
