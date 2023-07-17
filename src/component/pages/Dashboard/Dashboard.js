import React, { useState, useContext, useEffect } from "react";
import { Box, styled, Typography } from "@mui/material";
import PieChartHome from "./PieChart";
import LineChart1 from "./Lingraph";
import BarChartHome from "./BarChart";
import BarChartHorizontal from "./BarChartHome_horizontal";
import HomeFooterTable from "./HomeTable";
import Dashboardpage from "../../style/Dashboard/dashboard.module.css";
import { MdOutlineChevronRight } from "react-icons/md";
import { GoPrimitiveDot } from "react-icons/go";
import { AiFillInfoCircle } from "react-icons/ai";
import BarChartInventory from "./BarChartInventory";
import { DataContext } from "../../context/DataProvider";
import { render } from "@testing-library/react";
import WelcomePopup from "../../layout/NavBar/WelcomePopup";

const styleLine = {
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  border: "1px solid #E8EAED",
  display: "flex",
  borderRadius: "14px",
  padding: "35px",
  marginTop: "20px",
  width: "76vw",
};
const BoxCircle = styled(Box)`
  border: 8px solid #556ff6;
  border-radius: 50%;
  padding: 6px;
  position: relative;
  top: 3%;
  left: 3%;
`;
const BoxCircle2 = styled(Box)`
  border: 20px solid #e9effd;
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  color: #556ff6;
  font: normal normal normal 26px/21px Poppins;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Typography1 = styled(Typography)`
  text-align: left;
  font: normal normal 600 20px/13px Poppins;
  letter-spacing: 0px;
  color: #282c45;
  margin-top: 10px;
`;
const spanStyle = {
  font: "normal normal 600 34px/49px Poppins",
  letterSpacing: "0px",
  color: "#282C45",
};
const selectStyle = {
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  border: "1px solid #D7DAE2",
  width: "126%",
};

const Dashboard = () => {
  // const [showForm, setShowForm] = useState(false);
  // const toggleShow = () => setShowForm(!showForm);
  const [announcementlist, setAnnouncementlist] = useState([
    "10/10 Release Notes",
    "10/10 Release Notes",
    "10/10 Release Notes",
    "10/10 Release Notes",
    "10/10 Release Notes",
  ]);
  const { sidenavbar } = useContext(DataContext);
  console.log("sidenavbar", sidenavbar);

  return (
    <>
      {/* <WelcomePopup /> */}

      <div
        className={
          sidenavbar ? Dashboardpage.BoxContainer : Dashboardpage.BoxContainer2
        }
      >
        <div className={Dashboardpage.BoxContainertwo}>
          <div style={{ width: "60%" }}>
            <div className={Dashboardpage.graphcontainerone}>
              <div className={Dashboardpage.sectionOne}>
                <div className={Dashboardpage.headings}>
                  <div className={Dashboardpage.headingtext}>Total Orders</div>
                  <select className={Dashboardpage.headingselectbox}>
                    <option value="volvo">7 days</option>
                    <option value="saab">Saab</option>
                  </select>
                </div>
                <div className={Dashboardpage.graphone}>
                  <PieChartHome />
                  <div
                    className={Dashboardpage.BoxBrandContainer}
                    style={{ padding: "7%", marginTop: "80px", width: "100%" }}
                  >
                    <div style={{ display: "flex" }}>
                      {" "}
                      <Box
                        className={Dashboardpage.boxbrand}
                        style={{ borderColor: "#980000" }}
                      ></Box>
                      <div>
                        <span>Sears</span>
                        <span style={{ marginLeft: "110%" }}>50K</span>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      {" "}
                      <Box
                        className={Dashboardpage.boxbrand}
                        style={{ borderColor: "#00FF00" }}
                      ></Box>
                      <span>Amazon</span>
                      <span style={{ marginLeft: "50%" }}>46K</span>
                    </div>
                    <div style={{ display: "flex" }}>
                      {" "}
                      <Box
                        className={Dashboardpage.boxbrand}
                        style={{ borderColor: "#FF0000" }}
                      ></Box>
                      <span>Walmart</span>
                      <span style={{ marginLeft: "45%" }}>150K</span>
                    </div>
                    <div style={{ display: "flex" }}>
                      {" "}
                      <Box
                        className={Dashboardpage.boxbrand}
                        style={{ borderColor: "#FFFF00" }}
                      ></Box>
                      <span>eBay</span>
                      <span style={{ marginLeft: "70%" }}>100K</span>
                    </div>
                    <div style={{ display: "flex" }}>
                      {" "}
                      <Box
                        className={Dashboardpage.boxbrand}
                        style={{ borderColor: "#FF9900" }}
                      ></Box>
                      <span>Wish</span>
                      <span style={{ marginLeft: "80%" }}>10K</span>
                    </div>
                    <div style={{ display: "flex" }}>
                      {" "}
                      <Box
                        className={Dashboardpage.boxbrand}
                        style={{ borderColor: "#4A86E8" }}
                      ></Box>
                      <span>Newegg</span>
                      <span style={{ marginLeft: "58%" }}>10K</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* -------------------------------------------------------- graph one end --------------------------------- */}

              <div className={Dashboardpage.sectionOne}>
                <div className={Dashboardpage.headings}>
                  <div className={Dashboardpage.headingtext}>Total Sales</div>
                  <select className={Dashboardpage.headingselectbox}>
                    <option value="volvo">7 days</option>
                    <option value="saab">Saab</option>
                  </select>
                </div>

                <div>
                  <div className={Dashboardpage.graphtwo}>
                    <LineChart1 />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontSize: "12px",
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      {" "}
                      <Box
                        className={Dashboardpage.boxbrand}
                        style={{ borderColor: "#980000" }}
                      ></Box>
                      <span>Sears</span>
                      <span>50K</span>
                    </div>
                    <div style={{ display: "flex" }}>
                      {" "}
                      <Box
                        className={Dashboardpage.boxbrand}
                        style={{ borderColor: "#00FF00" }}
                      ></Box>
                      <span>Amazon</span>
                      <span>46K</span>
                    </div>
                    <div style={{ display: "flex" }}>
                      {" "}
                      <Box
                        className={Dashboardpage.boxbrand}
                        style={{ borderColor: "#FF0000" }}
                      ></Box>
                      <span>Walmart</span>
                      <span>150K</span>
                    </div>
                    <div style={{ display: "flex" }}>
                      {" "}
                      <Box
                        className={Dashboardpage.boxbrand}
                        style={{ borderColor: "#FFFF00" }}
                      ></Box>
                      <span>eBay</span>
                      <span>100K</span>
                    </div>
                    <div style={{ display: "flex" }}>
                      {" "}
                      <Box
                        className={Dashboardpage.boxbrand}
                        style={{ borderColor: "#FF9900" }}
                      ></Box>
                      <span>Wish</span>
                      <span>10K</span>
                    </div>
                    <div style={{ display: "flex" }}>
                      {" "}
                      <Box
                        className={Dashboardpage.boxbrand}
                        style={{ borderColor: "#4A86E8" }}
                      ></Box>
                      <span>Newegg</span>
                      <span>10K</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* -------------------------------------------------------- graph two end --------------------------------- */}
            </div>
            {/* -------------------------------------------------------- Container one end --------------------------------- */}

            <div className={Dashboardpage.graphcontainertwo}>
              <div className={Dashboardpage.sectionOne}>
                <div className={Dashboardpage.headings}>
                  <div className={Dashboardpage.headingtext}>
                    Total Products
                  </div>
                  <select className={Dashboardpage.headingselectbox}>
                    <option value="volvo">7 days</option>
                    <option value="saab">Saab</option>
                  </select>
                </div>
                <div className={Dashboardpage.graphthree}>
                  <div className={Dashboardpage.first}>246K</div>
                  <div className={Dashboardpage.second}>Last 7 days orders</div>
                  <div className={Dashboardpage.third}>Today Order:2503</div>
                </div>
              </div>
              {/* -------------------------------------------------------- graph one end --------------------------------- */}

              <div className={Dashboardpage.sectionOne}>
                <div className={Dashboardpage.headings}>
                  <div className={Dashboardpage.headingtext}>Total Lisitng</div>
                  <div className={Dashboardpage.headingselectboxforlisting}>
                    24600K
                  </div>
                </div>

                <div className={Dashboardpage.graphtwo}>
                  <BarChartHome />
                </div>
              </div>
              {/* -------------------------------------------------------- graph two end --------------------------------- */}
            </div>
            {/* -------------------------------------------------------- Container two end --------------------------------- */}
            {/* ---------------------------------------------------------Container three------------------------------------ */}

            <div className={Dashboardpage.graphcontainertwo}>
              <div className={Dashboardpage.sectionOne}>
                <div className={Dashboardpage.headings}>
                  <div className={Dashboardpage.headingtext}>
                    Top 5 Products
                  </div>
                  <div className={Dashboardpage.headingselectboxforlisting}>
                    246K
                  </div>
                </div>
                <div className={Dashboardpage.graphtwo}>
                  <BarChartHorizontal />
                </div>
              </div>
              {/* -------------------------------------------------------- graph one end --------------------------------- */}

              <div className={Dashboardpage.sectionOne}>
                <div className={Dashboardpage.headings}>
                  <div className={Dashboardpage.headingtext}>Inventory</div>
                  <div className={Dashboardpage.headingselectboxforlisting}>
                    246K
                  </div>
                </div>

                <div className={Dashboardpage.graphtwo}>
                  <BarChartInventory />
                </div>
              </div>
              {/* -------------------------------------------------------- graph four end --------------------------------- */}
            </div>
          </div>
          <div className={Dashboardpage.announcmentContainer}>
            <div className={Dashboardpage.AnnouncementsHeading}>
              Announcements
            </div>
            <div className={Dashboardpage.announcementtoplink}>
              <div className={Dashboardpage.announcementtoplinkone}>10 New</div>
              <div className={Dashboardpage.announcementtoplinktwo}>
                Mark all as seen
              </div>
            </div>
            {/* listing */}
            <table className={Dashboardpage.announcementTable}>
              {announcementlist.map((itm, i) => {
                return (
                  <tbody>
                    <tr key={i + 1} className={Dashboardpage.announcementTr}>
                      <td className={Dashboardpage.announcementTd}>
                        <GoPrimitiveDot />
                      </td>
                      <td className={Dashboardpage.announcementTd}>
                        <AiFillInfoCircle size={25} />
                        {itm}
                      </td>
                      <td className={Dashboardpage.announcementTd}>
                        <MdOutlineChevronRight />
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>

        <HomeFooterTable />
      </div>
    </>
  );
};

export default Dashboard;
