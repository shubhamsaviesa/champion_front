import React, { useContext, useState, useEffect } from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Success from "../../images/success.png";
import "../../style/Popup/sucessPopup.css";
import { BiExport } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosInstance from "../../../Api/AxiosInstance";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { DataContext } from "../../context/DataProvider";

const Box2 = styled(Box)`
  display: flex;
  width: 60vw;
  height: 6vh;
  margin: 10px 0;
  & div {
    width: 14vw;
    height: 4vh;
    font: normal normal normal 18px/33px Poppins;
    letter-spacing: 0px;
    text-align: left;
    padding-left: 64px;
    color: #000000;
  }
`;
const Box3 = styled(Box)`
  display: flex;
  & div {
    width: 15vw;
    height: 6vh;
    font: normal normal normal 18px/33px Poppins;
    letter-spacing: 0px;
    text-align: left;
    padding: 4px 0px 4px 0px;
    color: #000000;
  }
`;
const Box4 = styled(Box)`
  display: flex;
  width: 67vw;
  height: 5vh;
  background: #ffffff 0% 0% no-repeat padding-box;
  margin: 20px 0;
  border-radius: 10px;
`;
const Typography1 = styled(Typography)`
  font: normal normal bold 20px/38px Poppins;
  letter-spacing: 0px;
  color: #000000;
  height: 5vh;
  margin: 20px 0 20px 20px;
`;
const Button1 = styled(Button)`
  text-transform: capitalize;
  margin-right: 4%;
  color: #282c45;
  font: normal normal medium 15px/58px Poppins;
  background: #e2e2e2 0% 0% no-repeat padding-box;
  border-radius: 10px;
  width: 6vw;
`;
const Button2 = styled(Button)`
  text-transform: capitalize;
  color: #ffffff;
  font: normal normal medium 15px/58px Poppins;
  background: #13a74b 0% 0% no-repeat padding-box;
  border-radius: 10px;
  width: 6vw;
  &:hover {
    background: #13a74b;
  }
`;

const Circle = styled(Box)`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 4px solid #13a74b;
  margin-right: 10px;
  margin-top: 4px;
  background: #13a74b;
  animation: blink 1s ease-in-out infinite;
  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

const CircleGray = styled(Box)`
  border-radius: 50%;
  border: 4px solid #707070;
  margin-right: 10px;
  margin-top: 6px;
`;
const style = {
  position: "absolute",
  left: "13%",
  bottom: "10%",
  width: "70vw",
  height: "85vh",
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 3,
};
const InputStyle = {
  background: "#EBE9E9 ",
  border: "1px solid #E2E2E2",
  height: "5vh",
  width: "15vw",
  paddingLeft: "10px",
  borderRadius: "10px",
};

const checkStyle = {
  width: "16px",
  height: "16px",
  cursor: "pointer",
  position: "absolute",
  top: "6px",
  left: "2px",
};

export default function ListingTable({ multipleIdDelete }) {
  console.log("array of id in export listing", multipleIdDelete);
  const payloadObj = {};
  const customId = "custom-id-yes";
  const [channelName, setChannelName] = useState([]);
  const { exporrtSelectedItem_id, setExporrtSelectedItem_id } =
    useContext(DataContext);
  const newSelectedItem_id = [...new Set(exporrtSelectedItem_id)];
  console.log("newSelectedItem_id", newSelectedItem_id);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    /* navigate('/invetoryListings') */
  };
  const [success, setSuccess] = React.useState(true);
  const [showDoyou, setShowDoyou] = React.useState(true);

  //selectedchannelname
  const [walmartName, setWalmartName] = useState(false);
  const [amacoName, setAmacoName] = useState(false);
  const [eBayName, setEBayName] = useState(false);
  const [wishName, setWishName] = useState(false);
  const [searsName, setSearsName] = useState(false);
  const [newEggName, setNewEggName] = useState(false);

  //for exporting channelnames and itemsids
  // const nextHandl = () => {
  //   toast.success("Data Successfully Exported to Marketplace");
  //   navigate("/Listings");
  // };
  const nextHandl = () => {
    if (channelName.length !== 0) {
      loaderHandle();
      setSuccess(false);
      // toast.success("Data Successfully Exported to Marketplace");
      navigate("/Listings");
    } else
      toast.warn("Select channel for exporting items", {
        toastId: customId,
      });
  };

  const [connectionStatus, setConnectionStatus] = useState("");

  // const loaderHandle = async () => {
  //   const config = {
  //     headers: {
  //       Authorization: `${localStorage.getItem("token")}`,
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   console.log("loaderHandle function called when click on the next button");
  //   setShowDoyou(false);
  //   Object.assign(
  //     payloadObj,
  //     { id: multipleIdDelete },
  //     { marketplacename: channelName },
  //     { action: "create" }
  //     //  { action:"update" }
  //   );
  //   try {
  //     await AxiosInstance({
  //       url: "/exportCatalog",
  //       method: "POST",
  //       data: payloadObj,
  //       headers: config.headers,
  //     }).then((response) => {
  //       if (response.data.status === "not connected") {
  //         // setLoader(false);
  //         setConnectionStatus("not connected");
  //         setChannelName([]);
  //         setExporrtSelectedItem_id([]);
  //         setTimeout(() => {
  //           navigate("/setting");
  //         }, 4000);
  //       } else {
  //         // setLoader(false);
  //         setConnectionStatus("connected");
  //         setChannelName([]);
  //         setExporrtSelectedItem_id([]);
  //       }
  //     });
  //   } catch (e) {
  //     // setLoader(false);
  //     setConnectionStatus("error");
  //     setChannelName([]);
  //     setExporrtSelectedItem_id([]);
  //     console.log(e);
  //   }
  // };

  const loaderHandle = async () => {
    // Create a headers object with the Authorization token and Content-Type
    const headers = {
      Authorization: ` ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    console.log("loaderHandle function called when click on the next button");
    setShowDoyou(false);

    // Combine all payload objects into one
    const payloadObj = {
      id: multipleIdDelete,
      marketplacename: channelName,
      action: "create",
      // action: "update" (commented out for now)
    };

    try {
      console.log("payload object", payloadObj);
      // Make the API call with the POST method, passing in the payload and headers
      const response = await AxiosInstance.post(
        "/exportCatalog",
        payloadObj,
        headers
      );

      if (response.data.status === "not connected") {
        setConnectionStatus("not connected");
        setChannelName([]);
        setExporrtSelectedItem_id([]);
        setTimeout(() => {
          navigate("/setting");
        }, 4000);
      } else {
        setConnectionStatus("connected");
        setChannelName([]);
        setExporrtSelectedItem_id([]);
      }
    } catch (error) {
      setConnectionStatus("error");
      setChannelName([]);
      setExporrtSelectedItem_id([]);
      console.log(error);
    }
  };

  //successfullly handle
  const okSuccessHandle = async () => {
    navigate("/invetoryListings");
  };

  //for circle change
  const [walCircle, setWalCircle] = useState(true);
  const [amacoCircle, setAmacoCircle] = useState(true);
  const [ebayCircle, setEbayCircle] = useState(true);
  const [wishCircle, setWishCircle] = useState(true);
  const [searsCircle, setSearsCircle] = useState(true);
  const [newEggCircle, setNewEggCircle] = useState(true);

  //for channel api
  const isChannelActive = async () => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    try {
      await AxiosInstance({
        url: "/channelsetting",
        method: "GET",
        headers: config.headers,
      }).then((res) => {
        console.log("res in channelsetting in listingtable page", res);
        const newRow = [];
        res.data.message.length > 0 &&
          res.data.message.map((val) =>
            newRow.push({
              channelName: Object.keys(val)[0],
              status: Object.values(val)[0],
            })
          );
        console.log("newRow", newRow);
        newRow.length > 0 &&
          newRow.map((val, i) => {
            if (val.status === "Connected") {
              if (val.channelName === "Amazon") {
                setAmacoCircle(false);
              }

              if (val.channelName === "Sears") {
                setSearsCircle(false);
              }

              if (val.channelName === "Walmart") {
                setWalCircle(false);
              }
              if (val.channelName === "NewEgg") {
                setNewEggCircle(false);
              }

              if (val.channelName === "Wish") {
                setWishCircle(false);
              }
              if (
                val.channelName === "eBay" ||
                val.channelName === "Ebay" ||
                val.channelName === "ebay"
              ) {
                setEbayCircle(false);
              }
            }
          });
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    isChannelActive();
  }, []);

  const connectionWarn = (name) => {
    // toast.warn(`Change the connection status of ${name} from channel setting or make a connection from channel`);
    toast.warn(`Please connect the channel`, {
      toastId: customId,
    });
  };
  const removeChannelName = (name) => {
    const newChannel = channelName.filter((val) => val !== name);
    setChannelName(newChannel);
  };

  return (
    <div>
      <span onClick={handleOpen}>
        Export Listings <BiExport size={20} />
      </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {success ? (
          <div className="successPopupContainerListing">
            <Box>
              <Typography1>
                Do you want to export listings to marketplace?
              </Typography1>
              <Box3 style={{ marginLeft: "161px", marginTop: "4rem" }}>
                <Button
                  variant="contained"
                  style={{
                    color: "#282C45",
                    backgroundColor: "#E2E2E2",
                    position: "relative",
                    left: "10px",
                  }}
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  Skip
                </Button>
                <Button
                  style={{ position: "relative", left: "30px" }}
                  onClick={() => setSuccess(false)}
                  variant="contained"
                  color="success"
                >
                  yes
                </Button>
              </Box3>
            </Box>
          </div>
        ) : (
          <>
            {showDoyou ? (
              <Box sx={style}>
                <Typography1>Select Channel</Typography1>
                <Box4>
                  <Box
                    style={{
                      height: "5vh",
                      width: "15vw",
                      display: "flex",
                      position: "relative",
                      top: "10px",
                      left: "60px",
                    }}
                  >
                    Channels
                  </Box>
                  <Box3>
                    <Box>Profit Percentage</Box>
                    <Box style={{ margin: "0 45px" }}>Profit Price</Box>
                    <Box>Shipping Price</Box>
                  </Box3>
                </Box4>
                <Box4>
                  <Box
                    style={{
                      height: "5vh",
                      width: "15vw",
                      display: "flex",
                      position: "relative",
                      top: "10px",
                      left: "60px",
                    }}
                  >
                    {amacoCircle ? (
                      <CircleGray
                        onClick={() => {
                          connectionWarn("Amazon");
                        }}
                        style={{
                          width: "20px",
                          height: "20px",
                          padding: "0",
                        }}
                      ></CircleGray>
                    ) : (
                      <>
                        <Circle
                          onClick={() => {
                            setAmacoName(true);
                            channelName.push("Amazon");
                          }}
                          style={{
                            width: "20px",
                            height: "20px",
                            padding: "0",
                          }}
                        ></Circle>
                        {amacoName && (
                          <CheckCircleIcon
                            sx={checkStyle}
                            onClick={() => {
                              removeChannelName("Amazon");
                              setAmacoName(false);
                            }}
                          />
                        )}
                      </>
                    )}
                    Amazon
                  </Box>
                  <Box3>
                    <Box>
                      <input style={InputStyle} type="text" />
                    </Box>
                    <Box style={{ margin: "0 45px" }}>
                      <input style={InputStyle} type="text" />
                    </Box>
                    <Box>
                      <input style={InputStyle} type="text" />
                    </Box>
                  </Box3>
                </Box4>

                <Box4>
                  <Box
                    style={{
                      height: "5vh",
                      width: "15vw",
                      display: "flex",
                      position: "relative",
                      top: "10px",
                      left: "60px",
                    }}
                  >
                    {wishCircle ? (
                      <CircleGray
                        onClick={() => {
                          connectionWarn("Wish");
                        }}
                        style={{
                          width: "20px",
                          height: "20px",
                          padding: "0",
                        }}
                      ></CircleGray>
                    ) : (
                      <>
                        <Circle
                          onClick={() => {
                            setWishName(true);
                            channelName.push("Wish");
                          }}
                          style={{
                            width: "20px",
                            height: "20px",
                            padding: "0",
                          }}
                        ></Circle>
                        {wishName && (
                          <CheckCircleIcon
                            sx={checkStyle}
                            onClick={() => {
                              removeChannelName("Wish");
                              setWishName(false);
                            }}
                          />
                        )}
                      </>
                    )}
                    Wish
                  </Box>
                  <Box3>
                    <Box>
                      <input style={InputStyle} type="text" />
                    </Box>
                    <Box style={{ margin: "0 45px" }}>
                      <input style={InputStyle} type="text" />
                    </Box>
                    <Box>
                      <input style={InputStyle} type="text" />
                    </Box>
                  </Box3>
                </Box4>

                <Box4>
                  <Box
                    style={{
                      height: "5vh",
                      width: "15vw",
                      display: "flex",
                      position: "relative",
                      top: "10px",
                      left: "60px",
                    }}
                  >
                    {walCircle ? (
                      <CircleGray
                        onClick={() => {
                          connectionWarn("Walmart");
                        }}
                        style={{
                          width: "20px",
                          height: "20px",
                          padding: "0",
                        }}
                      ></CircleGray>
                    ) : (
                      <>
                        <Circle
                          onClick={() => {
                            setWalmartName(true);
                            channelName.push("Walmart");
                          }}
                          style={{
                            width: "20px",
                            height: "20px",
                            padding: "0",
                          }}
                        ></Circle>
                        {walmartName && (
                          <CheckCircleIcon
                            sx={checkStyle}
                            onClick={() => {
                              removeChannelName("Walmart");
                              setWalmartName(false);
                            }}
                          />
                        )}
                      </>
                    )}
                    Walmart
                  </Box>
                  <Box3>
                    <Box>
                      <input style={InputStyle} type="text" />
                    </Box>
                    <Box style={{ margin: "0 45px" }}>
                      <input style={InputStyle} type="text" />
                    </Box>
                    <Box>
                      <input style={InputStyle} type="text" />
                    </Box>
                  </Box3>
                </Box4>

                <Box4>
                  <Box
                    style={{
                      height: "5vh",
                      width: "15vw",
                      display: "flex",
                      position: "relative",
                      top: "10px",
                      left: "60px",
                    }}
                  >
                    {ebayCircle ? (
                      <CircleGray
                        onClick={() => {
                          connectionWarn("Ebay");
                        }}
                        style={{
                          width: "20px",
                          height: "20px",
                          padding: "0",
                        }}
                      ></CircleGray>
                    ) : (
                      <>
                        <Circle
                          onClick={() => {
                            setEBayName(true);
                            channelName.push("Ebay");
                          }}
                          style={{
                            width: "20px",
                            height: "20px",
                            padding: "0",
                          }}
                        ></Circle>
                        {eBayName && (
                          <CheckCircleIcon
                            sx={checkStyle}
                            onClick={() => {
                              removeChannelName("Ebay");
                              setEBayName(false);
                            }}
                          />
                        )}
                      </>
                    )}
                    eBay
                  </Box>
                  <Box3>
                    <Box>
                      <input style={InputStyle} type="text" />
                    </Box>
                    <Box style={{ margin: "0 45px" }}>
                      <input style={InputStyle} type="text" />
                    </Box>
                    <Box>
                      <input style={InputStyle} type="text" />
                    </Box>
                  </Box3>
                </Box4>

                <Box4>
                  <Box
                    style={{
                      height: "5vh",
                      width: "15vw",
                      display: "flex",
                      position: "relative",
                      top: "10px",
                      left: "60px",
                    }}
                  >
                    {searsCircle ? (
                      <CircleGray
                        onClick={() => {
                          connectionWarn("Sears");
                        }}
                        style={{
                          width: "20px",
                          height: "20px",
                          padding: "0",
                        }}
                      ></CircleGray>
                    ) : (
                      <>
                        <Circle
                          onClick={() => {
                            setSearsName(true);
                            channelName.push("Sears");
                          }}
                          style={{
                            width: "20px",
                            height: "20px",
                            padding: "0",
                          }}
                        ></Circle>
                        {searsName && (
                          <CheckCircleIcon
                            sx={checkStyle}
                            onClick={() => {
                              removeChannelName("Sears");
                              setSearsName(false);
                            }}
                          />
                        )}
                      </>
                    )}
                    Sears
                  </Box>
                  <Box3>
                    <Box>
                      <input style={InputStyle} type="text" />
                    </Box>
                    <Box style={{ margin: "0 45px" }}>
                      <input style={InputStyle} type="text" />
                    </Box>
                    <Box>
                      <input style={InputStyle} type="text" />
                    </Box>
                  </Box3>
                </Box4>

                <Box4>
                  <Box
                    style={{
                      height: "5vh",
                      width: "15vw",
                      display: "flex",
                      position: "relative",
                      top: "10px",
                      left: "60px",
                    }}
                  >
                    {newEggCircle ? (
                      <CircleGray
                        onClick={() => {
                          connectionWarn("NewEgg");
                        }}
                        style={{
                          width: "20px",
                          height: "20px",
                          padding: "0",
                        }}
                      ></CircleGray>
                    ) : (
                      <>
                        <Circle
                          onClick={() => {
                            setNewEggName(true);
                            channelName.push("NewEgg");
                          }}
                          style={{
                            width: "20px",
                            height: "20px",
                            padding: "0",
                          }}
                        ></Circle>
                        {newEggName && (
                          <CheckCircleIcon
                            sx={checkStyle}
                            onClick={() => {
                              removeChannelName("NewEgg");
                              setNewEggName(false);
                            }}
                          />
                        )}
                      </>
                    )}
                    Newegg
                  </Box>
                  <Box3>
                    <Box>
                      <input style={InputStyle} type="text" />
                    </Box>
                    <Box style={{ margin: "0 45px" }}>
                      <input style={InputStyle} type="text" />
                    </Box>
                    <Box>
                      <input style={InputStyle} type="text" />
                    </Box>
                  </Box3>
                </Box4>

                <div
                  style={{
                    width: "15vw",
                    height: "12vh",
                    margin: "auto",
                    marginTop: "50px",
                  }}
                >
                  <Button1
                    variant="contained"
                    style={{ color: "#282C45" }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button1>
                  <Button2 variant="contained" onClick={nextHandl}>
                    Next
                  </Button2>
                </div>
              </Box>
            ) : (
              <div className="successPopupContainer">
                <div className="successPopupImage">
                  <img src={Success} width="110px" alt="warning..." />
                </div>
                <h3 className="successPopupHeading">
                  {" "}
                  Successfully exported to the marketplace{" "}
                </h3>
                <div className="successPopupBtnCont">
                  <button
                    className="btn"
                    onClick={() => navigate("/dashboard")}
                    variant="contained"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}
