import React, { useState, useContext, useEffect } from "react";
import "../../style/layout/Navbar.css";
import FlagIcon from "../../images/menubaricons/iconUsa.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsChevronDown } from "react-icons/bs";
import { useNavigate, NavLink, Outlet, Link } from "react-router-dom";
import Champ from "../../images/menubaricons/Champ.png";

import RightArrowIcon from "../../images/bookcommerceimage/rightArrow.png";
import DownArrowLeft from "../../images/bookcommerceimage/downArrow.png";
import Champlogonew from "../../images/menubaricons/Champlogonew.png";
import Champnew from "../../images/menubaricons/Champnew.png";

import Champlogo from "../../images/menubaricons/Champlogo.png";
import upload from "../../images/menubaricons/upload.svg";
import upload2 from "../../images/menubaricons/upload2.svg";
import { ImArrowRight2 } from "react-icons/im";
import { FaUserTie } from "react-icons/fa";
import { BsBellFill } from "react-icons/bs";
import { DataContext } from "../../context/DataProvider";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../../rtk/features/auth/authSlice";
import _ from "lodash";
import { RiCoinsLine } from "react-icons/ri";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { getUserData } from "../../../rtk/features/user/userSlice";
import { NotificationData } from "../../../rtk/features/Notification/notificationSlice";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

const linkStyle = { textDecoration: "none", color: "#7D8D9D", display: "flex" };

const SidebarTest = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.users);
  // console.log("userInformation in sidenavbarfirstname", user);
  useEffect(() => {
    dispatch(getUserData());
    dispatch(NotificationData());
  }, []);
  const { setSidenavbar } = useContext(DataContext);
  const navigate = useNavigate();
  const [topHeading, setTopHeading] = useState("Dashboard");
  const [logo, setLogo] = useState(true);
  const [hideMenu_text, setHideMenu_text] = useState(false);
  const [changeIcon, setChangeIcon] = useState("");
  const [showdown_Arrow, setShowdown_Arrow] = useState(true);
  const [showdown_Arrow1, setShowdown_Arrow1] = useState(true);
  const [showdown_Arrow2, setShowdown_Arrow2] = useState(true);
  const [showMenus, setShowMenus] = useState("home");
  const [showMenu, setShowSetshowmenu] = useState(true);

  const notificationData = useSelector(
    (state) => state.Notification?.notificationData
  );

  let notificationLength = 0;
  if (notificationData && Array.isArray(notificationData.Notification)) {
    notificationLength = notificationData.Notification.length;
  }

  const toggleShow = () => {
    setShowSetshowmenu(!showMenu);
    setSidenavbar(!showMenu);
  };

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const Home_Handle = () => {
    navigate("/Dashboard");
    setTopHeading("Dashboard");
    setChangeIcon("Dashboard");
    setShowMenus("Dashboard");
    setShowAction("");
    setShowVariousSetting("");
    setShowdown_Arrow(true);
    setShowdown_Arrow1(true);
    setShowdown_Arrow2(true);
  };

  const [showChannel, setShowChannel] = useState(false);
  const [showChannel_setting, setShowChannel_setting] = useState(false);
  const Channel_Handle = () => {
    navigate("/channels");
    setTopHeading("Channels");
    setShowChannel(!showChannel);
    setChangeIcon("channel");
    setShowMenus("Channels");
    setShowAction("");
    setShowOrder_dropDown("");
    setShowVariousSetting("");
    setShowdown_Arrow(false);
    setShowdown_Arrow1(false);
    setShowdown_Arrow2(false);
  };

  const change_Logo = () => {
    setLogo(!logo);
    setHideMenu_text(!hideMenu_text);
  };

  const [showAction, setShowAction] = useState("");
  const showLeft_Dropdown_Action = () => {
    setShowdown_Arrow(!showdown_Arrow);
    setTopHeading("Actions");
    navigate("/AddInventory");
    setChangeIcon("action");
    setShowMenus("Actions");
    setShowAction("");
    setShowOrder_dropDown("");
    setShowVariousSetting("");
    setShowdown_Arrow1(false);
    setShowdown_Arrow2(false);
  };
  const [showOrder_dropDown, setShowOrder_dropDown] = useState("");
  const showLeft_Dropdown_Order = () => {
    navigate("/orderlisting");
    setShowdown_Arrow1(!showdown_Arrow1);
    setTopHeading("Orders");
    setChangeIcon("order");
    setShowMenus("order");
    setShowAction("");
    setShowVariousSetting("");
    setShowdown_Arrow(false);
    setShowdown_Arrow2(false);
  };

  const [showNotification, setShowNotification] = useState(false);
  const handleNotification = () => {
    setTopHeading("Notifications");
    setShowNotification(true);
    setChangeIcon("notification");
    setShowMenus("notification");
    setShowAction("");
    setShowOrder_dropDown("");
    setShowVariousSetting("");
    setShowdown_Arrow(false);
    setShowdown_Arrow1(false);
    setShowdown_Arrow2(false);
  };

  const handleReport = () => {
    navigate("/report");
    setTopHeading("Reports");
    setChangeIcon("report");
    setShowMenus("Reports");
    setShowAction("");
    setShowOrder_dropDown("");
    setShowVariousSetting("");
    setShowdown_Arrow(false);
    setShowdown_Arrow1(false);
    setShowdown_Arrow2(false);
  };

  const [showVariousSetting, setShowVariousSetting] = useState("");
  const showLeft_Dropdown_Setting = () => {
    setShowdown_Arrow(!showdown_Arrow);
    navigate("/channelseting");
    setTopHeading("Settings");
    setChangeIcon("setting");
    setShowdown_Arrow2(!showdown_Arrow2);
    setShowMenus("setting");
    setShowAction("");
    setShowOrder_dropDown("");
    setShowdown_Arrow(false);
    setShowdown_Arrow1(false);
  };

  const AccountSettingPageHandle = () => {
    setShowChannel_setting(!showChannel_setting);
    setShowAction("");
    setShowOrder_dropDown("");
    setShowMenus("");
    setShowVariousSetting("accountsetting");
  };

  const ChannelSettingPageHandle = () => {
    setShowChannel_setting(!showChannel_setting);
    setShowAction("");
    setShowOrder_dropDown("");
    setShowMenus("");
    setShowVariousSetting("channelsetting");
    setTopHeading("Settings");
  };

  const EmailSettingPageHandle = () => {
    setShowChannel_setting(!showChannel_setting);
    setShowAction("");
    setShowOrder_dropDown("");
    setShowMenus("");
    setShowVariousSetting("emailsetting");
    setTopHeading("Settings");
  };

  const BillingSettingPageHandle = () => {
    setShowChannel_setting(!showChannel_setting);
    setShowAction("");
    setShowOrder_dropDown("");
    setShowMenus("");
    setShowVariousSetting("billingsetting");
    setTopHeading("Settings");
  };

  const PurgeCatalogPageHandle = () => {
    setShowChannel_setting(!showChannel_setting);
    setShowAction("");
    setShowOrder_dropDown("");
    setShowMenus("");
    setShowVariousSetting("purgecatalog");
    setTopHeading("Settings");
  };

  let RenderedComponent;
  if (showMenu) {
    RenderedComponent = (
      <>
        <div className="topMenuContainerupper">
          <div className="topMenuContainer">
            <div className="menuIconDiv">
              <div className="menuIconSub" onClick={toggleShow}>
                {logo ? <GiHamburgerMenu /> : <GiHamburgerMenu />}
              </div>{" "}
              <div className="topHeading">
                <p>{topHeading}</p>
              </div>
            </div>
            <div className="profileContainer">
              <div className="notifiactionIconTop">
                <Badge
                  color="success"
                  overlap="circular"
                  badgeContent={notificationLength}
                  style={{ marginRight: "2rem" }}
                >
                  <NotificationsIcon
                    style={{ color: " #13A74B", fontSize: "36" }}
                  />
                </Badge>
              </div>

              <div className="profileicontop">
                <div>
                  <FaUserTie
                    size={30}
                    style={{ color: "#595959", marginRight: "15px" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "6vw",
                    height: "5vh",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: "4vw", fontSize: "16px" }}>
                    {user.firstname}
                  </div>{" "}
                  <div style={{ width: "2vw" }}>
                    <BsChevronDown />
                  </div>
                </div>
                {/* {_.isEmpty(user.user) && user.user.firstname} */}
              </div>
              <div className="" style={{ display: "flex" }}>
                <div>
                  <img
                    src={FlagIcon}
                    alt="loading"
                    style={{ width: "33px", height: "33px" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "4vw",
                    height: "4vh",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ fontSize: "16px" }}>USA</div>
                  <div style={{ marginLeft: "8px" }}>
                    <BsChevronDown />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------- Side menu icons------------------ */}
        <div>
          <div className="sideMenu_champIcon1">
            {logo ? (
              <div style={{ width: "14vw", paddingTop: "0.5rem" }}>
                <img
                  onClick={() => {
                    navigate("/Dashboard");
                  }}
                  src={Champlogonew}
                  style={{
                    width: "13vw",
                    padding: "5px 8px 0px 18px",
                    cursor: "pointer",
                    height: "6.5vh",
                  }}
                  alt="loading..."
                />
              </div>
            ) : (
              <div>
                <img
                  src={Champnew}
                  style={{ width: "4vw", marginLeft: "9%" }}
                  alt="loading..."
                />
              </div>
            )}
          </div>
          <div className="leftMenuContainer">
            <div
              style={{
                font: "normal normal normal 16px/25px Poppins",
                letterSpacing: "0px",
                color: "black",
                marginTop: "30px",
              }}
            >
              <p>Menu</p>
              <hr />
            </div>
            <div
              className={
                changeIcon === "Dashboard"
                  ? "sideMenuIconsHover"
                  : "sideMenuIcons"
              }
              onClick={Home_Handle}
            >
              <div>
                {changeIcon === "Dashboard" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 26.364 26.364"
                  >
                    <path
                      id="Path_23"
                      data-name="Path 23"
                      d="M4.465,17.647h8.788a1.469,1.469,0,0,0,1.465-1.465V4.465A1.469,1.469,0,0,0,13.253,3H4.465A1.469,1.469,0,0,0,3,4.465V16.182A1.469,1.469,0,0,0,4.465,17.647Zm0,11.718h8.788A1.469,1.469,0,0,0,14.718,27.9V22.041a1.469,1.469,0,0,0-1.465-1.465H4.465A1.469,1.469,0,0,0,3,22.041V27.9A1.469,1.469,0,0,0,4.465,29.364Zm14.647,0H27.9A1.469,1.469,0,0,0,29.364,27.9V16.182A1.469,1.469,0,0,0,27.9,14.718H19.112a1.469,1.469,0,0,0-1.465,1.465V27.9A1.469,1.469,0,0,0,19.112,29.364Zm-1.465-24.9v5.859a1.469,1.469,0,0,0,1.465,1.465H27.9a1.469,1.469,0,0,0,1.465-1.465V4.465A1.469,1.469,0,0,0,27.9,3H19.112A1.469,1.469,0,0,0,17.647,4.465Z"
                      transform="translate(-3 -3)"
                      fill="#13a74b"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 26.364 26.364"
                  >
                    <path
                      id="Path_23"
                      data-name="Path 23"
                      d="M4.465,17.647h8.788a1.469,1.469,0,0,0,1.465-1.465V4.465A1.469,1.469,0,0,0,13.253,3H4.465A1.469,1.469,0,0,0,3,4.465V16.182A1.469,1.469,0,0,0,4.465,17.647Zm0,11.718h8.788A1.469,1.469,0,0,0,14.718,27.9V22.041a1.469,1.469,0,0,0-1.465-1.465H4.465A1.469,1.469,0,0,0,3,22.041V27.9A1.469,1.469,0,0,0,4.465,29.364Zm14.647,0H27.9A1.469,1.469,0,0,0,29.364,27.9V16.182A1.469,1.469,0,0,0,27.9,14.718H19.112a1.469,1.469,0,0,0-1.465,1.465V27.9A1.469,1.469,0,0,0,19.112,29.364Zm-1.465-24.9v5.859a1.469,1.469,0,0,0,1.465,1.465H27.9a1.469,1.469,0,0,0,1.465-1.465V4.465A1.469,1.469,0,0,0,27.9,3H19.112A1.469,1.469,0,0,0,17.647,4.465Z"
                      transform="translate(-3 -3)"
                      fill="#7d8d9d"
                    />
                  </svg>
                )}
              </div>

              <div className={hideMenu_text ? "hidetext" : null}>Dashboard</div>
            </div>

            <div
              className={
                changeIcon === "channel"
                  ? "sideMenuIconsHover"
                  : "sideMenuIcons"
              }
              onClick={Channel_Handle}
            >
              <div>
                {changeIcon === "channel" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 25.65 25.765"
                  >
                    <path
                      id="Path_272"
                      data-name="Path 272"
                      d="M113.511,37.711a3.633,3.633,0,0,0-3.563,2.951,5.575,5.575,0,0,1-4.875-4.515,3.633,3.633,0,0,0-.091-7.126V26.413a3.633,3.633,0,1,0-1.3,0v2.607a3.633,3.633,0,0,0-.1,7.126,5.584,5.584,0,0,1-4.88,4.515,3.637,3.637,0,1,0,0,1.3,6.892,6.892,0,0,0,5.614-3.911,6.892,6.892,0,0,0,5.61,3.911,3.633,3.633,0,1,0,3.576-4.258Z"
                      transform="translate(-91.487 -19.207)"
                      fill="#13a74b"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 25.65 25.765"
                  >
                    <path
                      id="Path_272"
                      data-name="Path 272"
                      d="M113.511,37.711a3.633,3.633,0,0,0-3.563,2.951,5.575,5.575,0,0,1-4.875-4.515,3.633,3.633,0,0,0-.091-7.126V26.413a3.633,3.633,0,1,0-1.3,0v2.607a3.633,3.633,0,0,0-.1,7.126,5.584,5.584,0,0,1-4.88,4.515,3.637,3.637,0,1,0,0,1.3,6.892,6.892,0,0,0,5.614-3.911,6.892,6.892,0,0,0,5.61,3.911,3.633,3.633,0,1,0,3.576-4.258Z"
                      transform="translate(-91.487 -19.207)"
                      fill="#7d8d9d"
                    />
                  </svg>
                )}
              </div>
              <div className={hideMenu_text ? "hidetext" : null}>
                {" "}
                Channels{" "}
              </div>
            </div>

            <div
              className={
                changeIcon === "action" ? "sideMenuIconsHover" : "sideMenuIcons"
              }
              onClick={showLeft_Dropdown_Action}
            >
              <div>
                {changeIcon === "action" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 27.655 24.498"
                  >
                    <g
                      id="Group_221"
                      data-name="Group 221"
                      transform="translate(66 664)"
                    >
                      <path
                        id="Path_273"
                        data-name="Path 273"
                        d="M95.944,200.107v6.015a4.973,4.973,0,0,1-.359,1.979H78.336v-2.806L71.1,209.474l7.238,4.179v-2.8H95.963c1.656,0,2.736-1.894,2.736-4.734v-8.8c-.27.162-.307.327-.47.491-.766.767-1.474,1.533-2.284,2.3Z"
                        transform="translate(-137.044 -853.154)"
                        fill="#13a74b"
                      />
                      <path
                        id="Path_274"
                        data-name="Path 274"
                        d="M72.814,45.507V39.492a5.233,5.233,0,0,1,.375-2.033H90.422v2.86l7.238-4.179-7.238-4.179V34.7H72.814C71.157,34.7,70,36.652,70,39.492v8.8c.324-.162.334-.327.5-.491.766-.767,1.5-1.533,2.311-2.3Z"
                        transform="translate(-136.005 -695.962)"
                        fill="#13a74b"
                      />
                    </g>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 27.655 24.498"
                  >
                    <g
                      id="Group_221"
                      data-name="Group 221"
                      transform="translate(66 664)"
                    >
                      <path
                        id="Path_273"
                        data-name="Path 273"
                        d="M95.944,200.107v6.015a4.973,4.973,0,0,1-.359,1.979H78.336v-2.806L71.1,209.474l7.238,4.179v-2.8H95.963c1.656,0,2.736-1.894,2.736-4.734v-8.8c-.27.162-.307.327-.47.491-.766.767-1.474,1.533-2.284,2.3Z"
                        transform="translate(-137.044 -853.154)"
                        fill="#7d8d9d"
                      />
                      <path
                        id="Path_274"
                        data-name="Path 274"
                        d="M72.814,45.507V39.492a5.233,5.233,0,0,1,.375-2.033H90.422v2.86l7.238-4.179-7.238-4.179V34.7H72.814C71.157,34.7,70,36.652,70,39.492v8.8c.324-.162.334-.327.5-.491.766-.767,1.5-1.533,2.311-2.3Z"
                        transform="translate(-136.005 -695.962)"
                        fill="#7d8d9d"
                      />
                    </g>
                  </svg>
                )}
              </div>
              <div className={hideMenu_text ? "hidetext" : null}>Actions</div>
              <div
                className={hideMenu_text ? "hidetext" : null}
                style={{ position: "relative", right: "-20px" }}
              >
                {showdown_Arrow ? (
                  <img src={DownArrowLeft} alt="loading..." />
                ) : (
                  <img src={RightArrowIcon} alt="loading..." />
                )}
              </div>{" "}
            </div>
            {showdown_Arrow && (
              <div className="dropdownList_Action">
                <ul
                  style={{ listStyle: "none" }}
                  className={hideMenu_text ? "hidetext" : null}
                >
                  <li
                    onClick={() => {
                      setShowAction("addInventory");
                      setShowMenus("");
                      setTopHeading("Actions");
                    }}
                  >
                    <NavLink
                      style={({ isActive }) => ({
                        color: isActive ? "#13A74B" : "#7D8D9D",
                        textDecoration: "none",
                      })}
                      to="/AddInventory"
                    >
                      Add Inventory
                    </NavLink>
                  </li>
                  <li
                    onClick={() => {
                      setShowAction("bulkImport");
                      setShowMenus("");
                      setTopHeading("Actions");
                    }}
                  >
                    <NavLink
                      style={({ isActive }) => ({
                        color: isActive ? "#13A74B" : "#7D8D9D",
                        textDecoration: "none",
                      })}
                      to="/bulkimport"
                    >
                      Bulk Import
                    </NavLink>
                  </li>
                  <li
                    onClick={() => {
                      setShowAction("productCatalog");
                      setShowMenus("");
                      setTopHeading("Actions");
                    }}
                  >
                    <NavLink
                      style={({ isActive }) => ({
                        color: isActive ? "#13A74B" : "#7D8D9D",
                        textDecoration: "none",
                      })}
                      to="/ProductCatalog"
                    >
                      Product Catalog
                    </NavLink>
                  </li>
                  <li
                    onClick={() => {
                      setShowAction("listings");
                      setShowMenus("");
                      setTopHeading("Actions");
                    }}
                  >
                    <NavLink
                      style={({ isActive }) => ({
                        color: isActive ? "#13A74B" : "#7D8D9D",
                        textDecoration: "none",
                      })}
                      to="/Listings"
                    >
                      {" "}
                      Listings
                    </NavLink>
                  </li>
                  <li
                    onClick={() => {
                      setShowAction("amazonRepricing");
                      setShowMenus("");
                      setTopHeading("Actions");
                    }}
                  >
                    <NavLink
                      style={({ isActive }) => ({
                        color: isActive ? "#13A74B" : "#7D8D9D",
                        textDecoration: "none",
                      })}
                      to="/AmazonRepricing"
                    >
                      Amazon Repricing
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}

            <div
              className={
                changeIcon === "order" ? "sideMenuIconsHover" : "sideMenuIcons"
              }
              onClick={showLeft_Dropdown_Order}
            >
              <div>
                {changeIcon === "order" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 25.397 23.459"
                  >
                    <path
                      id="Path_280"
                      data-name="Path 280"
                      d="M121.15,52.151V65.109L109.079,68.6V55.645L121.15,52.15Zm-12.7,2.369L104.4,53.345l4.084-1.85a.627.627,0,0,0-.515-1.143l-5.421,2.457-6.791-1.966,12.7-5.7,12.7,5.7ZM107.824,68.6,95.753,65.109V52.151l6.058,1.754v5.038a.628.628,0,1,0,1.255,0V54.268l4.758,1.377Z"
                      transform="translate(-95.753 -45.144)"
                      fill="#13a74b"
                      fillRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 25.397 23.459"
                  >
                    <path
                      id="Path_280"
                      data-name="Path 280"
                      d="M121.15,52.151V65.109L109.079,68.6V55.645L121.15,52.15Zm-12.7,2.369L104.4,53.345l4.084-1.85a.627.627,0,0,0-.515-1.143l-5.421,2.457-6.791-1.966,12.7-5.7,12.7,5.7ZM107.824,68.6,95.753,65.109V52.151l6.058,1.754v5.038a.628.628,0,1,0,1.255,0V54.268l4.758,1.377Z"
                      transform="translate(-95.753 -45.144)"
                      fill="#7d8d9d"
                      fillRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className={hideMenu_text ? "hidetext" : null}>Orders</div>
              <div
                className={hideMenu_text ? "hidetext" : null}
                style={{ position: "relative", right: "-24px" }}
              >
                {showdown_Arrow1 ? (
                  <img src={DownArrowLeft} alt="loading..." />
                ) : (
                  <img src={RightArrowIcon} alt="loading..." />
                )}
              </div>
            </div>
            {showdown_Arrow1 && (
              <div className="dropdownList_Order">
                <ul
                  style={{ listStyle: "none" }}
                  className={hideMenu_text ? "hidetext" : null}
                >
                  <li
                    onClick={() => {
                      setShowOrder_dropDown("addOrders");
                      setShowMenus("");
                      setTopHeading("Orders");
                    }}
                  >
                    <NavLink
                      style={({ isActive }) => ({
                        color: isActive ? "#13A74B" : "#7D8D9D",
                        textDecoration: "none",
                      })}
                      to="/OrderListing"
                    >
                      Order Listing
                    </NavLink>
                  </li>

                  <li
                    onClick={() => {
                      setShowOrder_dropDown("orderListings");
                      setShowMenus("");
                      setTopHeading("Orders");
                    }}
                  >
                    <NavLink
                      style={({ isActive }) => ({
                        color: isActive ? "#13A74B" : "#7D8D9D",
                        textDecoration: "none",
                      })}
                      to="/ExportOrder"
                    >
                      Export Order
                    </NavLink>
                  </li>

                  <li
                    onClick={() => {
                      setShowOrder_dropDown("exportOrder");
                      setShowMenus("");
                      setTopHeading("Orders");
                    }}
                  >
                    <NavLink
                      style={({ isActive }) => ({
                        color: isActive ? "#13A74B" : "#7D8D9D",
                        textDecoration: "none",
                      })}
                      to="/Shipment"
                    >
                      Shipment
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}

            <div
              className={
                changeIcon === "notification"
                  ? "sideMenuIconsHover"
                  : "sideMenuIcons"
              }
              onClick={handleNotification}
            >
              <Link style={linkStyle} to="/notification">
                <div>
                  {changeIcon === "notification" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.749"
                      height="23.467"
                      viewBox="0 0 23.749 23.467"
                    >
                      <path
                        id="Path_276"
                        data-name="Path 276"
                        d="M21.229,18.747V12.729c0-3.695-1.974-6.787-5.416-7.606V4.305A1.813,1.813,0,0,0,14,2.5,1.793,1.793,0,0,0,12.2,4.305v.818c-3.454.818-5.416,3.9-5.416,7.606v6.017L5.223,20.3a1.2,1.2,0,0,0,.842,2.058H21.915a1.207,1.207,0,0,0,.854-2.058ZM14,25.967A2.414,2.414,0,0,0,16.4,23.56H11.589A2.406,2.406,0,0,0,14,25.967ZM7.714,5.184A1.186,1.186,0,0,0,7.75,3.463a1.2,1.2,0,0,0-1.673-.024,12.545,12.545,0,0,0-3.935,7.293,1.216,1.216,0,0,0,1.2,1.4,1.2,1.2,0,0,0,1.179-1A10.157,10.157,0,0,1,7.714,5.184ZM21.951,3.439a1.218,1.218,0,0,0-1.685.024A1.182,1.182,0,0,0,20.3,5.172a10.224,10.224,0,0,1,3.189,5.945,1.181,1.181,0,0,0,1.179,1,1.208,1.208,0,0,0,1.191-1.4,12.621,12.621,0,0,0-3.911-7.281Z"
                        transform="translate(-2.129 -2.5)"
                        fill="#13a74b"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.749"
                      height="23.467"
                      viewBox="0 0 23.749 23.467"
                    >
                      <path
                        id="Path_276"
                        data-name="Path 276"
                        d="M21.229,18.747V12.729c0-3.695-1.974-6.787-5.416-7.606V4.305A1.813,1.813,0,0,0,14,2.5,1.793,1.793,0,0,0,12.2,4.305v.818c-3.454.818-5.416,3.9-5.416,7.606v6.017L5.223,20.3a1.2,1.2,0,0,0,.842,2.058H21.915a1.207,1.207,0,0,0,.854-2.058ZM14,25.967A2.414,2.414,0,0,0,16.4,23.56H11.589A2.406,2.406,0,0,0,14,25.967ZM7.714,5.184A1.186,1.186,0,0,0,7.75,3.463a1.2,1.2,0,0,0-1.673-.024,12.545,12.545,0,0,0-3.935,7.293,1.216,1.216,0,0,0,1.2,1.4,1.2,1.2,0,0,0,1.179-1A10.157,10.157,0,0,1,7.714,5.184ZM21.951,3.439a1.218,1.218,0,0,0-1.685.024A1.182,1.182,0,0,0,20.3,5.172a10.224,10.224,0,0,1,3.189,5.945,1.181,1.181,0,0,0,1.179,1,1.208,1.208,0,0,0,1.191-1.4,12.621,12.621,0,0,0-3.911-7.281Z"
                        transform="translate(-2.129 -2.5)"
                        fill="#7d8d9d"
                      />
                    </svg>
                  )}
                </div>
                <div className={hideMenu_text ? "hidetext" : null}>
                  {" "}
                  Notifications{" "}
                </div>
              </Link>
            </div>

            <div
              className={
                changeIcon === "report" ? "sideMenuIconsHover" : "sideMenuIcons"
              }
              onClick={handleReport}
            >
              <Link style={linkStyle} to="/report">
                <div>
                  {changeIcon === "report" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.749"
                      height="23.467"
                      viewBox="0 0 19.053 26.068"
                    >
                      <g
                        id="Group_220"
                        data-name="Group 220"
                        transform="translate(252.926 -430.656)"
                      >
                        <path
                          id="Path_277"
                          data-name="Path 277"
                          d="M250.424,0h-7.71L241.49,4.12h10.158Z"
                          transform="translate(-489.929 430.656)"
                          fill="#13a74b"
                        />
                        <path
                          id="Path_278"
                          data-name="Path 278"
                          d="M162.42,36.75h-2.407l.938,3.223h-12.32l.938-3.223h-2.407a1.915,1.915,0,0,0-1.917,1.917v20.52a1.915,1.915,0,0,0,1.917,1.917h15.217a1.915,1.915,0,0,0,1.917-1.917V38.667a1.856,1.856,0,0,0-1.877-1.917Zm-12.4,20.928H148.3v-4.61h1.713Zm3.753,0h-1.713V50.743h1.713Zm3.753,0h-1.713v-9.22h1.713Zm3.753,0h-1.713V46.133h1.713Z"
                          transform="translate(-398.171 395.619)"
                          fill="#13a74b"
                        />
                      </g>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.749"
                      height="23.467"
                      viewBox="0 0 19.053 26.068"
                    >
                      <g
                        id="Group_220"
                        data-name="Group 220"
                        transform="translate(252.926 -430.656)"
                      >
                        <path
                          id="Path_277"
                          data-name="Path 277"
                          d="M250.424,0h-7.71L241.49,4.12h10.158Z"
                          transform="translate(-489.929 430.656)"
                          fill="#7d8d9d"
                        />
                        <path
                          id="Path_278"
                          data-name="Path 278"
                          d="M162.42,36.75h-2.407l.938,3.223h-12.32l.938-3.223h-2.407a1.915,1.915,0,0,0-1.917,1.917v20.52a1.915,1.915,0,0,0,1.917,1.917h15.217a1.915,1.915,0,0,0,1.917-1.917V38.667a1.856,1.856,0,0,0-1.877-1.917Zm-12.4,20.928H148.3v-4.61h1.713Zm3.753,0h-1.713V50.743h1.713Zm3.753,0h-1.713v-9.22h1.713Zm3.753,0h-1.713V46.133h1.713Z"
                          transform="translate(-398.171 395.619)"
                          fill="#7d8d9d"
                        />
                      </g>
                    </svg>
                  )}
                </div>
                <div className={hideMenu_text ? "hidetext" : null}>
                  {" "}
                  Reports{" "}
                </div>
              </Link>
            </div>

            <div
              className={
                changeIcon === "setting"
                  ? "sideMenuIconsHover"
                  : "sideMenuIcons"
              }
              onClick={showLeft_Dropdown_Setting}
            >
              <div style={{ marginLeft: "1.5%", marginRight: "2px" }}>
                {changeIcon === "setting" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 26.237 26.284"
                    id="rectangle"
                    className="rotate-icon"
                  >
                    <path
                      id="Path_279"
                      data-name="Path 279"
                      d="M130.019,45.589h-.375a2.287,2.287,0,0,1-2.061-1.406,2.213,2.213,0,0,1,.469-2.483l.234-.234a1.245,1.245,0,0,0,0-1.734L126.458,37.9a1.245,1.245,0,0,0-1.734,0l-.234.234a2.308,2.308,0,0,1-2.436.469,2.214,2.214,0,0,1-1.406-2.061v-.328A1.24,1.24,0,0,0,119.43,35h-2.577a1.24,1.24,0,0,0-1.218,1.218v.375a2.287,2.287,0,0,1-1.406,2.061,2.213,2.213,0,0,1-2.483-.469l-.234-.234a1.245,1.245,0,0,0-1.734,0l-1.827,1.827a1.245,1.245,0,0,0,0,1.734l.234.234a2.308,2.308,0,0,1,.469,2.436,2.214,2.214,0,0,1-2.061,1.406h-.375A1.24,1.24,0,0,0,105,46.807v2.577a1.24,1.24,0,0,0,1.218,1.218h.375a2.287,2.287,0,0,1,2.061,1.406,2.213,2.213,0,0,1-.469,2.483l-.234.234a1.244,1.244,0,0,0,0,1.78l1.827,1.827a1.245,1.245,0,0,0,1.734,0l.234-.234a2.2,2.2,0,0,1,1.546-.656,2.03,2.03,0,0,1,.89.187,2.214,2.214,0,0,1,1.406,2.061v.375a1.24,1.24,0,0,0,1.218,1.218h2.577a1.24,1.24,0,0,0,1.218-1.218v-.375a2.287,2.287,0,0,1,1.406-2.061,2.213,2.213,0,0,1,2.483.469l.234.234a1.245,1.245,0,0,0,1.734,0l1.827-1.827a1.245,1.245,0,0,0,0-1.734l-.234-.234a2.326,2.326,0,0,1-.469-2.436,2.214,2.214,0,0,1,2.061-1.406h.375a1.24,1.24,0,0,0,1.218-1.218V46.9A1.263,1.263,0,0,0,130.019,45.589Zm-11.9,8.106a5.575,5.575,0,1,1,5.575-5.575A5.558,5.558,0,0,1,118.119,53.694Z"
                      transform="translate(-105 -35)"
                      fill="#13a74b"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 26.237 26.284"
                    id="rectangle"
                    className="rotate-icon"
                  >
                    <path
                      id="Path_279"
                      data-name="Path 279"
                      d="M130.019,45.589h-.375a2.287,2.287,0,0,1-2.061-1.406,2.213,2.213,0,0,1,.469-2.483l.234-.234a1.245,1.245,0,0,0,0-1.734L126.458,37.9a1.245,1.245,0,0,0-1.734,0l-.234.234a2.308,2.308,0,0,1-2.436.469,2.214,2.214,0,0,1-1.406-2.061v-.328A1.24,1.24,0,0,0,119.43,35h-2.577a1.24,1.24,0,0,0-1.218,1.218v.375a2.287,2.287,0,0,1-1.406,2.061,2.213,2.213,0,0,1-2.483-.469l-.234-.234a1.245,1.245,0,0,0-1.734,0l-1.827,1.827a1.245,1.245,0,0,0,0,1.734l.234.234a2.308,2.308,0,0,1,.469,2.436,2.214,2.214,0,0,1-2.061,1.406h-.375A1.24,1.24,0,0,0,105,46.807v2.577a1.24,1.24,0,0,0,1.218,1.218h.375a2.287,2.287,0,0,1,2.061,1.406,2.213,2.213,0,0,1-.469,2.483l-.234.234a1.244,1.244,0,0,0,0,1.78l1.827,1.827a1.245,1.245,0,0,0,1.734,0l.234-.234a2.2,2.2,0,0,1,1.546-.656,2.03,2.03,0,0,1,.89.187,2.214,2.214,0,0,1,1.406,2.061v.375a1.24,1.24,0,0,0,1.218,1.218h2.577a1.24,1.24,0,0,0,1.218-1.218v-.375a2.287,2.287,0,0,1,1.406-2.061,2.213,2.213,0,0,1,2.483.469l.234.234a1.245,1.245,0,0,0,1.734,0l1.827-1.827a1.245,1.245,0,0,0,0-1.734l-.234-.234a2.326,2.326,0,0,1-.469-2.436,2.214,2.214,0,0,1,2.061-1.406h.375a1.24,1.24,0,0,0,1.218-1.218V46.9A1.263,1.263,0,0,0,130.019,45.589Zm-11.9,8.106a5.575,5.575,0,1,1,5.575-5.575A5.558,5.558,0,0,1,118.119,53.694Z"
                      transform="translate(-105 -35)"
                      fill="#7d8d9d"
                    />
                  </svg>
                )}
              </div>
              <div className={hideMenu_text ? "hidetext" : null}>Settings</div>
              <div
                className={hideMenu_text ? "hidetext" : null}
                style={{ position: "relative", right: "-20px" }}
              >
                {showdown_Arrow2 ? (
                  <img src={DownArrowLeft} alt="loading..." />
                ) : (
                  <img src={RightArrowIcon} alt="loading..." />
                )}
              </div>{" "}
            </div>
            {showdown_Arrow2 && (
              <div className="dropdownList_Setting">
                <ul
                  style={{ listStyle: "none" }}
                  className={hideMenu_text ? "hidetext" : null}
                >
                  <li onClick={ChannelSettingPageHandle}>
                    <NavLink
                      style={({ isActive }) => ({
                        color: isActive ? "#13A74B" : "#7D8D9D",
                        textDecoration: "none",
                      })}
                      to="/channelseting"
                    >
                      Channels Settings
                    </NavLink>
                  </li>

                  <li onClick={EmailSettingPageHandle}>
                    <NavLink
                      style={({ isActive }) => ({
                        color: isActive ? "#13A74B" : "#7D8D9D",
                        textDecoration: "none",
                      })}
                      to="/emailsettings"
                    >
                      Email Settings
                    </NavLink>
                  </li>

                  <li onClick={AccountSettingPageHandle}>
                    <NavLink
                      style={({ isActive }) => ({
                        color: isActive ? "#13A74B" : "#7D8D9D",
                        textDecoration: "none",
                      })}
                      to="/accountSettings"
                    >
                      Account Settings
                    </NavLink>
                  </li>

                  <li onClick={BillingSettingPageHandle}>
                    <NavLink
                      style={({ isActive }) => ({
                        color: isActive ? "#13A74B" : "#7D8D9D",
                        textDecoration: "none",
                      })}
                      to="/billingSettings"
                    >
                      Billing Settings
                    </NavLink>
                  </li>

                  <li onClick={PurgeCatalogPageHandle}>
                    <NavLink
                      style={({ isActive }) => ({
                        color: isActive ? "#13A74B" : "#7D8D9D",
                        textDecoration: "none",
                      })}
                      to="/purgeCatalog"
                    >
                      Purge Catalog
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}

            <div
              style={{
                font: "normal normal normal 16px/25px Poppins",
                letterSpacing: "0px",
                color: "black",
                marginTop: "30px",
              }}
            >
              <p>Recent Activites</p>
            </div>
            <hr />
            <div
              className={
                changeIcon === "#" ? "sideMenuIconsHover" : "sideMenuIcons"
              }
            >
              <div>
                <img
                  className="svgrotate"
                  src={changeIcon === "#" ? upload2 : upload}
                  alt="loading..."
                  width={23}
                  height={23}
                />
              </div>
              <div className={hideMenu_text ? "hidetext" : null}>
                {" "}
                Order Exported{" "}
              </div>
            </div>
            <div
              className={
                changeIcon === "#" ? "sideMenuIconsHover" : "sideMenuIcons"
              }
            >
              <div>
                <img
                  className="svgrotate"
                  src={changeIcon === "#" ? upload2 : upload}
                  alt="loading..."
                  width={23}
                  height={23}
                />
              </div>
              <div className={hideMenu_text ? "hidetext" : null}>
                {" "}
                Order Exported{" "}
              </div>
            </div>
            <div
              className={
                changeIcon === "#" ? "sideMenuIconsHover" : "sideMenuIcons"
              }
            >
              <div>
                <img
                  className="svgrotate"
                  src={changeIcon === "#" ? upload2 : upload}
                  alt="loading..."
                  width={23}
                  height={23}
                />
              </div>
              <div className={hideMenu_text ? "hidetext" : null}>
                {" "}
                Order Exported{" "}
              </div>
            </div>
            <div
              className={
                changeIcon === "#" ? "sideMenuIconsHover" : "sideMenuIcons"
              }
              onClick={onLogout}
            >
              <div>
                {changeIcon === "#" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 26.488 33.109"
                  >
                    <path
                      id="sign-out"
                      d="M25.521,2H8.966A4.878,4.878,0,0,0,4,6.966V16.9H18.237l-3.808-3.808a1.639,1.639,0,0,1,2.318-2.318L23.369,17.4a1.6,1.6,0,0,1,0,2.318h0l-6.622,6.622a1.639,1.639,0,0,1-2.318-2.318l3.808-3.808H4v9.933a4.878,4.878,0,0,0,4.966,4.966H25.521a4.878,4.878,0,0,0,4.966-4.966V6.966A4.878,4.878,0,0,0,25.521,2Z"
                      transform="translate(-4 -2)"
                      fill="#7d8d9d"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 26.488 33.109"
                  >
                    <path
                      id="sign-out"
                      d="M25.521,2H8.966A4.878,4.878,0,0,0,4,6.966V16.9H18.237l-3.808-3.808a1.639,1.639,0,0,1,2.318-2.318L23.369,17.4a1.6,1.6,0,0,1,0,2.318h0l-6.622,6.622a1.639,1.639,0,0,1-2.318-2.318l3.808-3.808H4v9.933a4.878,4.878,0,0,0,4.966,4.966H25.521a4.878,4.878,0,0,0,4.966-4.966V6.966A4.878,4.878,0,0,0,25.521,2Z"
                      transform="translate(-4 -2)"
                      fill="#7d8d9d"
                    />
                  </svg>
                )}
              </div>
              <div
                onClick={onLogout}
                className={hideMenu_text ? "hidetext" : null}
              >
                {" "}
                Log Out{" "}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    RenderedComponent = (
      <>
        <div className="topMenuContainerupper">
          <div className="topMenuContainer2">
            <div className="menuIconDiv">
              <div className="menuIconSub" onClick={toggleShow}>
                {logo ? <ImArrowRight2 /> : <ImArrowRight2 />}
              </div>{" "}
              <div className="topHeading">
                <p>{topHeading}</p>
              </div>
            </div>
            <div className="profileContainer">
              <div className="notifiactionIconTop">
                <Badge
                  color="success"
                  overlap="circular"
                  badgeContent={notificationLength}
                  style={{ marginRight: "2rem" }}
                >
                  <NotificationsIcon
                    style={{ color: " #13A74B", fontSize: "36" }}
                  />
                </Badge>
              </div>
              <div className="profileicontop">
                <div>
                  <FaUserTie
                    size={30}
                    style={{ color: "#595959", marginRight: "15px" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "8vw",
                    height: "5vh",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "4vw", fontSize: "16px" }}>Vaidik</div>{" "}
                  <div style={{ width: "2vw" }}>
                    <BsChevronDown />
                  </div>
                </div>
                {/* {_.isEmpty(user.user) && user.user.firstname} */}
              </div>
              <div className="" style={{ display: "flex" }}>
                <div>
                  <img
                    src={FlagIcon}
                    alt="loading"
                    style={{ width: "33px", height: "33px" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "4vw",
                    height: "4vh",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ fontSize: "16px" }}>USA</div>
                  <div style={{ marginLeft: "6px" }}>
                    <BsChevronDown />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------- Side menu icons------------------ */}
        <div>
          <div className="sideMenu_champIcon1">
            {logo ? (
              <div style={{ width: "14vw" }}>
                <img
                  onClick={() => {
                    navigate("/Dashboard");
                  }}
                  src={Champnew}
                  style={{
                    width: "70px",
                    padding: "5px 8px 0px 18px",
                    cursor: "pointer",
                  }}
                  alt="loading..."
                />
              </div>
            ) : (
              <div>
                <img
                  style={{ width: "4.3vw", marginLeft: "9%" }}
                  alt="loading..."
                />
              </div>
            )}
          </div>
          <div className="leftMenuContainer2">
            <div
              style={{
                font: "normal normal normal 16px/25px Poppins",
                letterSpacing: "0px",
                color: "black",
                marginTop: "30px",
              }}
            >
              <p>Menu</p>
            </div>
            <div
              className={
                changeIcon === "Dashboard"
                  ? "sideMenuIconsHover2"
                  : "sideMenuIcons"
              }
              onClick={Home_Handle}
            >
              <div>
                {changeIcon === "Dashboard" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 26.364 26.364"
                  >
                    <path
                      id="Path_23"
                      data-name="Path 23"
                      d="M4.465,17.647h8.788a1.469,1.469,0,0,0,1.465-1.465V4.465A1.469,1.469,0,0,0,13.253,3H4.465A1.469,1.469,0,0,0,3,4.465V16.182A1.469,1.469,0,0,0,4.465,17.647Zm0,11.718h8.788A1.469,1.469,0,0,0,14.718,27.9V22.041a1.469,1.469,0,0,0-1.465-1.465H4.465A1.469,1.469,0,0,0,3,22.041V27.9A1.469,1.469,0,0,0,4.465,29.364Zm14.647,0H27.9A1.469,1.469,0,0,0,29.364,27.9V16.182A1.469,1.469,0,0,0,27.9,14.718H19.112a1.469,1.469,0,0,0-1.465,1.465V27.9A1.469,1.469,0,0,0,19.112,29.364Zm-1.465-24.9v5.859a1.469,1.469,0,0,0,1.465,1.465H27.9a1.469,1.469,0,0,0,1.465-1.465V4.465A1.469,1.469,0,0,0,27.9,3H19.112A1.469,1.469,0,0,0,17.647,4.465Z"
                      transform="translate(-3 -3)"
                      fill="#13a74b"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 26.364 26.364"
                  >
                    <path
                      id="Path_23"
                      data-name="Path 23"
                      d="M4.465,17.647h8.788a1.469,1.469,0,0,0,1.465-1.465V4.465A1.469,1.469,0,0,0,13.253,3H4.465A1.469,1.469,0,0,0,3,4.465V16.182A1.469,1.469,0,0,0,4.465,17.647Zm0,11.718h8.788A1.469,1.469,0,0,0,14.718,27.9V22.041a1.469,1.469,0,0,0-1.465-1.465H4.465A1.469,1.469,0,0,0,3,22.041V27.9A1.469,1.469,0,0,0,4.465,29.364Zm14.647,0H27.9A1.469,1.469,0,0,0,29.364,27.9V16.182A1.469,1.469,0,0,0,27.9,14.718H19.112a1.469,1.469,0,0,0-1.465,1.465V27.9A1.469,1.469,0,0,0,19.112,29.364Zm-1.465-24.9v5.859a1.469,1.469,0,0,0,1.465,1.465H27.9a1.469,1.469,0,0,0,1.465-1.465V4.465A1.469,1.469,0,0,0,27.9,3H19.112A1.469,1.469,0,0,0,17.647,4.465Z"
                      transform="translate(-3 -3)"
                      fill="#7d8d9d"
                    />
                  </svg>
                )}
              </div>
            </div>

            <div
              className={
                changeIcon === "channel"
                  ? "sideMenuIconsHover2"
                  : "sideMenuIcons"
              }
              onClick={Channel_Handle}
            >
              <div>
                {changeIcon === "channel" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 25.65 25.765"
                  >
                    <path
                      id="Path_272"
                      data-name="Path 272"
                      d="M113.511,37.711a3.633,3.633,0,0,0-3.563,2.951,5.575,5.575,0,0,1-4.875-4.515,3.633,3.633,0,0,0-.091-7.126V26.413a3.633,3.633,0,1,0-1.3,0v2.607a3.633,3.633,0,0,0-.1,7.126,5.584,5.584,0,0,1-4.88,4.515,3.637,3.637,0,1,0,0,1.3,6.892,6.892,0,0,0,5.614-3.911,6.892,6.892,0,0,0,5.61,3.911,3.633,3.633,0,1,0,3.576-4.258Z"
                      transform="translate(-91.487 -19.207)"
                      fill="#13a74b"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 25.65 25.765"
                  >
                    <path
                      id="Path_272"
                      data-name="Path 272"
                      d="M113.511,37.711a3.633,3.633,0,0,0-3.563,2.951,5.575,5.575,0,0,1-4.875-4.515,3.633,3.633,0,0,0-.091-7.126V26.413a3.633,3.633,0,1,0-1.3,0v2.607a3.633,3.633,0,0,0-.1,7.126,5.584,5.584,0,0,1-4.88,4.515,3.637,3.637,0,1,0,0,1.3,6.892,6.892,0,0,0,5.614-3.911,6.892,6.892,0,0,0,5.61,3.911,3.633,3.633,0,1,0,3.576-4.258Z"
                      transform="translate(-91.487 -19.207)"
                      fill="#7d8d9d"
                    />
                  </svg>
                )}
              </div>
            </div>

            <div
              className={
                changeIcon === "action"
                  ? "sideMenuIconsHover2"
                  : "sideMenuIcons"
              }
              onClick={showLeft_Dropdown_Action}
            >
              <div>
                {changeIcon === "action" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 27.655 24.498"
                  >
                    <g
                      id="Group_221"
                      data-name="Group 221"
                      transform="translate(66 664)"
                    >
                      <path
                        id="Path_273"
                        data-name="Path 273"
                        d="M95.944,200.107v6.015a4.973,4.973,0,0,1-.359,1.979H78.336v-2.806L71.1,209.474l7.238,4.179v-2.8H95.963c1.656,0,2.736-1.894,2.736-4.734v-8.8c-.27.162-.307.327-.47.491-.766.767-1.474,1.533-2.284,2.3Z"
                        transform="translate(-137.044 -853.154)"
                        fill="#13a74b"
                      />
                      <path
                        id="Path_274"
                        data-name="Path 274"
                        d="M72.814,45.507V39.492a5.233,5.233,0,0,1,.375-2.033H90.422v2.86l7.238-4.179-7.238-4.179V34.7H72.814C71.157,34.7,70,36.652,70,39.492v8.8c.324-.162.334-.327.5-.491.766-.767,1.5-1.533,2.311-2.3Z"
                        transform="translate(-136.005 -695.962)"
                        fill="#13a74b"
                      />
                    </g>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 27.655 24.498"
                  >
                    <g
                      id="Group_221"
                      data-name="Group 221"
                      transform="translate(66 664)"
                    >
                      <path
                        id="Path_273"
                        data-name="Path 273"
                        d="M95.944,200.107v6.015a4.973,4.973,0,0,1-.359,1.979H78.336v-2.806L71.1,209.474l7.238,4.179v-2.8H95.963c1.656,0,2.736-1.894,2.736-4.734v-8.8c-.27.162-.307.327-.47.491-.766.767-1.474,1.533-2.284,2.3Z"
                        transform="translate(-137.044 -853.154)"
                        fill="#7d8d9d"
                      />
                      <path
                        id="Path_274"
                        data-name="Path 274"
                        d="M72.814,45.507V39.492a5.233,5.233,0,0,1,.375-2.033H90.422v2.86l7.238-4.179-7.238-4.179V34.7H72.814C71.157,34.7,70,36.652,70,39.492v8.8c.324-.162.334-.327.5-.491.766-.767,1.5-1.533,2.311-2.3Z"
                        transform="translate(-136.005 -695.962)"
                        fill="#7d8d9d"
                      />
                    </g>
                  </svg>
                )}
              </div>
            </div>
            <div
              className={
                changeIcon === "order" ? "sideMenuIconsHover2" : "sideMenuIcons"
              }
              onClick={showLeft_Dropdown_Order}
            >
              <div>
                {changeIcon === "order" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 25.397 23.459"
                  >
                    <path
                      id="Path_280"
                      data-name="Path 280"
                      d="M121.15,52.151V65.109L109.079,68.6V55.645L121.15,52.15Zm-12.7,2.369L104.4,53.345l4.084-1.85a.627.627,0,0,0-.515-1.143l-5.421,2.457-6.791-1.966,12.7-5.7,12.7,5.7ZM107.824,68.6,95.753,65.109V52.151l6.058,1.754v5.038a.628.628,0,1,0,1.255,0V54.268l4.758,1.377Z"
                      transform="translate(-95.753 -45.144)"
                      fill="#13a74b"
                      fillRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 25.397 23.459"
                  >
                    <path
                      id="Path_280"
                      data-name="Path 280"
                      d="M121.15,52.151V65.109L109.079,68.6V55.645L121.15,52.15Zm-12.7,2.369L104.4,53.345l4.084-1.85a.627.627,0,0,0-.515-1.143l-5.421,2.457-6.791-1.966,12.7-5.7,12.7,5.7ZM107.824,68.6,95.753,65.109V52.151l6.058,1.754v5.038a.628.628,0,1,0,1.255,0V54.268l4.758,1.377Z"
                      transform="translate(-95.753 -45.144)"
                      fill="#7d8d9d"
                      fillRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>

            <div
              className={
                changeIcon === "#" ? "sideMenuIconsHover2" : "sideMenuIcons"
              }
              onClick={handleNotification}
            >
              <Link style={linkStyle} to="/notification">
                <div>
                  {changeIcon === "notification" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.749"
                      height="23.467"
                      viewBox="0 0 23.749 23.467"
                    >
                      <path
                        id="Path_276"
                        data-name="Path 276"
                        d="M21.229,18.747V12.729c0-3.695-1.974-6.787-5.416-7.606V4.305A1.813,1.813,0,0,0,14,2.5,1.793,1.793,0,0,0,12.2,4.305v.818c-3.454.818-5.416,3.9-5.416,7.606v6.017L5.223,20.3a1.2,1.2,0,0,0,.842,2.058H21.915a1.207,1.207,0,0,0,.854-2.058ZM14,25.967A2.414,2.414,0,0,0,16.4,23.56H11.589A2.406,2.406,0,0,0,14,25.967ZM7.714,5.184A1.186,1.186,0,0,0,7.75,3.463a1.2,1.2,0,0,0-1.673-.024,12.545,12.545,0,0,0-3.935,7.293,1.216,1.216,0,0,0,1.2,1.4,1.2,1.2,0,0,0,1.179-1A10.157,10.157,0,0,1,7.714,5.184ZM21.951,3.439a1.218,1.218,0,0,0-1.685.024A1.182,1.182,0,0,0,20.3,5.172a10.224,10.224,0,0,1,3.189,5.945,1.181,1.181,0,0,0,1.179,1,1.208,1.208,0,0,0,1.191-1.4,12.621,12.621,0,0,0-3.911-7.281Z"
                        transform="translate(-2.129 -2.5)"
                        fill="#13a74b"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.749"
                      height="23.467"
                      viewBox="0 0 23.749 23.467"
                    >
                      <path
                        id="Path_276"
                        data-name="Path 276"
                        d="M21.229,18.747V12.729c0-3.695-1.974-6.787-5.416-7.606V4.305A1.813,1.813,0,0,0,14,2.5,1.793,1.793,0,0,0,12.2,4.305v.818c-3.454.818-5.416,3.9-5.416,7.606v6.017L5.223,20.3a1.2,1.2,0,0,0,.842,2.058H21.915a1.207,1.207,0,0,0,.854-2.058ZM14,25.967A2.414,2.414,0,0,0,16.4,23.56H11.589A2.406,2.406,0,0,0,14,25.967ZM7.714,5.184A1.186,1.186,0,0,0,7.75,3.463a1.2,1.2,0,0,0-1.673-.024,12.545,12.545,0,0,0-3.935,7.293,1.216,1.216,0,0,0,1.2,1.4,1.2,1.2,0,0,0,1.179-1A10.157,10.157,0,0,1,7.714,5.184ZM21.951,3.439a1.218,1.218,0,0,0-1.685.024A1.182,1.182,0,0,0,20.3,5.172a10.224,10.224,0,0,1,3.189,5.945,1.181,1.181,0,0,0,1.179,1,1.208,1.208,0,0,0,1.191-1.4,12.621,12.621,0,0,0-3.911-7.281Z"
                        transform="translate(-2.129 -2.5)"
                        fill="#7d8d9d"
                      />
                    </svg>
                  )}
                </div>
              </Link>
            </div>

            <div
              className={
                changeIcon === "#" ? "sideMenuIconsHover2" : "sideMenuIcons"
              }
              onClick={handleReport}
            >
              <Link style={linkStyle} to="/report">
                <div>
                  {changeIcon === "report" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.749"
                      height="23.467"
                      viewBox="0 0 19.053 26.068"
                    >
                      <g
                        id="Group_220"
                        data-name="Group 220"
                        transform="translate(252.926 -430.656)"
                      >
                        <path
                          id="Path_277"
                          data-name="Path 277"
                          d="M250.424,0h-7.71L241.49,4.12h10.158Z"
                          transform="translate(-489.929 430.656)"
                          fill="#13a74b"
                        />
                        <path
                          id="Path_278"
                          data-name="Path 278"
                          d="M162.42,36.75h-2.407l.938,3.223h-12.32l.938-3.223h-2.407a1.915,1.915,0,0,0-1.917,1.917v20.52a1.915,1.915,0,0,0,1.917,1.917h15.217a1.915,1.915,0,0,0,1.917-1.917V38.667a1.856,1.856,0,0,0-1.877-1.917Zm-12.4,20.928H148.3v-4.61h1.713Zm3.753,0h-1.713V50.743h1.713Zm3.753,0h-1.713v-9.22h1.713Zm3.753,0h-1.713V46.133h1.713Z"
                          transform="translate(-398.171 395.619)"
                          fill="#13a74b"
                        />
                      </g>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.749"
                      height="23.467"
                      viewBox="0 0 19.053 26.068"
                    >
                      <g
                        id="Group_220"
                        data-name="Group 220"
                        transform="translate(252.926 -430.656)"
                      >
                        <path
                          id="Path_277"
                          data-name="Path 277"
                          d="M250.424,0h-7.71L241.49,4.12h10.158Z"
                          transform="translate(-489.929 430.656)"
                          fill="#7d8d9d"
                        />
                        <path
                          id="Path_278"
                          data-name="Path 278"
                          d="M162.42,36.75h-2.407l.938,3.223h-12.32l.938-3.223h-2.407a1.915,1.915,0,0,0-1.917,1.917v20.52a1.915,1.915,0,0,0,1.917,1.917h15.217a1.915,1.915,0,0,0,1.917-1.917V38.667a1.856,1.856,0,0,0-1.877-1.917Zm-12.4,20.928H148.3v-4.61h1.713Zm3.753,0h-1.713V50.743h1.713Zm3.753,0h-1.713v-9.22h1.713Zm3.753,0h-1.713V46.133h1.713Z"
                          transform="translate(-398.171 395.619)"
                          fill="#7d8d9d"
                        />
                      </g>
                    </svg>
                  )}
                </div>
              </Link>
            </div>

            <div
              className={
                changeIcon === "#" ? "sideMenuIconsHover2" : "sideMenuIcons"
              }
              onClick={showLeft_Dropdown_Setting}
            >
              <div style={{ marginLeft: "1.5%", marginRight: "2px" }}>
                {changeIcon === "setting" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 26.237 26.284"
                    className="rotate-icon"
                  >
                    <path
                      id="Path_279"
                      data-name="Path 279"
                      d="M130.019,45.589h-.375a2.287,2.287,0,0,1-2.061-1.406,2.213,2.213,0,0,1,.469-2.483l.234-.234a1.245,1.245,0,0,0,0-1.734L126.458,37.9a1.245,1.245,0,0,0-1.734,0l-.234.234a2.308,2.308,0,0,1-2.436.469,2.214,2.214,0,0,1-1.406-2.061v-.328A1.24,1.24,0,0,0,119.43,35h-2.577a1.24,1.24,0,0,0-1.218,1.218v.375a2.287,2.287,0,0,1-1.406,2.061,2.213,2.213,0,0,1-2.483-.469l-.234-.234a1.245,1.245,0,0,0-1.734,0l-1.827,1.827a1.245,1.245,0,0,0,0,1.734l.234.234a2.308,2.308,0,0,1,.469,2.436,2.214,2.214,0,0,1-2.061,1.406h-.375A1.24,1.24,0,0,0,105,46.807v2.577a1.24,1.24,0,0,0,1.218,1.218h.375a2.287,2.287,0,0,1,2.061,1.406,2.213,2.213,0,0,1-.469,2.483l-.234.234a1.244,1.244,0,0,0,0,1.78l1.827,1.827a1.245,1.245,0,0,0,1.734,0l.234-.234a2.2,2.2,0,0,1,1.546-.656,2.03,2.03,0,0,1,.89.187,2.214,2.214,0,0,1,1.406,2.061v.375a1.24,1.24,0,0,0,1.218,1.218h2.577a1.24,1.24,0,0,0,1.218-1.218v-.375a2.287,2.287,0,0,1,1.406-2.061,2.213,2.213,0,0,1,2.483.469l.234.234a1.245,1.245,0,0,0,1.734,0l1.827-1.827a1.245,1.245,0,0,0,0-1.734l-.234-.234a2.326,2.326,0,0,1-.469-2.436,2.214,2.214,0,0,1,2.061-1.406h.375a1.24,1.24,0,0,0,1.218-1.218V46.9A1.263,1.263,0,0,0,130.019,45.589Zm-11.9,8.106a5.575,5.575,0,1,1,5.575-5.575A5.558,5.558,0,0,1,118.119,53.694Z"
                      transform="translate(-105 -35)"
                      fill="#13a74b"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 26.237 26.284"
                    className="rotate-icon"
                  >
                    <path
                      id="Path_279"
                      data-name="Path 279"
                      d="M130.019,45.589h-.375a2.287,2.287,0,0,1-2.061-1.406,2.213,2.213,0,0,1,.469-2.483l.234-.234a1.245,1.245,0,0,0,0-1.734L126.458,37.9a1.245,1.245,0,0,0-1.734,0l-.234.234a2.308,2.308,0,0,1-2.436.469,2.214,2.214,0,0,1-1.406-2.061v-.328A1.24,1.24,0,0,0,119.43,35h-2.577a1.24,1.24,0,0,0-1.218,1.218v.375a2.287,2.287,0,0,1-1.406,2.061,2.213,2.213,0,0,1-2.483-.469l-.234-.234a1.245,1.245,0,0,0-1.734,0l-1.827,1.827a1.245,1.245,0,0,0,0,1.734l.234.234a2.308,2.308,0,0,1,.469,2.436,2.214,2.214,0,0,1-2.061,1.406h-.375A1.24,1.24,0,0,0,105,46.807v2.577a1.24,1.24,0,0,0,1.218,1.218h.375a2.287,2.287,0,0,1,2.061,1.406,2.213,2.213,0,0,1-.469,2.483l-.234.234a1.244,1.244,0,0,0,0,1.78l1.827,1.827a1.245,1.245,0,0,0,1.734,0l.234-.234a2.2,2.2,0,0,1,1.546-.656,2.03,2.03,0,0,1,.89.187,2.214,2.214,0,0,1,1.406,2.061v.375a1.24,1.24,0,0,0,1.218,1.218h2.577a1.24,1.24,0,0,0,1.218-1.218v-.375a2.287,2.287,0,0,1,1.406-2.061,2.213,2.213,0,0,1,2.483.469l.234.234a1.245,1.245,0,0,0,1.734,0l1.827-1.827a1.245,1.245,0,0,0,0-1.734l-.234-.234a2.326,2.326,0,0,1-.469-2.436,2.214,2.214,0,0,1,2.061-1.406h.375a1.24,1.24,0,0,0,1.218-1.218V46.9A1.263,1.263,0,0,0,130.019,45.589Zm-11.9,8.106a5.575,5.575,0,1,1,5.575-5.575A5.558,5.558,0,0,1,118.119,53.694Z"
                      transform="translate(-105 -35)"
                      fill="#7d8d9d"
                    />
                  </svg>
                )}
              </div>
            </div>

            <hr />
            <div
              className={
                changeIcon === "#" ? "sideMenuIconsHover2" : "sideMenuIcons"
              }
            >
              <div>
                <img
                  className="svgrotate"
                  src={changeIcon === "#" ? upload2 : upload}
                  alt="loading..."
                  width={23}
                  height={23}
                />
              </div>
            </div>
            <div
              className={
                changeIcon === "#" ? "sideMenuIconsHover2" : "sideMenuIcons"
              }
            >
              <div>
                <img
                  className="svgrotate"
                  src={changeIcon === "#" ? upload2 : upload}
                  alt="loading..."
                  width={23}
                  height={23}
                />
              </div>
            </div>
            <div
              className={
                changeIcon === "#" ? "sideMenuIconsHover2" : "sideMenuIcons"
              }
            >
              <div>
                <img
                  className="svgrotate"
                  src={changeIcon === "#" ? upload2 : upload}
                  alt="loading..."
                />
              </div>
            </div>
            <div
              onClick={onLogout}
              className={
                changeIcon === "#" ? "sideMenuIconsHover2" : "sideMenuIcons"
              }
            >
              <div>
                {changeIcon === "" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 26.488 33.109"
                  >
                    <path
                      id="sign-out"
                      d="M25.521,2H8.966A4.878,4.878,0,0,0,4,6.966V16.9H18.237l-3.808-3.808a1.639,1.639,0,0,1,2.318-2.318L23.369,17.4a1.6,1.6,0,0,1,0,2.318h0l-6.622,6.622a1.639,1.639,0,0,1-2.318-2.318l3.808-3.808H4v9.933a4.878,4.878,0,0,0,4.966,4.966H25.521a4.878,4.878,0,0,0,4.966-4.966V6.966A4.878,4.878,0,0,0,25.521,2Z"
                      transform="translate(-4 -2)"
                      fill="#7d8d9d"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.749"
                    height="23.467"
                    viewBox="0 0 26.488 33.109"
                  >
                    <path
                      id="sign-out"
                      d="M25.521,2H8.966A4.878,4.878,0,0,0,4,6.966V16.9H18.237l-3.808-3.808a1.639,1.639,0,0,1,2.318-2.318L23.369,17.4a1.6,1.6,0,0,1,0,2.318h0l-6.622,6.622a1.639,1.639,0,0,1-2.318-2.318l3.808-3.808H4v9.933a4.878,4.878,0,0,0,4.966,4.966H25.521a4.878,4.878,0,0,0,4.966-4.966V6.966A4.878,4.878,0,0,0,25.521,2Z"
                      transform="translate(-4 -2)"
                      fill="#7d8d9d"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <>{RenderedComponent}</>;
};

export default SidebarTest;
