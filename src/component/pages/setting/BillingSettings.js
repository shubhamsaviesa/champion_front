import React, { useState, useContext, useEffect } from "react";
import BillingCss from "../../style/settings/billingsettings.module.css";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AccountCss from "../../style/settings/Accountsettings.module.css";
import VisaIcon from "../../images/bookcommerceimage/visa.png";
import MasterIcon from "../../images/bookcommerceimage/master.png";
import AmaricanIcon from "../../images/bookcommerceimage/Americanexpress.png";
import PaypalIcon from "../../images/bookcommerceimage/paypal.png";
import UpdatePlan from "../../layout/Poppers/UpdatePlan";
import { Box, styled } from "@mui/material";
import { DataContext } from "../../context/DataProvider";
import { useDispatch, useSelector } from "react-redux";
import { postBillingSetting } from "../../../rtk/features/Settings/billingSettingSlice";
import { stripePaymentPost } from "../../../rtk/features/Settings/stripePaymentSlice";
const BoxIcon = styled(Box)`
  position: relative;
  width: 13vw;
  left: 68%;
  top: -34px;
  & img {
    width: 30px;
    margin-right: 5px;
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

const Btn5 = styled(Button)`
  background: #5eb6e9;
  font: normal normal medium 19px/58px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  border-radius: 10px;
  text-transform: capitalize;
  width: 10vw;
  height: 45px;
  margin-left: 2%;
  &:hover {
    background: #5eb6e8;
  }
`;

const AccountSettings = () => {
  const initialValue = {
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardholdername: "",
  };

  const Navigation = useNavigate();
  const [FormValue, setFormValue] = useState(initialValue);
  const [billingForm, setBillingForm] = useState(true);
  const { sidenavbar } = useContext(DataContext);
  const BillingData = useSelector((state) => state.BillingData);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     // dispatch(postBillingSetting());
  //   }, dispatch);

  const billForm = () => {
    setBillingForm(false);
  };
  const handlePaymentInfo = () => {
    setBillingForm(true);
  };

  const InputHandle = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...FormValue, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log("ghfjdkslaqpweirr");
    dispatch(postBillingSetting(FormValue));
    // Navigation("/Productcatalog");
  };

  const stripeHandleSubmit = () => {
    dispatch(stripePaymentPost());
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
                <div>Billing Settings</div>
              </div>
              <div className="subtoptableheadingone">
                <span>Settings</span>{" "}
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading"> Billing Settings</span>
              </div>
            </div>
          </div>
          <div className={AccountCss.accountinfo}>
            <div className={AccountCss.topaccountbuttons}>
              <div className="d-grid gap-2 d-md-block">
                <button className={AccountCss.accountinfoo}>
                  Payment info
                </button>
              </div>
              <div>
                <button className={AccountCss.changeinfo} onClick={billForm}>
                  Subscription
                </button>
              </div>
            </div>
            {/* form */}
            <div className={BillingCss.formAccout}>
              <form>
                <div
                  className={AccountCss.addinveForm}
                  style={{
                    marginLeft: "20rem",
                    marginTop: "50px",
                    border: "0.5px solid",
                    padding: "10px",
                    boxShadow: "2px 2px 2px 2px #13A74B",
                  }}
                >
                  <div className={AccountCss.Input_container}></div>

                  <div style={{ position: "relative", left: "21%" }}>
                    <Btn3>Cancel</Btn3>
                    <Btn4 onClick={handleSubmit}>Pay Via Paypal</Btn4>
                    <Btn5 onClick={stripeHandleSubmit}>Pay Via Stripe</Btn5>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className={BillingCss.boxcontainerforAccountsetting}>
          <div className="toptableheading">
            <div className="subtoptableheadingone">
              <div>Billing Settings</div>
            </div>
            <div className="subtoptableheadingone">
              <span>Channels</span>{" "}
              <span>
                <MdOutlineArrowForwardIos />
              </span>
              <span className="subMenu_subheading">Billing Settings</span>
            </div>
          </div>
          <div className={AccountCss.topaccountbuttons}>
            <div className="d-grid gap-2 d-md-block">
              <button
                className={AccountCss.changeinfo}
                onClick={handlePaymentInfo}
              >
                Payment info
              </button>
            </div>
            <div>
              <button className={AccountCss.accountinfoo} onClick={billForm}>
                Subscription
              </button>
            </div>
          </div>

          <div className={BillingCss.subcripcingContainer}>
            <table className={BillingCss.billingTable}>
              <tr className={BillingCss.Billingtr}>
                <td className={BillingCss.BillingtdFirst}>Your Plan</td>
                <td className={BillingCss.BillingtdSecond}>Standard</td>
              </tr>
              <tr className={BillingCss.Billingtr}>
                <td className={BillingCss.BillingtdFirst}>Billing Duration</td>
                <td className={BillingCss.BillingtdSecond}>Monthly</td>
              </tr>
              <tr className={BillingCss.Billingtr}>
                <td className={BillingCss.BillingtdFirst}>Plan Pricing</td>
                <td className={BillingCss.BillingtdSecond}>$35</td>
              </tr>
              <tr className={BillingCss.Billingtr}>
                <td className={BillingCss.BillingtdFirst}>Next Payment Date</td>
                <td className={BillingCss.BillingtdSecond}>20 Nov,2020</td>
              </tr>
              <tr className={BillingCss.Billingtr}>
                <td className={BillingCss.BillingtdFirst}>Orders</td>
                <td className={BillingCss.BillingtdSecond}>432/500</td>
              </tr>
            </table>
            <div className={BillingCss.buttonsOnBilling}>
              <button className={BillingCss.cenclesub}>
                Cancel Subscription
              </button>
              <button className={BillingCss.updateplan}>
                <UpdatePlan />
              </button>
            </div>
          </div>
          <table className={BillingCss.billingHistryTable}>
            <th className={BillingCss.billingHistryTableHeading}>S.No.</th>
            <th className={BillingCss.billingHistryTableHeading}>
              {" "}
              Pricing Plan
            </th>
            <th className={BillingCss.billingHistryTableHeading}>Charges</th>
            <th className={BillingCss.billingHistryTableHeading}>
              Plan Duration
            </th>
            <th className={BillingCss.billingHistryTableHeading}>
              Payment Date
            </th>
            <tr className={BillingCss.Billingtr}>
              <td className={BillingCss.billingHistryTableData}>1</td>
              <td className={BillingCss.billingHistryTableData}>Standard</td>
              <td className={BillingCss.billingHistryTableData}>$35</td>
              <td className={BillingCss.billingHistryTableData}>Monthly</td>
              <td className={BillingCss.billingHistryTableData}>20 Nov,2020</td>
            </tr>
            <tr className={BillingCss.Billingtr}>
              <td className={BillingCss.billingHistryTableData}>1</td>
              <td className={BillingCss.billingHistryTableData}>Standard</td>
              <td className={BillingCss.billingHistryTableData}>$35</td>
              <td className={BillingCss.billingHistryTableData}>Monthly</td>
              <td className={BillingCss.billingHistryTableData}>20 Nov,2020</td>
            </tr>
          </table>
        </div>
      )}
    </>
  );
};

export default AccountSettings;

// <form>
// <div
//   className={AccountCss.addinveForm}
//   style={{
//     marginLeft: "50px",
//     marginTop: "50px",
//     // border: "1px solid",
//     padding: "10px",
//     // boxShadow: "5px 10px 5px grey",
//   }}
// >
//   <div className={AccountCss.Input_container}>
//     <label>Email</label> <br></br>
//     <input
//       style={{ height: "5.5vh", width: "27vw" }}
//       type="text"
//       name="email"
//       onChange={InputHandle}
//       value={FormValue.email}
//     />
//   </div>

//   <div
//     className={AccountCss.Input_container}
//     style={{ position: "relative" }}
//   >
//     <div>
//       <label>Card Number</label> <br></br>
//       <input
//         style={{ height: "5.5vh", width: "27vw" }}
//         type="text"
//         // autocomplete="cc-number"
//         placeholder="&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;"
//         required
//         name="cardNumber"
//         onChange={InputHandle}
//       value={FormValue.cardNumber}
//       />
//     </div>
//     <BoxIcon>
//       <img src={VisaIcon} alt="loading..." />
//       <img src={MasterIcon} alt="loading..." />
//       <img src={PaypalIcon} alt="loading..." />
//       <img src={AmaricanIcon} alt="loading..." />
//     </BoxIcon>
//   </div>
//   <div
//     className={AccountCss.Input_container}
//     style={{ display: "flex" }}
//   >
//     <div style={{ marginRight: "10px" }}>
//       <label>Expiry</label> <br></br>
//       <input
//         style={{ height: "5.5vh", width: "13.5vw" }}
//         type="text"
//         placeholder="&bull;&bull; / &bull;&bull;"
//         name="expiry"
//         onChange={InputHandle}
//       value={FormValue.expiry}
//         required
//       />
//     </div>
//     <div>
//       <label>CVV</label> <br></br>
//       <input
//         style={{ height: "5.5vh", width: "13vw" }}
//         type="number"
//         autocomplete="off"
//         placeholder="&bull;&bull;&bull;&bull;"
//         name="cvv"
//         onChange={InputHandle}
//       value={FormValue.cvv}
//         required
//       />
//     </div>
//   </div>

//   <div className={AccountCss.Input_container}>
//     <label>Card Holder Name</label> <br></br>
//     <input
//       style={{ height: "5.5vh", width: "27vw" }}
//       type="text"
//       name="cardholdername"
//       onChange={InputHandle}
//       value={FormValue.cardholdername}
//     />
//   </div>
//   <div style={{ position: "relative", left: "12%" }}>
//     <Btn3>Cancel</Btn3>
//     <Btn4 onClick={handleSubmit}>Pay Now</Btn4>
//   </div>
// </div>
// </form>
