import React, { useEffect, useState, useContext } from "react";
import AddTamplate from "../../style/Actions/AddTamplete.module.css";
import { Button, styled } from "@mui/material";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  insertAddtemplateData,
  editTemplateData,
  GetBulkImportDataId,
  insertEditedtemplateData,
} from "../../../rtk/features/Action/bulkImportSlice";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import _ from "lodash";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { DataContext } from "../../context/DataProvider";
import Mapping from "./Mapping";
import { useParams } from "react-router-dom";

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

// const EditTemplate = () => {
//   const initialValues = {
//     tempName: "",
//     abbrevation: "",
//     category: "",
//     subcategory: "",
//     file: "",
//   };
//   const Navigation = useNavigate();
//   const { id } = useParams();
//   const customId = "custom-id-yes";
//   const [formValues, setFormValues] = useState(initialValues);

//   const AddtemplateResponse = useSelector(
//     (state) => state.bulkimport.bulkimportData.status
//   );
//   console.log("AddtemplateResponse", AddtemplateResponse);

//   const EdittemplateResponse = useSelector((state) => state.bulkimport);
//   console.log("EditemplateResponse", EdittemplateResponse);

//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     handleAddtemplateResponse(AddtemplateResponse);
//   }, [AddtemplateResponse]);

//   useEffect(() => {
//     if (status) {
//       toast(status);
//       setStatus("");
//     }
//   }, [status]);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(GetBulkImportDataId(id));
//   }, []);

//   useEffect(() => {
//     const product = EdittemplateResponse?.bulkimportData;
//     if (product) {
//       setFormValues(product);
//     } else {
//       setFormValues(initialValues);
//     }
//   }, [id, EdittemplateResponse]);

//   var form = new FormData();
//   const { setTempId, editTempName, setEditTempName } = useContext(DataContext);
//   const [yourtempDetails, setYourtempDetails] = useState([]);
//   const [bookComtempDetails, setBookComtempDetails] = useState([]);
//   const [tempName, setTempName] = useState("");
//   const [showMapping, setShowMapping] = useState(true);

//   const [file, setFile] = useState("");

//   console.log("formValues", formValues);

//   const handleAddtemplateInput = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const fileHandler = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const requiredFields = ["tempName", "abbrevation", "category", "subcategory"];

//   //call when click on Save Button
//   const submitEditedData = async (e) => {
//     e.preventDefault();
//     const hasEmptyFields = requiredFields.some(
//       (fieldName) => !formValues[fieldName]
//     );
//     if (hasEmptyFields) {
//       toast.error("Please fill all the required fields", {
//         toastId: customId,
//       });
//       return;
//     }
//     if (!file) {
//       toast.warn("Please select a file");
//       return;
//     }

//     try {
//       dispatch(insertEditedtemplateData(formValues)).then(() => {
//         handleAddtemplateResponse(AddtemplateResponse);
//       });
//     } catch (error) {
//       toast.error(error.message, {
//         toastId: customId,
//       });
//     }
//   };

//   const handleAddtemplateResponse = (response) => {
//     switch (response) {
//       case "success":
//         toast.success("Template Edited Successfully", {
//           toastId: customId,
//         });
//         Navigation("/bulkimport");
//         break;
//       case "Template Name Already Exist":
//         toast.error("Give different template name.", {
//           toastId: customId,
//         });
//         break;
//       case "Invalid filename extension":
//         toast.error("Invalid filename extension! Give only XLSX or XLS.", {
//           toastId: customId,
//         });
//         break;
//       case "Internal server error":
//         toast.error("Backend server Crash", {
//           toastId: customId,
//         });
//         break;
//       default:
//         break;
//     }
//   };

const EditTemplate = () => {
  const initialValues = {
    tempName: "",
    abbrevation: "",
    category: "",
    subcategory: "",
    file: "",
  };
  const Navigation = useNavigate();
  const { id } = useParams();
  const customId = "custom-id-yes";
  const [formValues, setFormValues] = useState(initialValues);

  const AddtemplateResponse = useSelector(
    (state) => state.bulkimport.bulkimportData.status
  );
  console.log("AddtemplateResponse", AddtemplateResponse);

  const EdittemplateResponse = useSelector((state) => state.bulkimport);
  console.log("EditemplateResponse", EdittemplateResponse);

  const [status, setStatus] = useState("");

  useEffect(() => {
    handleAddtemplateResponse(AddtemplateResponse);
  }, [AddtemplateResponse]);

  useEffect(() => {
    if (status) {
      toast(status);
      setStatus("");
    }
  }, [status]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetBulkImportDataId(id));
  }, [dispatch, id]);

  useEffect(() => {
    const product = EdittemplateResponse?.bulkimportData;
    console.log("product in edit", product);
    if (product) {
      setFormValues(product);
    } else {
      setFormValues(initialValues);
    }
  }, [id, EdittemplateResponse]);

  const [yourtempDetails, setYourtempDetails] = useState([]);
  const [bookComtempDetails, setBookComtempDetails] = useState([]);
  const [tempName, setTempName] = useState("");
  const [showMapping, setShowMapping] = useState(true);

  const [file, setFile] = useState("");

  console.log("formValues", formValues);

  const handleAddtemplateInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const requiredFields = ["tempName", "abbrevation", "category", "subcategory"];

  //call when click on Save Button
  const submitEditedData = async (e) => {
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

    try {
      dispatch(insertEditedtemplateData(formValues)).then(() => {
        handleAddtemplateResponse(AddtemplateResponse);
      });
    } catch (error) {
      toast.error(error.message, {
        toastId: customId,
      });
    }
  };

  const handleAddtemplateResponse = (response) => {
    switch (response) {
      case "success":
        toast.success("Template Edited Successfully", {
          toastId: customId,
        });
        Navigation("/bulkimport");
        break;
      case "Template Name Already Exist":
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
  };

  const cancel_Handle = () => {
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
                <div>Edit Template</div>
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
                <span className="subMenu_subheading">Edit Template</span>
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
                          placeholder="Template Name"
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
                          placeholder="abbrevation"
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
                        <option>Category</option>
                        <option>Excel</option>
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
                        <option>Subcategory</option>
                        <option>By Date</option>
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
                        >
                          <input
                            type="file"
                            id="file"
                            name="file"
                            // value={formValues.templatefile}
                            onChange={fileHandler}
                          />
                          <label style={{ marginTop: "8px" }} htmlFor="file">
                            {file
                              ? file.name
                                ? file.name.substring(0, 20) + "..."
                                : ""
                              : "Choose File"}
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
                      <Btn1 type="submit" onClick={submitEditedData}>
                        Save
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

export default EditTemplate;
