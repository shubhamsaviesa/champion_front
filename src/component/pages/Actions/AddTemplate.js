import React, { useEffect, useState, useContext } from "react";
import AddTamplate from "../../style/Actions/AddTamplete.module.css";
import { Button, styled } from "@mui/material";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  insertAddtemplateData,
  editTemplateData,
  finalEditTemplateData,
} from "../../../rtk/features/Action/bulkImportSlice";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import _ from "lodash";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { DataContext } from "../../context/DataProvider";
import Mapping from "./Mapping";

const Typography2 = styled(Typography)`
  font: normal normal normal 16px/13px Poppins;
  letter-spacing: 0px;
  color: #87859d;
  margin-bottom: 14px;
`;
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
const Box3 = styled(Box)`
  text-align: center;
  margin-top: 30px;
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

const AddTemplate = () => {
  var form = new FormData();
  const customId = "custom-id-yes";
  const Navigation = useNavigate();
  const dispatch = useDispatch();
  const { setTempId, editTempName, setEditTempName } = useContext(DataContext);
  const [yourtempDetails, setYourtempDetails] = useState([]);
  const [bookComtempDetails, setBookComtempDetails] = useState([]);
  const [tempName, setTempName] = useState("");
  const [showMapping, setShowMapping] = useState(true);
  const initialValues = {
    tempName: "",
    abbrevation: "",
    category: "",
    subcategory: "",
    file: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [file, setFile] = useState("");
  const AddtemplateResponse = useSelector(
    (state) => state.bulkimport?.bulkimportData?.status
  );
  console.log("AddtemplateResponse", AddtemplateResponse);

  useEffect(() => {
    switch (AddtemplateResponse) {
      case "success":
        // setYourtempDetails(response?.data.yourtemplate.tags);
        // setBookComtempDetails(response?.data.bookcommercetemplate);
        // setTempId(response?.data.yourtemplate._id);
        // setTempName(response?.data.yourtemplate.Templatename);
        // setShowMapping(false);
        console.log("in swich case");
        toast.success("Template Added Successfully", {
          toastId: customId,
        });
        Navigation("/Mapping"); // <-- This function should be defined or imported properly
        break;
      case "template name already exists":
        toast.error("Give different template name.", {
          toastId: customId,
        });
        break;
      case "Invalid filename extension":
        toast.error("Invalid filename extension! Give only XLSX or XLS.", {
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
  }, [AddtemplateResponse]);

  const handleAddtemplateInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const requiredFields = ["tempName", "abbrevation", "category", "subcategory"];

  //call when click on Next Button
  const handleNext = async (e) => {
    e.preventDefault();
    const hasEmptyFields = requiredFields.some(
      (fieldName) => !formValues[fieldName]
    );
    if (hasEmptyFields) {
      toast.error("Please fill all the required fields", {
        toastId: customId,
      });
      return;
    }
    if (!file) {
      toast.warn("Please select a file");
      return;
    }
    const form = new FormData();
    form.append("tempName", formValues.tempName);
    form.append("abbrevation", formValues.abbrevation);
    form.append("category", formValues.category);
    form.append("subcategory", formValues.subcategory);
    form.append("file", file);
    try {
      dispatch(insertAddtemplateData(form)).then(() => {
        // console.log("response after add template", response);
        switch (AddtemplateResponse) {
          case "success":
            // setYourtempDetails(response?.data.yourtemplate.tags);
            // setBookComtempDetails(response?.data.bookcommercetemplate);
            // setTempId(response?.data.yourtemplate._id);
            // setTempName(response?.data.yourtemplate.Templatename);
            // setShowMapping(false);
            console.log("in swich case");
            toast.success("Template Added Successfully", {
              toastId: customId,
            });
            Navigation("/Mapping"); // <-- This function should be defined or imported properly
            break;
          case "template name already exists":
            toast.error("Give different template name.", {
              toastId: customId,
            });
            break;
          case "Invalid filename extension":
            toast.error("Invalid filename extension! Give only XLSX or XLS.", {
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
      });
    } catch (error) {
      toast.error(error.message, {
        toastId: customId,
      });
    }
  };

  const cancel_Handle = () => {
    setEditTempName("");
    Navigation("/bulkimport");
  };

  return (
    <>
      {showMapping ? (
        <div>
          <div className="headingbar">
            <div className="toptableheading">
              <div
                style={{ position: "relative", left: "2.5%", fontSize: "15px" }}
              >
                <div>Add Template</div>
              </div>
              <div
                style={{ position: "relative", right: "4%", fontSize: "15px" }}
              >
                <span>Actions</span>{" "}
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">Bulk Import</span>
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">Add Template</span>
              </div>
            </div>
          </div>
          <div className={AddTamplate.ContaineronBulkupload}>
            <div>
              <div className={AddTamplate.addtempateform}>
                <form>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>
                        <div>
                          <label htmlFor="text"></label>
                        </div>
                      </div>
                      <div>
                        <input
                          placeholder="Template Name*"
                          name="tempName"
                          value={formValues.tempName}
                          onChange={handleAddtemplateInput}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>
                        <div>
                          <label htmlFor="text"></label>
                        </div>
                      </div>
                      <div>
                        <input
                          placeholder="abbrevation*"
                          name="abbrevation"
                          value={formValues.abbrevation}
                          onChange={handleAddtemplateInput}
                        />
                      </div>
                    </div>

                    <div>
                      <div>
                        <label htmlFor="text"></label>
                      </div>
                    </div>
                    <div>
                      <select
                        name="category"
                        value={formValues.category}
                        onChange={handleAddtemplateInput}
                        style={{
                          border: "none",
                          background: "#F6F7F8 0% 0% no-repeat padding-box",
                          borderRadius: "9px",
                          width: "40vw",
                          height: "5.3vh",
                          padding: "3px 11px",
                        }}
                      >
                        <option>Category*</option>
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
                      </select>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <div>
                        <label htmlFor="text"></label>
                      </div>
                    </div>
                    <div>
                      <select
                        name="subcategory"
                        value={formValues.subcategory}
                        onChange={handleAddtemplateInput}
                        style={{
                          border: "none",
                          background: "#F6F7F8 0% 0% no-repeat padding-box",
                          borderRadius: "9px",
                          width: "40vw",
                          height: "5.3vh",
                          padding: "3px 11px",
                        }}
                      >
                        <option>Subcategory*</option>
                        <option>MedicalAids</option>
                        <option>Optical</option>
                        <option>Beauty,PersonalCare,Hygein</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <div>
                        <Typography2></Typography2>
                      </div>
                    </div>
                    <div>
                      <div>
                        <Box
                          style={{
                            background: "#F6F7F8 0% 0% no-repeat padding-box",
                            display: "flex",
                            justifyContent: "space-between",
                            borderRadius: "9px",
                            height: "5vh",
                            padding: "0 0px 8px 10px",
                          }}
                          onClick={() =>
                            document.getElementById("file").click()
                          }
                        >
                          <input
                            type="file"
                            id="file"
                            name="file"
                            onChange={fileHandler}
                            style={{ display: "none" }}
                          />
                          <label style={{ marginTop: "8px" }} htmlFor="file">
                            {file
                              ? file.name
                                ? file.name.substring(0, 20) + "..."
                                : ""
                              : "Choose File*"}
                          </label>
                          <label style={{ marginTop: "8px" }} htmlFor="file">
                            <FileUploadIcon />
                          </label>
                        </Box>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "40vw",
                      textAlign: "center",
                      marginTop: "45px",
                      borderColor: "red",
                    }}
                  >
                    <Box3>
                      <Btn onClick={cancel_Handle}>Cancel</Btn>
                      <Btn1 type="submit" onClick={handleNext}>
                        Next
                      </Btn1>
                    </Box3>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Mapping
          tempName={tempName}
          bookComtempDetails={bookComtempDetails}
          yourtempDetails={yourtempDetails}
        />
      )}
    </>
  );
};

export default AddTemplate;
