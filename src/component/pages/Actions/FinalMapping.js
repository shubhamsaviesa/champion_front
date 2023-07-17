import React, { useContext, useEffect } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Box, styled, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ActioninPalko from "../Popups/ActioninPalko";
import { finalMappingData } from "../../../rtk/features/Action/FinalMappingSlice";
import { useSelector, useDispatch } from "react-redux";
import { DataContext } from "../../context/DataProvider";

const Typography1 = styled(Typography)`
  font: normal normal medium 30px/16px Poppins;
  letter-spacing: 0px;
  width: 100%;
  text-align: center;
  color: #282c45;
  margin: 10px 0;
  font-weight: 600;
  color: #282c45;
`;
const boxStyle = {
  userSelect: "none",
  padding: 0,
  margin: "0 0 14px 0",
  minHeight: "35px",
  width: "23.5vw",
  border: "1px solid #E2E2E2",
  font: "normal normal medium 22px/13px Poppins",
  padding: "5px 0 0 20px",
  background: "white 0% 0% no-repeat padding-box",
  boxShadow: "3px 6px 20px #00000008",
  borderRadius: "4px",
};
const BoxTable = styled(Box)`
  background: #ffffff 0% 0% no-repeat padding-box;
  width: 53vw;
  margin: auto;
  height: auto;
  padding: 13px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
`;
const Btn4 = styled(Button)`
  background: #13a74b 0% 0% no-repeat padding-box;
  font: normal normal medium 19px/58px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  border-radius: 10px;
  text-transform: capitalize;
  width: 10vw;
  height: 45px;
  &:hover {
    background: #13a74b;
  }
`;
const testData = [
  { name: "Title" },
  { name: "Identifier" },
  { name: "Quantity" },
  { name: "Price" },
  { name: "Manufacturer" },
  { name: "Brand" },
  { name: "Image" },
  { name: "Size" },
];

const FinalMapping = ({ finalmappedObj, sendFinalmapping }) => {
  const { tempId, setTemplateName } = useContext(DataContext);
  const Navigation = useNavigate();
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  console.log("finalmappedObj", finalmappedObj);
  console.log("sendFinalmapping", sendFinalmapping);
  const nextHandle = () => {
    Navigation("/bulkimport");
  };

  const AddtemplateResponse = useSelector((state) => state.bulkimport);
  console.log(
    "AddtemplateResponse.bulkimportData.yourtemplate.tempName",
    AddtemplateResponse.bulkimportData.yourtemplate.tempName
  );

  return (
    <>
      <div>
        <div className="backgroundcontainer">
          <div className="headingbaronaction">
            <div className="toptableheading">
              <div className="subtoptableheadingone">
                <div>Palko Template</div>
              </div>
              <div className="subtoptableheadingone">
                <span>Actions</span>
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">Bulk Import</span>
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">Palko Template</span>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              width: "97%",
              marginTop: "20px",
            }}
          >
            <div className="dropdownnintable">
              <ActioninPalko />
            </div>
          </div>
          <Typography1>
            {AddtemplateResponse?.bulkimportData?.yourtemplate?.tempName
              ? AddtemplateResponse.bulkimportData.yourtemplate.tempName
              : "Final Mapping"}
          </Typography1>

          <BoxTable
            style={{
              background: "#FFFFFF 0% 0% no-repeat padding-box",
              boxShadow: "3px 6px 20px #00000008",
              borderRadius: "3px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {Object.entries(finalmappedObj).map(([key, value]) => {
              return (
                <Box style={{ display: "flex" }}>
                  <Box style={boxStyle}>{key}</Box>
                  <Box style={boxStyle}>{value}</Box>
                </Box>
              );
            })}
          </BoxTable>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "97%",
              marginTop: "20px",
            }}
          >
            <Btn4 onClick={nextHandle}>OK</Btn4>
          </div>
          <Box></Box>
        </div>
      </div>
    </>
  );
};

export default FinalMapping;
