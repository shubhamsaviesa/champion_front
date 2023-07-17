import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Box, styled, Typography, Button } from "@mui/material";
import MappingPopup from "./MappingPopup";
import FinalMapping from "./Finalmapping";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { DataContext } from "../context/DataProvider";
import axiosInstance from "../../service/axiosInstance";

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
  margin: "0 0px 14px 10px",
  minHeight: "30px",
  width: "17.5vw",
  border: "1px solid #E2E2E2",
  font: "normal normal medium 22px/13px Poppins",
  display: "flex",
  justifyContent: "space-between",
  padding: "5px 14px 0 20px",
  background: "#F5F5F5 0% 0% no-repeat padding-box",
  boxShadow: "3px 6px 20px #00000008",
  borderRadius: "35px",
};

const ButtonRemov = styled(Button)`
  width: 70px;
  height: 26px;
  background: red;
`;

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

function BulkUploadAddTemplateMapping({
  yourtempDetails,
  bookComtempDetails,
  tempName,
  getprops,
}) {
  const { tempId, setTemplateName, setTopHeader } = useContext(DataContext);
  useEffect(() => setTopHeader("Inventory"), []);
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
      name: "Bookcommerce Template",
      items: itemsRight,
    },
  });
  const [finalmappedObj, setFinalmappedObj] = useState({
    Bookname: "",
    Description: "",
    Sku: "",
    Title: "",
    Quantity: "",
    Costprice: "",
    Profit: "",
    Edition: "",
    Volume: "",
    Author: "",
    Publisher: "",
    Itemcondition: "",
    ISBN_ASIN_UPC: "",
  });
  const [sendFinalmapping, setSendFinalmapping] = useState([]);

  //this is for updating itemsLeft and itemsRight according to backend respons
  const getVariousTemp = () => {
    if (yourtempDetails) {
      yourtempDetails.map((val, ind) => {
        if (val !== null) {
          return itemsLeft.push({ id: `drag${ind}`, content: val });
        }
      });
      delete bookComtempDetails._id;
      Object.entries(bookComtempDetails).map((entry, ind) => {
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
  }, [bookComtempDetails]);

  useEffect(() => {
    setCombinedItems((combinedItems) => ({
      ...combinedItems,
      ["columnLeft"]: {
        name: "Your Template",
        items: itemsLeft,
      },
      ["columnRight"]: {
        name: "Bookcommerce Template",
        items: itemsRight,
      },
    }));
  }, [itemsLeft, bookComtempDetails]);

  const [columns, setColumns] = useState(combinedItems);
  const [open, setOpen] = useState(false);
  const [openDisable, setOpenDisable] = useState(false);
  const [enableNextBtn, setEnableNextBtn] = useState(true);
  useEffect(() => {
    if (
      finalmappedObj.Bookname !== "" &&
      finalmappedObj.ISBN_ASIN_UPC !== "" &&
      finalmappedObj.Description !== "" &&
      finalmappedObj.Title !== "" &&
      finalmappedObj.Quantity !== "" &&
      finalmappedObj.Itemcondition !== "" &&
      finalmappedObj.Author !== "" &&
      finalmappedObj.Costprice !== ""
    ) {
      setEnableNextBtn(false);
    } else {
      setEnableNextBtn(true);
    }
  }, [finalmappedObj]);

  const nextHandleDis = () => {
    setOpenDisable(!openDisable);
  };

  const nextHandle = async () => {
    if (
      finalmappedObj.Bookname !== "" &&
      finalmappedObj.ISBN_ASIN_UPC !== "" &&
      finalmappedObj.Description !== "" &&
      finalmappedObj.Title !== "" &&
      finalmappedObj.Quantity !== "" &&
      finalmappedObj.Itemcondition !== "" &&
      finalmappedObj.Author !== "" &&
      finalmappedObj.Costprice !== ""
    ) {
      try {
        await axiosInstance({
          url: `/mapTemplate/${tempId}`,
          method: "POST",
          data: finalmappedObj,
        }).then((response) => {
          if (response.data.status === "succes") {
            setTemplateName(response.data.tempname);
            setSendFinalmapping(response.data.result);
            setShowFinalMapping(false);
          }
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      setOpen(!open);
    }
  };

  // this is for dragging and dropping
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

  //this is for removing maaped items
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

  return (
    <>
      {showFinalMapping ? (
        <div
          style={{
            position: "relative",
            top: "0%",
            left: "15.8%",
            width: "83.3vmax",
            height: "auto",
            background: "#F6F6F6 0% 0% no-repeat padding-box",
            paddingBottom: "20px",
          }}
        >
          <div className="toptableheading">
            <div
              style={{ position: "relative", left: "2.5%", fontSize: "19px" }}
            >
              <div>Mapping</div>
            </div>
            <div style={{ position: "relative", right: "2.7%" }}>
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
          <Typography1>{tempName}</Typography1>

          <BoxTable>
            {bookComtempDetails &&
              Object.entries(bookComtempDetails).map((entry, ind) => {
                let key = entry[0];
                return (
                  <Box style={{ display: "flex" }}>
                    <Box style={boxStyle}>{key}</Box>
                    <Box style={boxStyle}>
                      {matchObj.length > 0 &&
                        matchObj.map((item, ind) => {
                          if (key === item.right) {
                            return (
                              <>
                                {" "}
                                {item.left}{" "}
                                <ButtonRemov
                                  variant="contained"
                                  onClick={() =>
                                    removeItemHandle(item.left, ind, item.right)
                                  }
                                >
                                  Remove
                                </ButtonRemov>{" "}
                              </>
                            );
                          }
                        })}
                    </Box>
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
              marginBottom: "50px",
            }}
          >
            <Btn3
              onClick={() => {
                getprops(true);
              }}
            >
              Cancel
            </Btn3>
            {enableNextBtn ? (
              <Btn3 onClick={nextHandleDis}>Next</Btn3>
            ) : (
              <Btn4 onClick={nextHandle}>Next</Btn4>
            )}
          </div>
          <Box></Box>

          <MappingPopup valueprop={open} valueprop2={openDisable} />
        </div>
      ) : (
        <FinalMapping
          finalmappedObj={finalmappedObj}
          sendFinalmapping={sendFinalmapping}
          tempName={tempName}
        />
      )}
    </>
  );
}

export default BulkUploadAddTemplateMapping;








