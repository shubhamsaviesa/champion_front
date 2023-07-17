import React, { useState, useContext, useEffect } from "react";
import "../../../style/Channels/connectpage.css";
import { Button, styled } from "@mui/material";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import NewEggTable from "../../Tables/Channel/NewEggTable";
import amazon1 from "../../../images/channel/Newegg.png";
import ChannelTable from "../../../style/Channels/ChannelTable.module.css";
import { DataContext } from "../../../context/DataProvider";
import { useSelector, useDispatch } from "react-redux";
import { InsertNeweggData } from "../../../../rtk/features/Marketplace/NeweggSlice";
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

const NewEgg = () => {
  const Navigation = useNavigate();
  const initialValues = { nickname: "", neweggsellerid: "", neweggapikey: "" };
  const [showTable, setShowTable] = useState(true);
  const [formValues, setFormValues] = useState(initialValues);
  const { sidenavbar } = useContext(DataContext);
  const Neweggstatus = useSelector((state) => state.Newegg?.NeweggData?.status);
  const dispatch = useDispatch();
  const customId = "custom-id-yes";

  console.log("Neweggstatus", Neweggstatus);

  const handleNeweggInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log("setformvalues", formValues);
  };
  const requiredFields = ["nickname", "neweggsellerid", "neweggapikey"];

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
    dispatch(InsertNeweggData(formValues))
      .then(() => {
        switch (Neweggstatus) {
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
                <div>Connect to Newegg</div>
              </div>
              <div
                style={{ position: "relative", right: "4%", fontSize: "15px" }}
              >
                <span>Channels</span>{" "}
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">Connect to Newegg</span>
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
                  You need an Newegg Professional Seller account to sell on
                  Newegg
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
                        onChange={handleNeweggInput}
                        value={formValues.nickname}
                      />

                      <div>
                        <label htmlFor="text">Newegg Seller ID*</label>
                      </div>
                      <input
                        style={{ width: "100%", marginBottom: "0.8rem" }}
                        type="text"
                        name="neweggsellerid"
                        placeholder="#4563214"
                        onChange={handleNeweggInput}
                        value={formValues.neweggsellerid}
                      />

                      <div>
                        <label htmlFor="text">Newegg API Secret Key*</label>
                      </div>
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        name="neweggapikey"
                        placeholder="54615 51351 51351"
                        onChange={handleNeweggInput}
                        value={formValues.neweggapikey}
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
                <span className="subMenu_subheading">Connect to Newegg</span>
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">Newegg Listings</span>
              </div>
            </div>
          </div>
          <NewEggTable />
        </div>
      )}
    </>
  );
};

export default NewEgg;
