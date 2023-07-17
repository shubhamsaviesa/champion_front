import React, { useState, useContext, useEffect } from "react";
import "../../../style/Channels/connectpage.css";
import { Button, styled } from "@mui/material";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import WishTable from "../../Tables/Channel/WishTable";
import amazon1 from "../../../images/channel/wishlogo.png";
import ChannelTable from "../../../style/Channels/ChannelTable.module.css";
import { DataContext } from "../../../context/DataProvider";
import { useDispatch, useSelector } from "react-redux";
import { InsertWishData } from "../../../../rtk/features/Marketplace/WishSlice";
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

const WishConnect = () => {
  const Navigation = useNavigate();
  const initialValues = {
    nickname: "",
    code: "",
    client_id: "",
    client_secret: "",
    warehouse_id: "",
  };
  const [showTable, setShowTable] = useState(true);
  const customId = "custom-id-yes";
  const [formValues, setFormValues] = useState(initialValues);
  const Wishstatus = useSelector((state) => state.Wish?.WishData?.status);
  console.log("Wishstatus", Wishstatus);
  const dispatch = useDispatch();
  const handleWishInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log("setformvalues", formValues);
  };
  const requiredFields = [
    "nickname",
    "client_id",
    "client_secret",
    "code",
    "warehouse_id",
  ];
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
    dispatch(InsertWishData(formValues))
      .then(() => {
        switch (Wishstatus) {
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

  const { sidenavbar } = useContext(DataContext);
  return (
    <>
      {showTable ? (
        <div>
          <div className={sidenavbar ? "headingbar" : "headingbar2"}>
            <div className="toptableheading">
              <div
                style={{ position: "relative", left: "2.5%", fontSize: "15px" }}
              >
                <div>Connect to Wish</div>
              </div>
              <div
                style={{ position: "relative", right: "4%", fontSize: "15px" }}
              >
                <span>Channels</span>{" "}
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">Connect to Wish</span>
              </div>
            </div>
          </div>

          <div
            className={
              sidenavbar ? "amazonConnectContainer" : "amazonConnectContainer2"
            }
          >
            <div>
              <div
                className="amazonForm"
                style={{ marginBottom: "40%", height: "68vh" }}
              >
                <div className="heading">
                  You need an Wish Professional Seller account to sell on Wish
                </div>
                <form>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <div>
                        <label htmlFor="text">Nick Name</label>
                      </div>
                      <input
                        style={{ width: "100%", marginBottom: "0.8rem" }}
                        type="text"
                        name="nickname"
                        placeholder="Jhone Doe"
                        onChange={handleWishInput}
                        value={formValues.nickname}
                      />
                      <div>
                        <label htmlFor="text">wish Client ID*</label>
                      </div>
                      <input
                        style={{ width: "100%", marginBottom: "0.8rem" }}
                        type="text"
                        name="client_id"
                        placeholder="#4563214"
                        onChange={handleWishInput}
                        value={formValues.client_id}
                      />

                      <div>
                        <label htmlFor="text">wish Client Secret*</label>
                      </div>
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        name="client_secret"
                        placeholder="Lorem ipsum"
                        onChange={handleWishInput}
                        value={formValues.client_secret}
                      />

                      <div style={{ marginTop: "0.8rem" }}>
                        <label htmlFor="text">API Key*</label>
                      </div>
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        name="code"
                        placeholder="#85947a3606294565808f"
                        onChange={handleWishInput}
                        value={formValues.code}
                      />

                      <div style={{ marginTop: "0.8rem" }}>
                        <label htmlFor="text">Warehouse id*</label>
                      </div>
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        name="warehouse_id"
                        placeholder="#85947a3606294565808f"
                        onChange={handleWishInput}
                        value={formValues.warehouse_id}
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
                    style={{ width: "60px", height: "25px" }}
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
                <span className="subMenu_subheading">Connect to Wish</span>
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">Wish Listings</span>
              </div>
            </div>
          </div>
          <WishTable />
        </div>
      )}
    </>
  );
};

export default WishConnect;
