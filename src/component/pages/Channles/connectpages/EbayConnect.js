import React, { useState, useContext, useEffect } from "react";
import "../../../style/Channels/connectpage.css";
import { Button, styled } from "@mui/material";
import ebay from "../../../images/channel/EBay_logo.png";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import EBayTable from "../../Tables/Channel/EBayTable";
import amazon1 from "../../../images/bookcommerceimage/EBay_logo.png";
import ChannelTable from "../../../style/Channels/ChannelTable.module.css";
import { DataContext } from "../../../context/DataProvider";
import { useSelector, useDispatch } from "react-redux";
import { InsertEbayData } from "../../../../rtk/features/Marketplace/EbaySlice";
import { toast } from "react-toastify";
import _ from "lodash";
import AxiosInstance from "../../../../Api/AxiosInstance";
import axios from "axios"; // Import axios

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
const Btn1 = styled(Button)`
  font: normal normal normal 15px Poppins;
  background: #13a74b 0% 0% no-repeat padding-box;
  letter-spacing: 0px;
  text-transform: capitalize;
  width: 8vw;
  height: 5.5vh;
  color: #ffffff;
  &:hover {
    background-color: #13a74b;
  }
`;

const EbayConnect = () => {
  const Navigation = useNavigate();
  const initialValues = { nickname: "", ebayid: "", ebaysecret: "" };
  const [showTable, setShowTable] = useState(true);
  const customId = "custom-id-yes";

  const [formValues, setFormValues] = useState(initialValues);
  const [ebaynewTab, setEbaynewTab] = useState("");

  const { sidenavbar } = useContext(DataContext);
  const ebayStatus = useSelector((state) => state.Ebay.EbayData.status);
  const dispatch = useDispatch();
  console.log("ebayStatus", ebayStatus);

  const handleEbayInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const resForEbay = useSelector((state) => state.Ebay);
  console.log("resForEbay", resForEbay);

  const requiredFields = ["nickname", "ebayid", "ebaysecret"];

  // const handleConnect = (e) => {
  //   e.preventDefault();
  //   const hasEmptyFields = requiredFields.some(
  //     (fieldName) => !formValues[fieldName]
  //   );

  //   if (hasEmptyFields) {
  //     toast.error("Please fill all the required fields", {
  //       toastId: customId,
  //     });
  //     return;
  //   }

  //   dispatch(InsertEbayData(formValues))
  //     .then(() => {
  //       console.log(
  //         "ebay url res when you click on the ebay button",
  //         resForEbay
  //       );
  //       if (resForEbay.EbayData.Url) {
  //         let ebayUrl = resForEbay.EbayData.Url;
  //         console.log("it is go inside resForEbay.EbayData.Url");
  //         let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
  //           width=900,height=450,left=300,top=200`;
  //         window.open(ebayUrl, "ebay", params);
  //         setEbaynewTab(ebayUrl);
  //       }
  //       switch (ebayStatus) {
  //         case "succes":
  //           toast.success(" Connected !", { toastId: customId });
  //           break;
  //         case "fail":
  //           toast.error("Failed.", {
  //             toastId: customId,
  //           });
  //           break;
  //         case "Internal server error":
  //           toast.error("Backend server Crash", {
  //             toastId: customId,
  //           });
  //           break;
  //         default:
  //           break;
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error(error.message, {
  //         toastId: customId,
  //       });
  //     });
  // };
  const handleConnect = async (e) => {
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

    console.log("form", formValues);
    // setShowCircle(true);
    try {
      // Create the custom config object with the Authorization header and Content-Type
      const config = {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };

      // Send the formValues data as the request payload along with the config object
      const response = await axios.post(
        "http://api.championlister.com/api/user/ebaycredential",
        formValues,
        config
      );
      console.log("response in ebay after post", response);
      // Assuming the response contains the eBay data, you can access it like this:
      console.log("ebay url res", response.data.Url);

      if (response.data.Url) {
        let ebayUrl = response.data.Url;
        let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=900,height=450,left=300,top=200`;
        window.open(ebayUrl, "ebay", params);
        setEbaynewTab(ebayUrl);
        // setShowCircle(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  let ChannelConnectsrender;

  if (sidenavbar) {
    ChannelConnectsrender = (
      <>
        {showTable ? (
          <div>
            <div className="headingbar">
              <div className="toptableheading">
                <div
                  style={{
                    position: "relative",
                    left: "2.5%",
                    fontSize: "15px",
                  }}
                >
                  <div>Connect to eBay</div>
                </div>
                <div
                  style={{
                    position: "relative",
                    right: "4%",
                    fontSize: "15px",
                  }}
                >
                  <span>Channels</span>{" "}
                  <span>
                    <MdOutlineArrowForwardIos />
                  </span>
                  <span className="subMenu_subheading">Connect to eBay</span>
                </div>
              </div>
            </div>

            <div className="amazonConnectContainer">
              <iframe name="iframe1" id="iframe" src={ebaynewTab}></iframe>
              <div>
                <div className="amazonForm" style={{ marginBottom: "34%" }}>
                  <div className="heading">
                    You need an eBay Professional Seller account to sell on eBay
                  </div>
                  <form>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>
                        <div>
                          <label htmlFor="text">Nick Name*</label>
                        </div>
                        <input
                          style={{ width: "100%", marginBottom: "0.8rem" }}
                          type="text"
                          name="nickname"
                          onChange={handleEbayInput}
                          value={formValues.nickname}
                        />
                        <div>
                          <label htmlFor="text">eBay Client ID*</label>
                        </div>
                      </div>
                      <div>
                        <input
                          style={{ width: "100%", marginBottom: "0.8rem" }}
                          type="text"
                          name="ebayid"
                          onChange={handleEbayInput}
                          value={formValues.ebayid}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="text">eBay Client Secret*</label>
                    </div>
                    <input
                      style={{ width: "100%" }}
                      type="text"
                      name="ebaysecret"
                      onChange={handleEbayInput}
                      value={formValues.ebaysecret}
                    />

                    <div
                      style={{
                        width: "40vw",
                        textAlign: "center",
                        marginTop: "40px",
                      }}
                    >
                      <Btn onClick={() => Navigation(-1)}>Cancel</Btn>
                      <Btn1 type="submit" onClick={handleConnect}>
                        Connect
                      </Btn1>
                    </div>
                  </form>
                  <div
                    style={{
                      width: "40vw",
                      textAlign: "center",
                      marginTop: "15px",
                    }}
                  >
                    <span
                      style={{
                        font: "normal normal medium 22px/13px Poppins",
                        color: "#87859D",
                      }}
                    >
                      Dont't have an account?
                    </span>
                    <a
                      style={{ textDecoration: "none" }}
                      href="https://www.ebay.com/help/selling/selling/start-selling-ebay?id=4081"
                      target="_blank"
                    >
                      <span
                        style={{
                          font: "normal normal medium 22px/13px Poppins",
                          color: "#59C180",
                        }}
                      >
                        Register Now
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className={ChannelTable.headingbar}>
              <div className={ChannelTable.toptableheading}>
                <div className={ChannelTable.headingOneImage}>
                  <div>
                    <img
                      style={{ width: "70px", height: "35px" }}
                      alt="loading..."
                      src={amazon1}
                    />
                  </div>
                </div>
                <div className={ChannelTable.headingTwotext}>
                  <span>Channels</span>
                  <span>
                    <MdOutlineArrowForwardIos />
                  </span>
                  <span className="subMenu_subheading">Connect to eBay</span>
                  <span>
                    <MdOutlineArrowForwardIos />
                  </span>
                  <span className="subMenu_subheading">eBay Listings</span>
                </div>
              </div>
            </div>
            <EBayTable />
          </div>
        )}
      </>
    );
  } else {
    ChannelConnectsrender = (
      <>
        {showTable ? (
          <div>
            <div className="headingbar2">
              <div className="toptableheading">
                <div
                  style={{
                    position: "relative",
                    left: "2.5%",
                    fontSize: "15px",
                  }}
                >
                  <div>Connect to eBay</div>
                </div>
                <div
                  style={{
                    position: "relative",
                    right: "4%",
                    fontSize: "15px",
                  }}
                >
                  <span>Channels</span>{" "}
                  <span>
                    <MdOutlineArrowForwardIos />
                  </span>
                  <span className="subMenu_subheading">Connect to eBay</span>
                </div>
              </div>
            </div>

            <div className="amazonConnectContainer2">
              <div>
                <div className="amazonForm">
                  <div className="heading">
                    You need an eBay Professional Seller account to sell on eBay
                  </div>
                  <form>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>
                        <div>
                          <label htmlFor="text">Nick Name</label>
                        </div>
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          name="id"
                        />
                        <div>
                          <label htmlFor="text">eBay Client ID</label>
                        </div>
                      </div>
                      <div>
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          name="id"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="text">eBay Client Secret</label>
                    </div>
                    <input style={{ width: "100%" }} type="text" name="id" />

                    <div
                      style={{
                        width: "40vw",
                        textAlign: "center",
                        marginTop: "50px",
                      }}
                    >
                      <Btn onClick={() => Navigation(-1)}>Cancel</Btn>
                      <Btn1 type="submit" onClick={handleConnect}>
                        Connect
                      </Btn1>
                    </div>
                  </form>{" "}
                  <div
                    style={{
                      width: "40vw",
                      textAlign: "center",
                      marginTop: "10px",
                    }}
                  >
                    <span
                      style={{
                        font: "normal normal medium 22px/13px Poppins",
                        color: "#87859D",
                      }}
                    >
                      Dont't have an account?
                    </span>{" "}
                    <span
                      style={{
                        font: "normal normal medium 22px/13px Poppins",
                        color: "#59C180",
                      }}
                    >
                      {" "}
                      Register Now
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className={ChannelTable.headingbar}>
              <div className={ChannelTable.toptableheading}>
                <div className={ChannelTable.headingOneImage}>
                  <div>
                    <img
                      style={{ width: "70px", height: "35px" }}
                      alt="loading..."
                      src={amazon1}
                    />
                  </div>
                </div>
                <div className={ChannelTable.headingTwotext}>
                  <span>Channels</span>
                  <span>
                    <MdOutlineArrowForwardIos />
                  </span>
                  <span className="subMenu_subheading">Connect to eBay</span>
                  <span>
                    <MdOutlineArrowForwardIos />
                  </span>
                  <span className="subMenu_subheading">eBay Listings</span>
                </div>
              </div>
            </div>
            <EBayTable />
          </div>
        )}
      </>
    );
  }

  return <>{ChannelConnectsrender}</>;
};

export default EbayConnect;
