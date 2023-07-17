import React, { useContext, useState, useEffect } from "react";
import axiosInstance from "../../../service/axiosInstance";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SuccessFullydeletedIcon from "../../Images/successDeleted.png";
import WarningIcon from "../../Images/warning.png";
import { DataContext } from "../../context/DataProvider";
import CircularLoader from "./CicularLoader";
import "../../Channels/channelPopupsAll/successPopup.scss";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ToastContainer, toast } from "react-toastify";

const Box1 = styled(Box)`
  width: 80vw;
  height: 90vh;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 50px;
`;
const Box2 = styled(Box)`
  display: flex;
  width: 80vw;
  height: 5vh;
  margin-bottom: -13px;
  & div {
    width: 17vw;
    height: 4vh;
    font: normal normal normal 18px/33px Poppins;
    letter-spacing: 0px;
    text-align: left;
    padding-left: 44px;
    color: #000000;
  }
`;
const Box3 = styled(Box)`
  display: flex;
  width: 80vw;
  height: 6.5vh;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 4px 14px #00000017;
  margin: 10px 0;
  padding-left: 20px;
  border-radius: 50px;
  & div {
    width: 19vw;
    height: 6vh;
    font: normal normal normal 18px/33px Poppins;
    letter-spacing: 0px;
    text-align: left;
    padding: 4px 0px 4px 0px;
    display: flex;
    color: #000000;
  }
`;
const Typography1 = styled(Typography)`
  font: normal normal bold 20px/38px Poppins;
  letter-spacing: 0px;
  color: #000000;
  height: 5vh;
`;
const Button1 = styled(Button)`
  text-transform: capitalize;
  margin-right: 4%;
  color: #282c45;
  font: normal normal medium 15px/58px Poppins;
  background: #e2e2e2 0% 0% no-repeat padding-box;
  border-radius: 10px;
  width: 6vw;
  &:hover {
    background: #e2e2e2;
  }
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
  border-radius: 50%;
  border: 8px solid #13a74b;
  margin-right: 10px;
  margin-top: 6px;
`;
const CircleGray = styled(Box)`
  border-radius: 50%;
  border: 8px solid #707070;
  margin-right: 10px;
  margin-top: 6px;
`;

const TypographyLoader = styled(Typography)`
  text-align: center;
  width: 25vw;
  height: 5vh;
  margin-top: 10px;
  font: normal normal 600 16px/35px Poppins;
  display: flex;
  letter-spacing: 0px;
  color: #282c45;
`;

const BoxDoyouWant = styled(Box)`
  width: 30vw;
  height: 12vh;
  text-align: center;
  margin: 20px;
`;
const TypographyDoYouWant = styled(Typography)`
  text-align: center;
  width: 35vw;
  height: 5vh;
  margin-top: 10px;
  font: normal normal 600 16px/35px Poppins;
  letter-spacing: 0px;
  color: #282c45;
`;
const BoxDoyouWant1 = styled(Box)`
  width: 30vw;
  height: 6vh;
  text-align: center;
  margin: 20px;
  & button {
    margin-right: 20px;
    text-transform: capitalize;
    width: 6vw;
  }
`;
const style = {
  position: "absolute",
  top: "2%",
  left: "8%",
  bottom: "10%",
  width: "80vw",
  height: "90vh",
  bgcolor: "background.paper",
  borderRadius: 10,
  boxShadow: 24,
  p: 3,
};
const successContStyle = {
  position: "absolute",
  top: "30%",
  backgroundColor: "#fff",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  left: "35%",
  borderRadius: "20px",
  padding: "10px",
  /* height: "35vh", */
  width: "32vw",
  overflowX: "hidden",
  overflowY: "hidden",
};

const InputStyle = {
  background: "#EBE9E9 0% 0% no-repeat padding-box",
  border: "1px solid #E2E2E2",
  height: "5vh",
  width: "15vw",
  borderRadius: "28px",
};

const checkStyle = {
  width: "16px",
  height: "16px",
  cursor: "pointer",
  position: "relative",
  top: "10px",
  left: "-30px",
};
export default function BookCatalogExportListing(props) {
  const payloadObj = {};
  const customId = "custom-id-yes";
  const [channelName, setChannelName] = useState([]);
  const { exporrtSelectedItem_id, setExporrtSelectedItem_id } =
    useContext(DataContext);
  const newSelectedItem_id = [...new Set(exporrtSelectedItem_id)];

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    /* navigate('/invetoryListings') */
  };

  const [success, setSuccess] = React.useState(true);
  const [showDoyou, setShowDoyou] = React.useState(true);
  const [loader, setLoader] = React.useState(true);

  //selectedchannelname
  const [walmartName, setWalmartName] = useState(false);
  const [alibrisName, setAlibrisName] = useState(false);
  const [AbebooksName, setAbebooksName] = useState(false);
  const [eCampName, setECampName] = useState(false);
  const [valoreName, setValoreName] = useState(false);
  const [bibName, setBibName] = useState(false);
  const [eBayName, setEBayName] = useState(false);
  const [amacaName, setAmacaName] = useState(false);
  const [amacoName, setAmacoName] = useState(false);

  
  //for exporting channelnames and itemsids
  const nextHandle = () => {
    if (channelName.length !== 0) {
      setSuccess(false);
    } else
      toast.warn("Select channel for exporting items", {
        toastId: customId,
      });
  };

  const [connectionStatus, setConnectionStatus] = useState("");
  const loaderHandle = async () => {
    setShowDoyou(false);
    Object.assign(
      payloadObj,
      { idd: newSelectedItem_id },
      { marketplacename: channelName }
    );
    try {
      await axiosInstance({
        url: "/exportCatalog",
        method: "POST",
        data: payloadObj,
      }).then((response) => {
        console.log(response);
        if (response.data.status === "not connected") {
          setLoader(false);
          setConnectionStatus("not connected");
          setChannelName([]);
          setExporrtSelectedItem_id([]);
          setTimeout(() => {
            navigate("/setting");
          }, 4000);
        } else {
          setLoader(false);
          setConnectionStatus("connected");
          setChannelName([]);
          setExporrtSelectedItem_id([]);
        }
      });
    } catch (e) {
      setLoader(false);
      setConnectionStatus("error");
      setChannelName([]);
      setExporrtSelectedItem_id([]);
      console.log(e);
    }
  };

  //successfullly handle
  const okSuccessHandle = async () => {
    navigate("/invetoryListings");
  };

  //for circle change
  const [walCircle, setWalCircle] = useState(true);
  const [abeCircle, setAbeCircle] = useState(true);
  const [aliCircle, setAliCircle] = useState(true);
  const [eCaCircle, setECaCircle] = useState(true);
  const [valoCircle, setValoCircle] = useState(true);
  const [bibCircle, setBibCircle] = useState(true);
  const [ebayCircle, setEbayCircle] = useState(true);
  const [amacaCircle, setAmacaCircle] = useState(true);
  const [amacoCircle, setAmacoCircle] = useState(true);

  //for channel api
  const isChannelActive = async () => {
    try {
      await axiosInstance({
        url: "/channelsetting",
        method: "GET",
      }).then((res) => {
        console.log("reees", res);
        const newRow = [];
        res.data.message.length > 0 &&
          res.data.message.map((val) =>
            newRow.push({
              channelName: Object.keys(val)[0],
              status: Object.values(val)[0],
            })
          );
        newRow.length > 0 &&
          newRow.map((val, i) => {
            if (val.status === "Connected") {
              if (val.channelName === "Amazon") {
                setAmacoCircle(false);
              }

              if (val.channelName === "Amazonca") {
                setAmacaCircle(false);
              }

              if (val.channelName === "Walmart") {
                setWalCircle(false);
              }
              if (
                val.channelName === "EcampusBooks" ||
                val.channelName === "Ecampus"
              ) {
                setECaCircle(false);
              }

              if (val.channelName === "ValoreBooks") {
                setValoCircle(false);
              }

              if (
                val.channelName === "AlibirsBooks" ||
                val.channelName === "Alibris"
              ) {
                setAliCircle(false);
              }

              if (
                val.channelName === "BiblioBooks" ||
                val.channelName === "Biblio"
              ) {
                setBibCircle(false);
              }

              if (val.channelName === "AbeBooks") {
                setAbeCircle(false);
              }

              if (val.channelName === "Ebay") {
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
      <span onClick={handleOpen}>Export Listings</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {success ? (
          <Box sx={style}>
            <Box1>
              <Typography1>Select Channel</Typography1>
              <Box2>
                <Box>Channels</Box>
                <Box>Profit Percentage</Box>
                <Box>Profit Price</Box>
                <Box>Shipping Price</Box>
              </Box2>

              <Box3>
                <Box style={{ paddingTop: "8px" }}>
                  {walCircle ? (
                    <CircleGray
                      onClick={() => {
                        connectionWarn("Walmart");
                      }}
                      style={{ width: "8px", height: "8px", padding: "0" }}
                    ></CircleGray>
                  ) : (
                    <>
                      <Circle
                        onClick={() => {
                          setWalmartName(true);
                          channelName.push("Walmart");
                        }}
                        style={{ width: "8px", height: "8px", padding: "0" }}
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
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
              </Box3>

              <Box3>
                <Box style={{ paddingTop: "8px" }}>
                  {abeCircle ? (
                    <CircleGray
                      onClick={() => {
                        connectionWarn("Abebooks");
                      }}
                      style={{ width: "8px", height: "8px", padding: "0" }}
                    ></CircleGray>
                  ) : (
                    <>
                      <Circle
                        onClick={() => {
                          setAbebooksName(true);
                          channelName.push("AbeBooks");
                        }}
                        style={{ width: "8px", height: "8px", padding: "0" }}
                      ></Circle>
                      {AbebooksName && (
                        <CheckCircleIcon
                          sx={checkStyle}
                          onClick={() => {
                            removeChannelName("AbeBooks");
                            setAbebooksName(false);
                          }}
                        />
                      )}
                    </>
                  )}
                  AbeBooks
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
              </Box3>

              <Box3>
                <Box style={{ paddingTop: "8px" }}>
                  {aliCircle ? (
                    <CircleGray
                      onClick={() => {
                        connectionWarn("Alibris");
                      }}
                      style={{ width: "8px", height: "8px", padding: "0" }}
                    ></CircleGray>
                  ) : (
                    <>
                      <Circle
                        onClick={() => {
                          setAlibrisName(true);
                          channelName.push("Alibris");
                        }}
                        style={{ width: "8px", height: "8px", padding: "0" }}
                      ></Circle>
                      {alibrisName && (
                        <CheckCircleIcon
                          sx={checkStyle}
                          onClick={() => {
                            removeChannelName("Alibris");
                            setAlibrisName(false);
                          }}
                        />
                      )}
                    </>
                  )}
                  Alibris
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
              </Box3>

              <Box3>
                <Box style={{ paddingTop: "8px" }}>
                  {eCaCircle ? (
                    <CircleGray
                      onClick={() => {
                        connectionWarn("eCampus");
                      }}
                      style={{ width: "8px", height: "8px", padding: "0" }}
                    ></CircleGray>
                  ) : (
                    <>
                      <Circle
                        onClick={() => {
                          setECampName(true);
                          channelName.push("Ecampus");
                        }}
                        style={{ width: "8px", height: "8px", padding: "0" }}
                      ></Circle>
                      {eCampName && (
                        <CheckCircleIcon
                          sx={checkStyle}
                          onClick={() => {
                            removeChannelName("Ecampus");
                            setECampName(false);
                          }}
                        />
                      )}
                    </>
                  )}
                  eCampus
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
              </Box3>

              <Box3>
                <Box style={{ paddingTop: "8px" }}>
                  {valoCircle ? (
                    <CircleGray
                      onClick={() => {
                        connectionWarn("ValoreBooks");
                      }}
                      style={{ width: "8px", height: "8px", padding: "0" }}
                    ></CircleGray>
                  ) : (
                    <>
                      <Circle
                        onClick={() => {
                          setValoreName(true);
                          channelName.push("ValoreBooks");
                        }}
                        style={{ width: "8px", height: "8px", padding: "0" }}
                      ></Circle>
                      {valoreName && (
                        <CheckCircleIcon
                          sx={checkStyle}
                          onClick={() => {
                            removeChannelName("ValoreBooks");
                            setValoreName(false);
                          }}
                        />
                      )}
                    </>
                  )}
                  ValoreBooks
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
              </Box3>

              <Box3>
                <Box style={{ paddingTop: "8px" }}>
                  {bibCircle ? (
                    <CircleGray
                      onClick={() => {
                        connectionWarn("Biblio");
                      }}
                      style={{ width: "8px", height: "8px", padding: "0" }}
                    ></CircleGray>
                  ) : (
                    <>
                      <Circle
                        onClick={() => {
                          setBibName(true);
                          channelName.push("Biblio");
                        }}
                        style={{ width: "8px", height: "8px", padding: "0" }}
                      ></Circle>
                      {bibName && (
                        <CheckCircleIcon
                          sx={checkStyle}
                          onClick={() => {
                            removeChannelName("Biblio");
                            setBibName(false);
                          }}
                        />
                      )}
                    </>
                  )}
                  Biblio
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
              </Box3>

              <Box3>
                <Box style={{ paddingTop: "8px" }}>
                  {ebayCircle ? (
                    <CircleGray
                      onClick={() => {
                        connectionWarn("Ebay");
                      }}
                      style={{ width: "8px", height: "8px", padding: "0" }}
                    ></CircleGray>
                  ) : (
                    <>
                      <Circle
                        onClick={() => {
                          setEBayName(true);
                          channelName.push("Ebay");
                        }}
                        style={{ width: "8px", height: "8px", padding: "0" }}
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
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
              </Box3>

              {/* <Box3>
                <Box style={{ paddingTop: "8px" }}>
                  {amacaCircle ? (
                    <CircleGray
                      onClick={() => {
                        connectionWarn("Amazon.ca");
                      }}
                      style={{ width: "8px", height: "8px", padding: "0" }}
                    ></CircleGray>
                  ) : (
                    <>
                    <Circle
                      onClick={() => {
                        setAmacaName(true);
                        channelName.push("Amazon.ca");

                      }}
                      style={{ width: "8px", height: "8px", padding: "0" }}
                    >
                  
                    </Circle>
                    {amacaName && (
                        <CheckCircleIcon
                        sx={checkStyle} 
                        onClick={()=>{removeChannelName("Amazon.ca");setAmacaName(false)}}
                        />
                      )}
                    </>
                  )}
                  Amazon.Ca
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
              </Box3> */}

              <Box3>
                <Box style={{ paddingTop: "8px" }}>
                  {amacoCircle ? (
                    <CircleGray
                      onClick={() => {
                        connectionWarn("Amazon.co");
                      }}
                      style={{ width: "8px", height: "8px", padding: "0" }}
                    ></CircleGray>
                  ) : (
                    <>
                      <Circle
                        onClick={() => {
                          setAmacoName(true);
                          channelName.push("Amazon");
                        }}
                        style={{ width: "8px", height: "8px", padding: "0" }}
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
                  Amazon.com
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
                <Box>
                  <input style={InputStyle} type="text" />
                </Box>
              </Box3>

              <div
                style={{
                  width: "15vw",
                  height: "12vh",
                  margin: "auto",
                  marginTop: "30px",
                }}
              >
                <Button1
                  variant="contained"
                  onClick={handleClose}
                  style={{ color: "#282C45" }}
                >
                  Cancel
                </Button1>
                <Button2 variant="contained" onClick={nextHandle}>
                  {" "}
                  Next{" "}
                </Button2>
              </div>
            </Box1>
          </Box>
        ) : (
          <>
            {showDoyou ? (
              <Box style={successContStyle}>
                <BoxDoyouWant>
                  <img src={WarningIcon} width="90px" alt="warning..." />
                </BoxDoyouWant>

                <TypographyDoYouWant style={{ color: "#000000" }}>
                  Do you want to export listings to marketplace?{" "}
                </TypographyDoYouWant>
                <BoxDoyouWant1>
                  <Button
                    onClick={() => {
                      setSuccess(true);
                      setChannelName([]);
                    }}
                    variant="contained"
                    style={{
                      background: "#E2E2E2",
                      color: "#282C45",
                      position: "relative",
                      left: "10px",
                    }}
                  >
                    No
                  </Button>
                  <Button
                    style={{ position: "relative", left: "10px" }}
                    onClick={loaderHandle}
                    variant="contained"
                    color="success"
                  >
                    yes
                  </Button>
                </BoxDoyouWant1>
              </Box>
            ) : (
              <>
                {loader ? (
                  <div style={successContStyle}>
                    <Box>
                      {walmartName ? (
                        <TypographyLoader>
                          {" "}
                          <CircularLoader /> Export Listing to Walmart
                        </TypographyLoader>
                      ) : null}

                      {alibrisName ? (
                        <TypographyLoader>
                          {" "}
                          <CircularLoader /> Export Listing to Alibris
                        </TypographyLoader>
                      ) : null}

                      {AbebooksName ? (
                        <TypographyLoader>
                          {" "}
                          <CircularLoader /> Export Listing to AbeBooks
                        </TypographyLoader>
                      ) : null}

                      {valoreName ? (
                        <TypographyLoader>
                          {" "}
                          <CircularLoader /> Export Listing to ValoreBooks
                        </TypographyLoader>
                      ) : null}

                      {eCampName ? (
                        <TypographyLoader>
                          {" "}
                          <CircularLoader /> Export Listing to eCampus
                        </TypographyLoader>
                      ) : null}

                      {bibName ? (
                        <TypographyLoader>
                          {" "}
                          <CircularLoader /> Export Listing to Biblio
                        </TypographyLoader>
                      ) : null}

                      {eBayName ? (
                        <TypographyLoader>
                          {" "}
                          <CircularLoader /> Export Listing to eBay
                        </TypographyLoader>
                      ) : null}

                      {/* {amacaName ? (
                        <TypographyLoader>
                          {" "}
                          <CircularLoader /> Export Listing to Amazon.ca
                        </TypographyLoader>
                      ) : null} */}

                      {amacoName ? (
                        <TypographyLoader>
                          {" "}
                          <CircularLoader /> Export Listing to Amazon.com
                        </TypographyLoader>
                      ) : null}
                    </Box>
                  </div>
                ) : (
                  <div className="successPopupContainer">
                    <div className="successPopupImage">
                      {connectionStatus === "connected" && (
                        <img
                          src={SuccessFullydeletedIcon}
                          width="110px"
                          alt="warning..."
                        />
                      )}
                      {connectionStatus === "error" ||
                      connectionStatus === "not connected" ? (
                        <CancelIcon sx={{ width: "80px", height: "80px" }} />
                      ) : null}
                    </div>
                    <h3 className="successPopupHeading">
                      {connectionStatus === "not connected" &&
                        "Not exported,Please make a connection"}
                      {connectionStatus === "connected" &&
                        "Successfully exported to the marketplace "}
                      {connectionStatus === "error" &&
                        "Something went wrong, Please try later!"}
                    </h3>

                    <div className="successPopupBtnCont">
                      <button
                        className="btn"
                        onClick={okSuccessHandle}
                        variant="contained"
                      >
                        OK
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}
