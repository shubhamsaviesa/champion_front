import React, { useState, useContext, useEffect, useCallback } from "react";
import AccountCss from "../../style/settings/Accountsettings.module.css";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button, styled } from "@mui/material";
import { DataContext } from "../../context/DataProvider";
import { useSelector, useDispatch } from "react-redux";
import { changePassword } from "../../../rtk/features/user/userSlice";
import { Accoutinginfo } from "../../../rtk/features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import {
  getUserData,
  postUserData,
} from "../../../rtk/features/user/userSlice";

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
const Btn3 = styled(Button)`
  background: #e2e2e2 0% 0% no-repeat padding-box;
  font: normal normal medium 19px/58px Poppins;
  margin-right: 2%;
  letter-spacing: 0px;
  color: #282c45;
  border-radius: 10px;
  text-transform: capitalize;
  width: 10vw;
  height: 45px;
  &:hover {
    background: #e2e2e2;
  }
`;
const Btn4 = styled(Button)`
  background: #13a74b 0% 0% no-repeat padding-box;
  font: normal normal medium 19px/58px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  border-radius: 10px;
  text-transform: capitalize;
  width: 10vw;
  height: 45px;
  &:hover {
    background: #13a74b;
  }
`;

const AccountSettings = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { sidenavbar } = useContext(DataContext);
  const [billingForm, setBillingForm] = useState(true);

  //Account Information
  //for handling account setting form
  const [accountInfo, setAccountInfo] = useState({
    firstname: "",
    lastname: "",
    emailaddress: "",
    mobilenumber: "",
    companyname: "",
    country: "",
    state: "",
    city: "",
    postalcode: "",
  });

  const accountInputHandle = useCallback(
    (e) => {
      const { name, value } = e.target;
      setAccountInfo({ ...accountInfo, [name]: value });
    },
    [accountInfo]
  );

  //for billing info
  const [billingInfo, setBillingInfo] = useState({
    firstname: "",
    lastname: "",
    country: "",
    street: "",
    state: "",
    city: "",
    postalcode: "",
  });

  const billingInputHandle = useCallback(
    (e) => {
      const { name, value } = e.target;
      setBillingInfo({ ...billingInfo, [name]: value });
    },
    [billingInfo]
  );

  //for shipping info
  const [ShippingInfo, setShippingInfo] = useState({
    firstname: "",
    lastname: "",
    country: "",
    street: "",
    state: "",
    city: "",
    postalcode: "",
  });

  const shippingInputHandle = useCallback(
    (e) => {
      const { name, value } = e.target;
      setShippingInfo({ ...ShippingInfo, [name]: value });
    },
    [ShippingInfo]
  );

  const user = useSelector((state) => state.user.users);
  console.log("userInformation after edited user data", user);
  const getUserHandle = () => {
    setAccountInfo({
      ...accountInfo,
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      emailaddress: user.email || "",
      mobilenumber: user.mobilenumber || "",
      companyname: user.companyname || "",
      city: user.city || "",
      country: user.country || "",
      postalcode: user.postalcode || "",
      state: user.state || "",
    });
    setBillingInfo({
      ...billingInfo,
      firstname:
        user.billinginfo?.length > 0 ? user.billinginfo[0].firstname : "",
      lastname:
        user.billinginfo?.length > 0 ? user.billinginfo[0].lastname : "",
      city: user.billinginfo?.length > 0 ? user.billinginfo[0].city : "",
      country: user.billinginfo?.length > 0 ? user.billinginfo[0].country : "",
      postalcode:
        user.billinginfo?.length > 0 ? user.billinginfo[0].postalcode : "",
      state: user.billinginfo?.length > 0 ? user.billinginfo[0].state : "",
      street: user.billinginfo?.length > 0 ? user.billinginfo[0].street : "",
    });
    setShippingInfo({
      ...ShippingInfo,
      firstname:
        user.shippinginfo?.length > 0 ? user.shippinginfo[0].firstname : "",
      lastname:
        user.shippinginfo?.length > 0 ? user.shippinginfo[0].lastname : "",
      city: user.shippinginfo?.length > 0 ? user.shippinginfo[0].city : "",
      country:
        user.shippinginfo?.length > 0 ? user.shippinginfo[0].country : "",
      postalcode:
        user.shippinginfo?.length > 0 ? user.shippinginfo[0].postalcode : "",
      state: user.shippinginfo?.length > 0 ? user.shippinginfo[0].state : "",
      street: user.shippinginfo?.length > 0 ? user.shippinginfo[0].street : "",
    });
  };

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  useEffect(() => {
    if (user) {
      getUserHandle();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!billingInfo || !ShippingInfo) {
        throw new Error("Billing and Shipping info is not complete.");
      }
      const data = {
        ...accountInfo,
        userId: user._id,
        shippingInfo: ShippingInfo,
        billingInfo: billingInfo,
      };
      await dispatch(postUserData(data));
      dispatch(getUserData());
      // window.location.reload(true);
      toast.success("User Data Updated Successfully");
    } catch (error) {
      console.log("Error submitting form: ", error);
      // handle error appropriately, e.g. display error message to user
    }
  };

  //password code
  const initialValueChangePassword = {
    currentPassword: "",
    confirmnewPassword: "",
    newPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValueChangePassword);

  const handleChangePasswordInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleChangePaswword = (e) => {
    e.preventDefault();
    dispatch(changePassword(formValues));
    // if (user.users.status =='succes') {
    //     toast.success(' Password Changed !');
    // }else{
    //     toast.warn(' failed !')
    // }
  };

  const billForm = () => {
    setBillingForm(false);
  };

  const handleAccountForm = () => {
    setBillingForm(true);
  };

  return (
    <>
      {billingForm ? (
        <div
          className={
            sidenavbar
              ? AccountCss.boxcontainerforAccountsetting
              : AccountCss.boxcontainerforAccountsetting2
          }
        >
          <div className="headingbaronaction">
            <div className="toptableheading">
              <div className="subtoptableheadingone">
                <div>Account Settings</div>
              </div>
              <div className="subtoptableheadingone">
                <span>Settings</span>{" "}
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">Account Settings</span>
              </div>
            </div>
          </div>
          <div className={AccountCss.accountinfo}>
            <div className={AccountCss.topaccountbuttons}>
              <div className="d-grid gap-2 d-md-block">
                <button className={AccountCss.accountinfoo}>
                  Account info
                </button>
              </div>
              <div>
                <button className={AccountCss.changeinfo} onClick={billForm}>
                  Change Password
                </button>
              </div>
            </div>
            <div style={{ backgroundColor: "#F9FAFC" }}>
              <div className={AccountCss.formAccout}>
                <div style={{ paddingLeft: "33px", paddingTop: "20px" }}>
                  <div style={{ display: "flex" }}>
                    <div className={AccountCss.Input_container}>
                      <label>First Name</label> <br></br>
                      <input
                        type="text"
                        name="firstname"
                        onChange={accountInputHandle}
                        value={accountInfo.firstname}
                        readOnly
                      />
                    </div>
                    <div className={AccountCss.Input_container}>
                      <label>Last Name</label> <br></br>
                      <input
                        type="text"
                        name="lastname"
                        onChange={accountInputHandle}
                        value={accountInfo.lastname}
                        readOnly
                      />
                    </div>
                    <div className={AccountCss.Input_container}>
                      <label>Email Address</label> <br></br>
                      <input
                        type="email"
                        name="emailaddress"
                        onChange={accountInputHandle}
                        value={accountInfo.emailaddress}
                        readOnly
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", marginTop: "-15px" }}>
                    <div className={AccountCss.Input_container}>
                      <label>Phone Number</label> <br></br>
                      <input
                        type="number"
                        name="mobilenumber"
                        onChange={accountInputHandle}
                        value={accountInfo.mobilenumber}
                        readOnly
                      />
                    </div>
                    <div className={AccountCss.Input_container}>
                      <label>Company Name</label> <br></br>
                      <input
                        type="text"
                        name="companyname"
                        onChange={accountInputHandle}
                        value={accountInfo.companyname}
                      />
                    </div>
                    <div className={AccountCss.Input_container}>
                      <label>Country</label> <br></br>
                      <input
                        type="text"
                        name="country"
                        onChange={accountInputHandle}
                        value={accountInfo.country}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", marginTop: "-15px" }}>
                    <div className={AccountCss.Input_container}>
                      <label>State</label> <br></br>
                      <input
                        type="text"
                        name="state"
                        onChange={accountInputHandle}
                        value={accountInfo.state}
                      />
                    </div>
                    <div className={AccountCss.Input_container}>
                      <label>City</label> <br></br>
                      <input
                        type="text"
                        name="city"
                        onChange={accountInputHandle}
                        value={accountInfo.city}
                      />
                    </div>
                    <div className={AccountCss.Input_container}>
                      <label>Postal Code</label> <br></br>
                      <input
                        type="text"
                        name="postalcode"
                        onChange={accountInputHandle}
                        value={accountInfo.postalcode}
                      />
                    </div>
                  </div>

                  <div style={{ height: "11vh" }}>
                    {" "}
                    <Btn1 style={{ width: "13vw" }}>Billing Info</Btn1>{" "}
                  </div>

                  <div style={{ display: "flex", marginTop: "-15px" }}>
                    <div className={AccountCss.Input_container}>
                      <label>First Name</label> <br></br>
                      <input
                        type="text"
                        name="firstname"
                        onChange={billingInputHandle}
                        value={billingInfo.firstname}
                      />
                    </div>
                    <div className={AccountCss.Input_container}>
                      <label>Last Name</label> <br></br>
                      <input
                        type="text"
                        name="lastname"
                        onChange={billingInputHandle}
                        value={billingInfo.lastname}
                      />
                    </div>

                    <div className={AccountCss.Input_container}>
                      <label>Street/Area</label> <br></br>
                      <input
                        type="text"
                        name="street"
                        onChange={billingInputHandle}
                        value={billingInfo.street}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", marginTop: "-15px" }}>
                    <div className={AccountCss.Input_container}>
                      <label>City</label> <br></br>
                      <input
                        type="text"
                        name="city"
                        onChange={billingInputHandle}
                        value={billingInfo.city}
                      />
                    </div>

                    <div className={AccountCss.Input_container}>
                      <label>State</label> <br></br>
                      <input
                        type="text"
                        name="state"
                        onChange={billingInputHandle}
                        value={billingInfo.state}
                      />
                    </div>

                    <div className={AccountCss.Input_container}>
                      <label>Country</label> <br></br>
                      <input
                        type="text"
                        name="country"
                        onChange={billingInputHandle}
                        value={billingInfo.country}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", marginTop: "-15px" }}>
                    <div className={AccountCss.Input_container}>
                      <label>Postal Code</label> <br></br>
                      <input
                        type="text"
                        name="postalcode"
                        onChange={billingInputHandle}
                        value={billingInfo.postalcode}
                      />
                    </div>
                  </div>

                  <div style={{ height: "11vh" }}>
                    {" "}
                    <Btn1 style={{ width: "13vw" }}>Shipping Address</Btn1>{" "}
                  </div>
                  <div style={{ display: "flex", marginTop: "-15px" }}>
                    <div className={AccountCss.Input_container}>
                      <label>First Name</label> <br></br>
                      <input
                        type="text"
                        name="firstname"
                        onChange={shippingInputHandle}
                        value={
                          ShippingInfo.firstname || ShippingInfo[0]?.firstname
                        }
                      />
                    </div>
                    <div className={AccountCss.Input_container}>
                      <label>Last Name</label> <br></br>
                      <input
                        type="text"
                        name="lastname"
                        onChange={shippingInputHandle}
                        value={ShippingInfo.lastname}
                      />
                    </div>
                    <div className={AccountCss.Input_container}>
                      <label>Street/Area</label> <br></br>
                      <input
                        type="text"
                        name="street"
                        onChange={shippingInputHandle}
                        value={ShippingInfo.street}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", marginTop: "-15px" }}>
                    <div className={AccountCss.Input_container}>
                      <label>City</label> <br></br>
                      <input
                        type="text"
                        name="city"
                        onChange={shippingInputHandle}
                        value={ShippingInfo.city}
                      />
                    </div>

                    <div className={AccountCss.Input_container}>
                      <label>State</label> <br></br>
                      <input
                        type="text"
                        name="state"
                        onChange={shippingInputHandle}
                        value={ShippingInfo.state}
                      />
                    </div>

                    <div className={AccountCss.Input_container}>
                      <label>Country</label> <br></br>
                      <input
                        type="text"
                        name="country"
                        onChange={shippingInputHandle}
                        value={ShippingInfo.country}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", marginTop: "-15px" }}>
                    <div className={AccountCss.Input_container}>
                      <label>Postal Code</label> <br></br>
                      <input
                        type="number"
                        name="postalcode"
                        onChange={shippingInputHandle}
                        value={ShippingInfo.postalcode}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      width: "100%",
                      marginTop: "50px",
                    }}
                  >
                    <Btn3 onClick={() => navigation("/Dashboard")}>Cancel</Btn3>
                    <Btn4 onClick={handleSubmit}>Save</Btn4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={800}
            hideProgressBar={true}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
            progress="undefined"
          />
        </div>
      ) : (
        <div
          className={
            sidenavbar
              ? AccountCss.boxcontainerforAccountsetting
              : AccountCss.boxcontainerforAccountsetting2
          }
        >
          <div className="toptableheading">
            <div className="subtoptableheadingone">
              <div>Account Settings</div>
            </div>
            <div className="subtoptableheadingone">
              <span>Channels</span>{" "}
              <span>
                <MdOutlineArrowForwardIos />
              </span>
              <span className="subMenu_subheading">Connect to Amazon</span>
            </div>
          </div>
          <div className={AccountCss.topaccountbuttons}>
            <div className="d-grid gap-2 d-md-block">
              <button
                className={AccountCss.changeinfo}
                onClick={handleAccountForm}
              >
                Account info
              </button>
            </div>
            <div>
              <button className={AccountCss.accountinfoo}>
                Change Password
              </button>
            </div>
          </div>
          <div className="amazonConnectContainer">
            <div>
              <div className="amazonForm" style={{ marginTop: "-200px" }}>
                <form onSubmit={handleChangePaswword}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "100px",
                    }}
                  >
                    <div>
                      <div>
                        <label htmlFor="text">Current Password</label>
                      </div>
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        name="currentPassword"
                        placeholder="********"
                        onChange={handleChangePasswordInput}
                        value={formValues.currentPassword}
                      />

                      <div>
                        <label htmlFor="text">New Password</label>
                      </div>
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        name="newPassword"
                        placeholder="********"
                        onChange={handleChangePasswordInput}
                        value={formValues.newPassword}
                      />

                      <div>
                        <label htmlFor="text">Confirm Password</label>
                      </div>
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        name="confirmnewPassword"
                        placeholder="********"
                        onChange={handleChangePasswordInput}
                        value={formValues.confirmnewPassword}
                      />
                    </div>
                    <div></div>
                  </div>
                  <div
                    style={{
                      width: "40vw",
                      textAlign: "center",
                      marginTop: "50px",
                    }}
                  >
                    <Btn onClick={() => navigation(-1)}>Cancel</Btn>
                    <Btn1 type="submit">Save</Btn1>
                  </div>
                </form>{" "}
                <div
                  style={{
                    width: "40vw",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={800}
            hideProgressBar={true}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
            progress="undefined"
          />
        </div>
      )}
    </>
  );
};

export default AccountSettings;
