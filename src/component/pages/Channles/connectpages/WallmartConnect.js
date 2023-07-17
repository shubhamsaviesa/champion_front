import React, { useState, useContext, useEffect, useCallback } from "react";
import "../../../style/Channels/connectpage.css";
import { Button, styled } from "@mui/material";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import WalmartTable from "../../Tables/Channel/WalmartTable";
import amazon1 from "../../../images/bookcommerceimage/walmart.png";
import ChannelTable from "../../../style/Channels/ChannelTable.module.css";
import { DataContext } from "../../../context/DataProvider";
import { useSelector, useDispatch } from "react-redux";
import { InsertWalmartData } from "../../../../rtk/features/Marketplace/WalmartSlice";
import { editConnection } from "../../../../rtk/features/Settings/ChannelSettingsSlice";
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

const WallmartConnect = () => {
  const Navigation = useNavigate();
  const initialValues = { nickname: "", walmartid: "", walmartsecret: "" };
  const [showTable, setShowTable] = useState(true);
  const [formValues, setFormValues] = useState(initialValues);
  const WalmartStatus = useSelector(
    (state) => state.Walmart.WalmartData.status
  );
  console.log("WalmartStatus", WalmartStatus);

  const dispatch = useDispatch();
  const customId = "custom-id-yes";

  const { sidenavbar } = useContext(DataContext);

  const handleWalmartInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const requiredFields = ["nickname", "walmartid", "walmartsecret"];

  const handleConnect = (e) => {
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
    dispatch(InsertWalmartData(formValues))
      .then(() => {
        switch (WalmartStatus) {
          case "succes":
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
                <div>Connect to Walmart</div>
              </div>
              <div
                style={{ position: "relative", right: "4%", fontSize: "15px" }}
              >
                <span>Channels</span>{" "}
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">Connect to Walmart</span>
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
                  You need an Walmart Professional Seller account to sell on
                  Walmart
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
                        placeholder="Jhone Doe"
                        onChange={handleWalmartInput}
                        value={formValues.nickname}
                      />

                      <div>
                        <label htmlFor="text">Walmart Client ID*</label>
                      </div>
                      <input
                        style={{ width: "100%", marginBottom: "0.8rem" }}
                        type="text"
                        name="walmartid"
                        placeholder="#4563214"
                        onChange={handleWalmartInput}
                        value={formValues.walmartid}
                      />
                      <div>
                        <label htmlFor="text">Walmart Client Secret*</label>
                      </div>
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        name="walmartsecret"
                        placeholder="Lorem ipsum"
                        onChange={handleWalmartInput}
                        value={formValues.walmartsecret}
                      />
                    </div>
                    <div></div>
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
                    style={{ width: "70px", height: "30px" }}
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
                <span className="subMenu_subheading">Connect to Walmart</span>
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">Walmart Listings</span>
              </div>
            </div>
          </div>
          <WalmartTable />
        </div>
      )}
    </>
  );
};

export default WallmartConnect;
