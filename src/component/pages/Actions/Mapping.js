import React, { useCallback, useEffect, useState, useContext } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Box, styled, Typography, Button } from "@mui/material";
import { v4 as uuid } from "uuid";
import FinalMapping from "./FinalMapping";
import { finalMappingData } from "../../../rtk/features/Action/FinalMappingSlice";
import { useSelector, useDispatch } from "react-redux";
import { SendMappingDataId } from "../../../rtk/features/Action/bulkImportSlice";
import _ from "lodash";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import AxiosInstance from "../../../Api/AxiosInstance";
import { DataContext } from "../../context/DataProvider";
import { toast } from "react-toastify";

const Box1 = styled(Box)`
  background: #f5f5f5 0% 0% no-repeat padding-box;
  border-radius: 25px;
`;
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
  width: 40vw;
  background: #ffffff 0% 0% no-repeat padding-box;
  margin: auto;
  padding: 13px;
  box-shadow: 3px 6px 20px #00000008;
  border-radius: 35px;
  display: block;
`;
const Btn3 = styled(Button)`
  background: #e2e2e2 0% 0% no-repeat padding-box;
  font: normal normal medium 19px/58px Poppins;
  margin-right: 2%;
  letter-spacing: 0px;
  color: #282c45;
  border-radius: 10px;
  text-transform: capitalize;
  width: 10vw;
  height: 45px;
  &:hover {
    background: #e2e2e2;
  }
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
const Mapping = () => {
  const { tempId, setTemplateName } = useContext(DataContext);
  const customId = "custom-id-yes";
  const FinalMappingDataResponse = useSelector((state) => state.FinalMapping);
  // console.log("FinalMappingDataResponse", FinalMappingDataResponse);
  const dispatch = useDispatch();

  const AddtemplateResponse = useSelector((state) => state.bulkimport);
  console.log("AddtemplateResponse ", AddtemplateResponse);
  const [showFinalMapping, setShowFinalMapping] = useState(true);
  const [matchObj, setMatchObj] = useState([]);
  const [itemsLeft, setItemsLeft] = useState([]);
  const [itemsRight, setItemsRight] = useState([]);
  const [combinedItems, setCombinedItems] = useState({
    columnLeft: {
      name: "Your Template",
      items: itemsLeft,
    },
    columnRight: {
      name: "Championlister Template",
      items: itemsRight,
    },
  });
  const mandatoryFields = [
    "CostPrice",
    "UPC",
    "ProductName",
    "Manufracturer",
    "ImageUrl",
    "SKU",
    "Quantity",
    "SellingPrice",
  ];
  const [finalmappedObj, setFinalmappedObj] = useState({
    SKU: "",
    UPC: "",
    ASIN: "",
    Description: "",
    Brand: "",
    Height: "",
    Length: "",
    Width: "",
    Manufracturer: "",
    CostPrice: "",
    ImageUrl: "",
    ManufracturerPartNum: "",
    ProductName: "",
    Quantity: "",
    SellingPrice: "",
  });

  console.log("finalmappedObj", finalmappedObj);

  const [sendFinalmapping, setSendFinalmapping] = useState([]);
  const getVariousTemp = () => {
    if (AddtemplateResponse.bulkimportData.yourtemplate.tags) {
      AddtemplateResponse.bulkimportData.yourtemplate.tags.map((val, ind) => {
        if (val !== null) {
          return itemsLeft.push({ id: `drag${ind}`, content: val });
        }
      });
      Object.entries(AddtemplateResponse.bulkimportData.chaimpionlistertemplate)
        .filter(([key]) => key !== "_id")
        .map((entry, ind) => {
          let key = entry[0];
          return itemsRight.push({
            id: `drop${ind}`,
            content: key,
            disableDrag: true,
          });
        });
    }
  };

  useEffect(() => {
    getVariousTemp();
  }, [AddtemplateResponse.bulkimportData.chaimpionlistertemplate]);

  useEffect(() => {
    setCombinedItems((combinedItems) => ({
      ...combinedItems,
      ["columnLeft"]: {
        name: "Your Template",
        items: itemsLeft,
      },
      ["columnRight"]: {
        name: "ChaimpionLister Template",
        items: itemsRight,
      },
    }));
  }, [itemsLeft, AddtemplateResponse.bulkimportData.chaimpionlistertemplate]);

  const [columns, setColumns] = useState(combinedItems);
  const [open, setOpen] = useState(false);
  const [openDisable, setOpenDisable] = useState(false);
  const [enableNextBtn, setEnableNextBtn] = useState(false);
  console.log("enableNextBtn", enableNextBtn);
  useEffect(() => {
    // Check if all mandatory fields are present in the finalmappedObj object
    const isAllMandatoryFieldsMapped = mandatoryFields.every(
      (field) => finalmappedObj[field] !== ""
    );

    console.log("isAllMandatoryFieldsMapped", isAllMandatoryFieldsMapped);

    setEnableNextBtn(isAllMandatoryFieldsMapped);
  }, [finalmappedObj, mandatoryFields]);

  const nextHandleDis = () => {
    console.log("nextbutton is it");
    toast.warn("Please map all mandatory fields first");
    setOpenDisable(!openDisable);
  };

  const nextHandle = () => {
   const headers = {
  Authorization: localStorage.getItem("token"),
  "Content-Type": "application/json",
};
    // Check if all mandatory fields are present in the finalmappedObj object
    const isAllMandatoryFieldsMapped = mandatoryFields.every(
      (field) => finalmappedObj[field] !== ""
    );

    if (isAllMandatoryFieldsMapped) {
      // Call the API
      try {
        AxiosInstance({
          url: `/mapTemplate/${AddtemplateResponse.bulkimportData.yourtemplate._id}`,
          method: "POST",
          data: finalmappedObj,
          headers:headers,
        }).then((response) => {
          console.log("context", response);
          if (response.data.status === "succes") {
            setTemplateName(response.data.tempname);
            setSendFinalmapping(response.data.result);
            setShowFinalMapping(false);
          }
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      // Show a toast error message
      console.log("Please map all mandatory fields first");
      toast.warn("Please map all mandatory fields first");
    }
  };

  const onDragEnd = (result) => {
    if (result.combine) {
      const { draggableId } = result;
      const dropedId = result.combine.draggableId;
      const dragIndex = itemsLeft.findIndex((item) => item.id === draggableId);
      const dropIndex = itemsRight.findIndex((item) => item.id === dropedId);
      const draggetItem = itemsLeft[dragIndex];
      const sourceItem = itemsRight[dropIndex];
      const newLeftArr = itemsLeft;
      newLeftArr.splice(dragIndex, 1);
      setItemsLeft(newLeftArr);
      const newRightArr = itemsRight;
      newRightArr.splice(dropIndex, 1);
      setItemsRight(newRightArr);
      setMatchObj([
        ...matchObj,
        { left: draggetItem.content, right: sourceItem.content },
      ]);
    }
    if (!result.destination) return;
  };

  const removeItemHandle = (valLeft, ind, valRight) => {
    let newMatchObj = matchObj.filter((item) => {
      return item.left !== valLeft;
    });
    setFinalmappedObj((finalobj) => {
      return { ...finalobj, [valRight]: "" };
    });
    setMatchObj(newMatchObj);
    itemsLeft.push({ content: valLeft, id: `drag100${ind}` });
    itemsRight.push({
      content: valRight,
      id: `drop100${ind}`,
      disableDrag: true,
    });
  };

  useEffect(() => {
    matchObj.map((item) => {
      return setFinalmappedObj((finalobj) => {
        return { ...finalobj, [item.right]: item.left };
      });
    });
  }, [matchObj]);

  // itemsLeft, AddtemplateResponse.bulkimportData.chaimpionlistertemplate

  // setTempId(response.data.yourtemplate._id)
  return (
    <>
      {showFinalMapping ? (
        <div
          style={{
            position: "relative",
            top: "0%",
            left: "15.8%",
            width: "84vw",
            height: "244vh",
            background: "#F6F6F6 0% 0% no-repeat padding-box",
          }}
        >
          <div
            className="toptableheading"
            style={{
              backgroundColor: "#ffffff",
              paddingTop: "29px",
              paddingLeft: "10px",
            }}
          >
            <div style={{ position: "relative", fontSize: "19px" }}>
              <div className="subtoptableheadingone">Mapping</div>
            </div>
            <div
              style={{ position: "relative", right: "2.7%" }}
              className="subtoptableheadingone"
            >
              <span>Inventory</span>{" "}
              <span>
                <MdOutlineArrowForwardIos />
              </span>{" "}
              <span className="subMenu_subheading">Bulk Upload </span>
              <span>
                <MdOutlineArrowForwardIos />{" "}
              </span>
              <span className="subMenu_subheading">Add Template</span>
              <span>
                <MdOutlineArrowForwardIos />
              </span>
              <span className="subMenu_subheading">Mapping</span>
            </div>
          </div>

          <Box
            style={{
              display: "flex",
              width: "70vw",
              justifyContent: "space-around",
              position: "relative",
              left: "7%",
            }}
          >
            {itemsLeft.length > 0 && itemsRight.length > 0 ? (
              <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
              >
                {Object.entries(columns).map(([columnId, column], index) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      key={columnId}
                    >
                      <Typography1>{column.name}</Typography1>
                      <div style={{ margin: 8 }}>
                        <Droppable
                          droppableId={columnId}
                          /* isDropDisabled */
                          key={columnId}
                          isCombineEnabled
                        >
                          {(provided, snapshot) => {
                            return (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                  background: snapshot.isDraggingOver
                                    ? "#FFFFFF"
                                    : "#FFFFFF",
                                  padding: "20px 0 10px 20px",
                                  width: 400,
                                  minHeight: 500,
                                  borderRadius: 6,
                                }}
                              >
                                {column.items.map((item, index) => {
                                  return (
                                    <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={index}
                                      isDragDisabled={item?.disableDrag}
                                    >
                                      {(provided, snapshot) => {
                                        return (
                                          <Box1
                                            key={item.id}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                              userSelect: "none",
                                              padding: 0,
                                              margin: "0 0 14px 0",
                                              minHeight: "30px",
                                              width: "23.5vw",
                                              border: "1px solid #E2E2E2",
                                              font: "normal normal medium 22px/13px Poppins",
                                              padding: "5px 0 0 20px",
                                              ...provided.draggableProps.style,
                                            }}
                                          >
                                            {item.content}
                                          </Box1>
                                        );
                                      }}
                                    </Draggable>
                                  );
                                })}
                                {provided.placeholder}
                              </div>
                            );
                          }}
                        </Droppable>
                      </div>
                    </div>
                  );
                })}
              </DragDropContext>
            ) : null}
          </Box>
          <Typography1>
            {AddtemplateResponse.bulkimportData.yourtemplate.tempName}
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
            {AddtemplateResponse.bulkimportData.chaimpionlistertemplate &&
              Object.entries(
                AddtemplateResponse.bulkimportData.chaimpionlistertemplate
              ).map((entry, ind) => {
                let key = entry[0];
                if (key !== "_id") {
                  return (
                    <Box style={{ display: "flex" }}>
                      <Box style={boxStyle}>
                        {key}
                        {mandatoryFields.includes(key) && (
                          <span style={{ color: "red" }}>*</span>
                        )}
                      </Box>
                      <Box style={boxStyle}>
                        {matchObj.length > 0 &&
                          matchObj.map((item, ind) => {
                            if (key === item.right) {
                              return (
                                <div style={{ textAlign: "left" }} key={ind}>
                                  {item.left}
                                  <IoIosRemoveCircleOutline
                                    style={{ float: "right", color: "#D32400" }}
                                    onClick={() =>
                                      removeItemHandle(
                                        item.left,
                                        ind,
                                        item.right
                                      )
                                    }
                                  />
                                </div>
                              );
                            }
                          })}
                      </Box>
                    </Box>
                  );
                }
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
            <Btn3>Cancel</Btn3>
            {enableNextBtn ? (
              <Btn4 onClick={nextHandle}>Next</Btn4>
            ) : (
              <Btn3 onClick={nextHandleDis}>Next</Btn3>
            )}
          </div>
          <Box></Box>
        </div>
      ) : (
        <FinalMapping
          finalmappedObj={finalmappedObj}
          sendFinalmapping={sendFinalmapping}
        />
      )}
    </>
  );
};

export default Mapping;
