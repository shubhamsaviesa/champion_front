import React, { useState, useContext, useEffect } from "react";
import "../../../style/Channels/connectpage.css";
import { Button, styled } from "@mui/material";
import Amazon_icon from "../../../images/channel/Amazon_icon.png";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AmazonTable from "../../Tables/Channel/AmazonTable";
import amazon1 from "../../../images/bookcommerceimage/amazonto.png";
import ChannelTable from "../../../style/Channels/ChannelTable.module.css";
import { DataContext } from "../../../context/DataProvider";
import { useSelector, useDispatch } from "react-redux";
import { InsertAmazonData } from "../../../../rtk/features/Marketplace/AmazonSlice";
import { toast } from "react-toastify";
import _ from "lodash";
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

const AmazonConnect = () => {
  const Navigation = useNavigate();
  const initialValues = {
    amazonclientid: "",
    amazonclientsecret: "",
    amazonsellerid: "",
  };
  const [showTable, setShowTable] = useState(true);
  const [formValues, setFormValues] = useState(initialValues);
  const Amazonstatus = useSelector((state) => state.Amazon?.AmazonData?.status);
  const { sidenavbar } = useContext(DataContext);
  const dispatch = useDispatch();
  const customId = "custom-id-yes";

  const handleAmazonInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const requiredFields = ["amazonsellerid"];

  console.log("Amazonstatus", Amazonstatus);

  const handleConnect = (e) => {
    e.preventDefault();

    const hasEmptyFields = requiredFields.some(
      (fieldName) => !formValues[fieldName]
    );

    if (hasEmptyFields) {
      toast.error("amazon sellerid is required", {
        toastId: customId,
      });
      return;
    }
    dispatch(InsertAmazonData(formValues))
      .then(() => {
        switch (Amazonstatus) {
          case "success":
            toast.success(" Connected !", { toastId: customId });
            Navigation(-1);
            break;
          case "fail":
            toast.error("Failed.", {
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
      })
      .catch((error) => {
        toast.error(error.message, {
          toastId: customId,
        });
      });
  };

  return (
    <>
      {showTable ? (
        <div>
          <div className={sidenavbar ? "headingbar" : "headingbar2"}>
            <div className="toptableheading">
              <div
                style={{ position: "relative", left: "2.5%", fontSize: "15px" }}
              >
                <div>Connect to Amazon</div>
              </div>
              <div
                style={{ position: "relative", right: "4%", fontSize: "15px" }}
              >
                <span>Channels</span>{" "}
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">Connect to Amazon</span>
              </div>
            </div>
          </div>
          <div
            className={
              sidenavbar ? "amazonConnectContainer" : "amazonConnectContainer2"
            }
          >
            <div>
              <div className="amazonForm" style={{ marginBottom: "34%" }}>
                <div className="heading">
                  You need an Amazon Professional Seller account to sell on
                  Amazon
                </div>
                <form>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <div>
                        <label htmlFor="text">Amazon Seller account</label>
                      </div>
                      <input
                        style={{ width: "100%", marginBottom: "0.8rem" }}
                        type="text"
                        name="amazonclientid"
                        placeholder="Jhone Doe"
                        onChange={handleAmazonInput}
                        value={formValues.amazonclientid}
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="text">
                        Amazon seller account Password
                      </label>
                    </div>
                    <input
                      style={{ width: "100%", marginBottom: "0.8rem" }}
                      type="text"
                      name="amazonclientsecret"
                      placeholder="AB47E752"
                      onChange={handleAmazonInput}
                      value={formValues.amazonclientsecret}
                    />
                  </div>
                  <div>
                    <div>
                      <label htmlFor="text"> Seller ID</label>
                    </div>
                    <input
                      style={{ width: "100%", marginBottom: "0rem" }}
                      type="text"
                      name="amazonsellerid"
                      placeholder="AB47E752"
                      onChange={handleAmazonInput}
                      value={formValues.amazonsellerid}
                    />
                  </div>
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
                </form>{" "}
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
                <span className="subMenu_subheading">Connect to Amazon</span>
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">Amazon Listings</span>
              </div>
            </div>
          </div>
          <AmazonTable />
        </div>
      )}
    </>
  );
};

export default AmazonConnect;
