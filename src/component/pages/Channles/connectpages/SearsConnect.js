import React, { useState, useContext, useEffect } from "react";
import "../../../style/Channels/connectpage.css";
import { Button, styled } from "@mui/material";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SearsTable from "../../Tables/Channel/SearsTable";
import amazon1 from "../../../images/channel/sears.png";
import ChannelTable from "../../../style/Channels/ChannelTable.module.css";
import { DataContext } from "../../../context/DataProvider";
import { useSelector, useDispatch } from "react-redux";
import { InsertSearsData } from "../../../../rtk/features/Marketplace/SearsSlice";
import { ToastContainer, toast } from "react-toastify";
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

const SearsConnect = () => {
  const Navigation = useNavigate();

  const initialValues = {
    nickname: "",
    searssellerid: "",
    searsapikey: "",
    searsemail: "",
    locationid: "",
  };
  const [showTable, setShowTable] = useState(true);
  const [formValues, setFormValues] = useState(initialValues);
  const Searsstatus = useSelector((state) => state.Sears?.SearsData?.status);
  const dispatch = useDispatch();
  const customId = "custom-id-yes";

  const handleSearsInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const requiredFields = [
    "nickname",
    "searssellerid",
    "searsapikey",
    "searsemail",
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
    dispatch(InsertSearsData(formValues))
      .then(() => {
        switch (Searsstatus) {
          case "succes":
            toast.success("Connected !", { toastId: customId });
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
                <div>Connect to Sears</div>
              </div>
              <div
                style={{ position: "relative", right: "4%", fontSize: "15px" }}
              >
                <span>Channels</span>{" "}
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">connect to Sears</span>
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
                style={{ marginBottom: "32%", height: "68%" }}
              >
                <div className="heading">
                  You need an Sears Professional Seller account to sell on Sears
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
                        onChange={handleSearsInput}
                        value={formValues.nickname}
                      />

                      <div>
                        <label htmlFor="text">
                          Sears seller account email address*
                        </label>
                      </div>
                      <input
                        style={{ width: "100%", marginBottom: "0.8rem" }}
                        type="text"
                        name="searsemail"
                        placeholder="Sellersears@gmail.com"
                        onChange={handleSearsInput}
                        value={formValues.searsemail}
                      />

                      <div>
                        <label htmlFor="text">Seller ID*</label>
                      </div>
                      <input
                        style={{ width: "100%", marginBottom: "0.8rem" }}
                        type="text"
                        name="searssellerid"
                        placeholder="#1322786"
                        onChange={handleSearsInput}
                        value={formValues.searssellerid}
                      />

                      <div>
                        <label htmlFor="text">API Authorization Key*</label>
                      </div>
                      <input
                        style={{ width: "100%", marginBottom: "0.8rem" }}
                        type="text"
                        name="searsapikey"
                        placeholder="889498 51651 51651"
                        onChange={handleSearsInput}
                        value={formValues.searsapikey}
                      />

                      <div>
                        <label htmlFor="text">Location ID</label>
                      </div>
                      <input
                        style={{ width: "100%", marginBottom: "1.4rem" }}
                        type="text"
                        name="locationid"
                        placeholder="#1347986"
                        onChange={handleSearsInput}
                        value={formValues.locationid}
                      />
                    </div>
                    <div></div>
                  </div>

                  <div
                    style={{
                      width: "40vw",
                      textAlign: "center",
                      marginTop: "10px",
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
                    marginTop: "13px",
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
                    style={{ width: "45px", height: "25px" }}
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
                <span className="subMenu_subheading">Connect to Sears</span>
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">Sears Listings</span>
              </div>
            </div>
          </div>
          <SearsTable />
        </div>
      )}
    </>
  );
};

export default SearsConnect;
