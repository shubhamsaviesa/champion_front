import React, { useState } from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Success from "../../images/success.png";
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../../../rtk/features/order/AddOrderSlice";
import _ from "lodash";
import { toast } from "react-toastify";
import FormData from "form-data";

const Box4 = styled(
  Box
)`display:flex;width:67vw;height:6.5vh;background: #FFFFFF 0% 0% no-repeat padding-box;
margin:20px 0;
border-radius: 10px;"`;
const Typography1 = styled(Typography)`
  font: normal normal bold 20px/38px Poppins;
  letter-spacing: 0px;
  color: #000000;
  height: 5vh;
  margin: 5px 0 20px 20px;
`;
const Button1 = styled(Button)`
  text-transform: capitalize;
  margin-right: 4%;
  color: #282c45;
  font: normal normal medium 15px/58px Poppins;
  background: #e2e2e2 0% 0% no-repeat padding-box;
  border-radius: 10px;
  width: 6vw;
`;
const Button2 = styled(Button)`
  text-transform: capitalize;
  color: #ffffff;
  font: normal normal medium 15px/58px Poppins;
  background: #13a74b 0% 0% no-repeat padding-box;
  border-radius: 10px;
  width: 6vw;
  &:hover {
    background: #13a74b;
  }
`;
const style = {
  position: "absolute",
  top: "0%",
  left: "10%",
  bottom: "10%",
  width: "85vw",
  height: "100vh",
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 3,
  overflowY: " auto ",
};

export default function AddOrder() {
  const initialValue = {
    orderDate: "",
    orderId: "",
    productName: "",
    orderNote: "",
    identifierType: "",
    identifier: "",
    category: "",
    condition: "",
    purchasePrice: "",
    quantity: "",
    commision: "",
    tax: "",
    listedPrice: "",
    marketplaces: "",
    recipientName: "",
    phoneNumber: "",
    buyerEmail: "",
    addressOne: "",
    addressTwo: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    packageWeight: "",
    lbs: "",
    packageDimensions: "",
    width: "",
    height: "",
  };
  const customId = "custom-id-yes";
  const [open, setOpen] = React.useState(false);
  const [formValue, setFormValue] = useState(initialValue);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [showSuccessPopup, setShowSuccessPopup] = React.useState(true);
  const [showDoyouPopup, setShowDoyouPopup] = React.useState(true);
  const ResponceFromAddOrder = useSelector(
    (state) => state.AddOrder.order.status
  );
  const dispatch = useDispatch();
  const addOrderInputHandle = ({ target: { name, value } }) => {
    if (
      [
        "purchasePrice",
        "quantity",
        "commision",
        "tax",
        "listedPrice",
        "phoneNumber",
        "postalCode",
        "packageWeight",
        "lbs",
        "packageDimensions",
        "width",
        "height",
      ].includes(name)
    ) {
      setFormValue({
        ...formValue,
        [name]: !isNaN(value) ? value : "",
      });
    } else {
      setFormValue({ ...formValue, [name]: value });
    }
  };

  const requiredFields = [
    "orderId",
    "orderDate",
    "productName",
    "orderNote",
    "identifierType",
    "identifier",
    "category",
    "condition",
    "purchasePrice",
    "quantity",
    "commision",
    "tax",
    "listedPrice",
    "marketplaces",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasEmptyFields = requiredFields.some(
      (fieldName) => !formValue[fieldName]
    );

    if (hasEmptyFields) {
      toast.error("Please fill all the required fields", {
        toastId: customId,
      });
      return;
    }

    const formFields = {
      orderDate: formValue.orderDate,
      orderId: formValue.orderId,
      productName: formValue.productName,
      orderNote: formValue.orderNote,
      identifierType: formValue.identifierType,
      identifier: formValue.identifier,
      category: formValue.category,
      condition: formValue.condition,
      purchasePrice: formValue.purchasePrice,
      quantity: formValue.quantity,
      commision: formValue.commision,
      tax: formValue.tax,
      listedPrice: formValue.listedPrice,
      marketplaces: formValue.marketplaces,
      recipientName: formValue.recipientName,
      phoneNumber: formValue.phoneNumber,
      buyerEmail: formValue.buyerEmail,
      addressOne: formValue.addressOne,
      addressTwo: formValue.addressTwo,
      city: formValue.city,
      state: formValue.state,
      country: formValue.country,
      postalCode: formValue.postalCode,
      packageWeight: formValue.packageWeight,
      lbs: formValue.lbs,
      packageDimensions: formValue.packageDimensions,
      width: formValue.width,
      height: formValue.height,
    };

    const form = new FormData();

    Object.entries(formFields).forEach(([name, value]) => {
      form.append(name, value);
    });

    dispatch(addOrder(formValue))
      .then(() => {
        switch (ResponceFromAddOrder) {
          case "success":
            toast.success("Order Creation Successfully", {
              toastId: customId,
            });
            navigate("/OrderListing");
            break;
          case "fail":
            toast.error("Internal server Error", {
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
        toast.error(error.message);
      });
  };

  return (
    <div>
      <span onClick={handleOpen}>
        Add Order <AiOutlinePlus size={20} />
      </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {showSuccessPopup ? (
          <Box sx={style}>
            <Typography1>Add Order</Typography1>
            <Box4>
              <form onSubmit={handleSubmit}>
                <div className="addinveForm">
                  <div>
                    <div className="addinveFormSegment">
                      <div style={{ display: "flex" }}>
                        <div className="inventoryInput_container">
                          <label>
                            Order Date
                            <span
                              style={{
                                color: "red",
                                fontSize: "25px",
                                position: "relative",
                                top: "7px",
                              }}
                            >
                              *
                            </span>
                          </label>{" "}
                          <br></br>
                          <input
                            placeholder="11-05-2022"
                            type="text"
                            name="orderDate"
                            onChange={addOrderInputHandle}
                            value={formValue.orderDate}
                          />
                        </div>
                        <div className="inventoryInput_container">
                          <label>
                            Order ID
                            <span
                              style={{
                                color: "red",
                                fontSize: "25px",
                                position: "relative",
                                top: "7px",
                              }}
                            >
                              *
                            </span>
                          </label>{" "}
                          <br></br>
                          <input
                            type="text"
                            name="orderId"
                            placeholder="12635498"
                            onChange={addOrderInputHandle}
                            value={formValue.orderId}
                          />
                        </div>
                        <div className="inventoryInput_container">
                          <label>
                            Product Name
                            <span
                              style={{
                                color: "red",
                                fontSize: "25px",
                                position: "relative",
                                top: "7px",
                              }}
                            >
                              *
                            </span>
                          </label>{" "}
                          <br></br>
                          <input
                            type="text"
                            name="productName"
                            placeholder="Home Light"
                            onChange={addOrderInputHandle}
                            value={formValue.productName}
                          />
                        </div>
                      </div>
                      <div style={{ display: "flex" }}>
                        <div className="inventoryInput_container">
                          <label>
                            Order Note
                            <span
                              style={{
                                color: "red",
                                fontSize: "25px",
                                position: "relative",
                                top: "7px",
                              }}
                            >
                              *
                            </span>
                          </label>{" "}
                          <br></br>
                          <input
                            type="text"
                            name="orderNote"
                            placeholder="Lorem ipsum"
                            onChange={addOrderInputHandle}
                            value={formValue.orderNote}
                          />
                        </div>
                        <div className="inventoryInput_container">
                          <label>
                            Identifier Type
                            <span
                              style={{
                                color: "red",
                                fontSize: "25px",
                                position: "relative",
                                top: "7px",
                              }}
                            >
                              *
                            </span>
                          </label>{" "}
                          <br></br>
                          <select
                            name="identifierType"
                            style={{
                              color: "#0E0B3A",
                              background: "#F6F7F8 0% 0% no-repeat padding-box",
                            }}
                            onChange={addOrderInputHandle}
                            value={formValue.identifierType}
                          >
                            <option>Select </option>
                            <option>- lorem </option>
                            <option>-lorem</option>
                          </select>
                        </div>
                        <div className="inventoryInput_container">
                          <label>
                            Identifier
                            <span
                              style={{
                                color: "red",
                                fontSize: "25px",
                                position: "relative",
                                top: "7px",
                              }}
                            >
                              *
                            </span>
                          </label>{" "}
                          <br></br>
                          <input
                            type="text"
                            name="identifier"
                            placeholder="Lorem ipsum"
                            onChange={addOrderInputHandle}
                            value={formValue.identifier}
                          />
                        </div>
                      </div>
                      <div style={{ display: "flex" }}>
                        <div className="inventoryInput_container">
                          <label>
                            Category
                            <span
                              style={{
                                color: "red",
                                fontSize: "25px",
                                position: "relative",
                                top: "7px",
                              }}
                            >
                              *
                            </span>
                          </label>{" "}
                          <br></br>
                          <select
                            name="category"
                            style={{
                              color: "#0E0B3A",
                              background: "#F6F7F8 0% 0% no-repeat padding-box",
                            }}
                            onChange={addOrderInputHandle}
                            value={formValue.category}
                          >
                            <option>Select </option>
                            <option>- lorem </option>
                            <option>-lorem</option>
                          </select>
                        </div>
                        <div className="inventoryInput_container">
                          <label>
                            Condition
                            <span
                              style={{
                                color: "red",
                                fontSize: "25px",
                                position: "relative",
                                top: "7px",
                              }}
                            >
                              *
                            </span>
                          </label>{" "}
                          <br></br>
                          <select
                            name="condition"
                            style={{
                              color: "#0E0B3A",
                              background: "#F6F7F8 0% 0% no-repeat padding-box",
                            }}
                            onChange={addOrderInputHandle}
                            value={formValue.condition}
                          >
                            <option>Select </option>
                            <option>- lorem </option>
                            <option>-lorem</option>
                          </select>
                        </div>
                        <div className="inventoryInput_container">
                          <label>
                            Purchase Price
                            <span
                              style={{
                                color: "red",
                                fontSize: "25px",
                                position: "relative",
                                top: "7px",
                              }}
                            >
                              *
                            </span>
                          </label>{" "}
                          <br></br>
                          <input
                            type="text"
                            name="purchasePrice"
                            placeholder="$ 150.00"
                            onChange={addOrderInputHandle}
                            value={formValue.purchasePrice}
                          />
                        </div>
                      </div>

                      <div style={{ display: "flex" }}>
                        <div className="inventoryInput_container">
                          <label>
                            Quantity
                            <span
                              style={{
                                color: "red",
                                fontSize: "25px",
                                position: "relative",
                                top: "7px",
                              }}
                            >
                              *
                            </span>
                          </label>{" "}
                          <br></br>
                          <input
                            type="number"
                            name="quantity"
                            placeholder="5"
                            onChange={addOrderInputHandle}
                            value={formValue.quantity}
                          />
                        </div>

                        <div className="inventoryInput_container">
                          <label>
                            Commision
                            <span
                              style={{
                                color: "red",
                                fontSize: "25px",
                                position: "relative",
                                top: "7px",
                              }}
                            >
                              *
                            </span>
                          </label>{" "}
                          <br></br>
                          <input
                            type="text"
                            name="commision"
                            placeholder="2%"
                            onChange={addOrderInputHandle}
                            value={formValue.commision}
                          />
                        </div>
                        <div className="inventoryInput_container">
                          <label>
                            Tax
                            <span
                              style={{
                                color: "red",
                                fontSize: "25px",
                                position: "relative",
                                top: "7px",
                              }}
                            >
                              *
                            </span>
                          </label>{" "}
                          <br></br>
                          <input
                            type="text"
                            name="tax"
                            placeholder="2%"
                            onChange={addOrderInputHandle}
                            value={formValue.tax}
                          />
                        </div>
                      </div>

                      <div style={{ display: "flex" }}>
                        <div className="inventoryInput_container">
                          <label>
                            Listed Price
                            <span
                              style={{
                                color: "red",
                                fontSize: "25px",
                                position: "relative",
                                top: "7px",
                              }}
                            >
                              *
                            </span>
                          </label>{" "}
                          <br></br>
                          <input
                            type="text"
                            name="listedPrice"
                            placeholder="$ 150.00"
                            onChange={addOrderInputHandle}
                            value={formValue.listedPrice}
                          />
                        </div>
                        <div className="inventoryInput_container">
                          <label>
                            Marketplaces
                            <span
                              style={{
                                color: "red",
                                fontSize: "25px",
                                position: "relative",
                                top: "7px",
                              }}
                            >
                              *
                            </span>
                          </label>{" "}
                          <br></br>
                          <select
                            name="marketplaces"
                            style={{
                              color: "#0E0B3A",
                              background: "#F6F7F8 0% 0% no-repeat padding-box",
                            }}
                            onChange={addOrderInputHandle}
                            value={formValue.marketplaces}
                          >
                            <option>Amazon </option>
                            <option>- lorem </option>
                            <option>-lorem</option>
                          </select>
                        </div>
                      </div>
                      <hr />
                    </div>
                  </div>

                  <div
                    className="addinveFormSegment"
                    style={{ height: "40vh", marginTop: "25%" }}
                  >
                    <div style={{ display: "flex" }}>
                      <div className="inventoryInput_container">
                        <label>Recipient Name</label> <br></br>
                        <input
                          type="text"
                          name="recipientName"
                          onChange={addOrderInputHandle}
                          value={formValue.recipientName}
                        />
                      </div>
                      <div className="inventoryInput_container">
                        <label>Phone Number</label> <br></br>
                        <input
                          type="text"
                          name="phoneNumber"
                          placeholder="+15525645"
                          onChange={addOrderInputHandle}
                          value={formValue.phoneNumber}
                        />
                      </div>
                      <div className="inventoryInput_container">
                        <label>Buyer Email</label> <br></br>
                        <input
                          type="text"
                          name="buyerEmail"
                          onChange={addOrderInputHandle}
                          value={formValue.buyerEmail}
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", marginTop: "-15px" }}>
                      <div className="inventoryInput_container">
                        <label>Address Line 1</label> <br></br>
                        <input
                          type="text"
                          name="addressOne"
                          onChange={addOrderInputHandle}
                          value={formValue.addressOne}
                        />
                      </div>
                      <div className="inventoryInput_container">
                        <label>Address Line 2</label> <br></br>
                        <input
                          type="text"
                          name="addressTwo"
                          onChange={addOrderInputHandle}
                          value={formValue.addressTwo}
                        />
                      </div>
                      <div className="inventoryInput_container">
                        <label>City</label> <br></br>
                        <select
                          name="city"
                          style={{
                            color: "#0E0B3A",
                            background: "#F6F7F8 0% 0% no-repeat padding-box",
                          }}
                          onChange={addOrderInputHandle}
                          value={formValue.city}
                        >
                          <option>Surat </option>
                          <option>- lorem </option>
                          <option>-lorem</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ display: "flex", marginTop: "-15px" }}>
                      <div className="inventoryInput_container">
                        <label>State</label> <br></br>
                        <select
                          name="state"
                          style={{
                            color: "#0E0B3A",
                            background: "#F6F7F8 0% 0% no-repeat padding-box",
                          }}
                          onChange={addOrderInputHandle}
                          value={formValue.state}
                        >
                          <option>New Jersey </option>
                          <option>- lorem </option>
                          <option>-lorem</option>
                        </select>
                      </div>
                      <div className="inventoryInput_container">
                        <label>Country</label> <br></br>
                        <select
                          name="country"
                          style={{
                            color: "#0E0B3A",
                            background: "#F6F7F8 0% 0% no-repeat padding-box",
                          }}
                          onChange={addOrderInputHandle}
                          value={formValue.country}
                        >
                          <option>United States </option>
                          <option>- lorem </option>
                          <option>-lorem</option>
                        </select>
                      </div>{" "}
                      <div className="inventoryInput_container">
                        <label>Postal Code</label> <br></br>
                        <input
                          type="number"
                          name="postalCode"
                          placeholder="396043"
                          onChange={addOrderInputHandle}
                          value={formValue.postalCode}
                        />
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div
                    className="addinveFormSegment"
                    style={{ height: "30vh" }}
                  >
                    <div className="pricing">
                      <h5 style={{ marginTop: "2%", fontWeight: "bold" }}>
                        Shipment
                      </h5>
                      <div style={{ display: "flex" }}>
                        <div
                          className="inventoryInput_container"
                          style={{ width: "32vw", marginRight: "3.3%" }}
                        >
                          <label>Package Weight</label> <br></br>
                          <input
                            type="number"
                            name="packageWeight"
                            style={{ width: "33vw" }}
                            placeholder="100"
                            onChange={addOrderInputHandle}
                            value={formValue.packageWeight}
                          />
                        </div>
                        <div
                          style={{
                            width: "8vw",
                            height: "11vh",
                            color: "#7D8D9D",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          lbs
                        </div>
                        <div
                          className="inventoryInput_container"
                          style={{ width: "34vw", marginRight: "1%" }}
                        >
                          <label></label> <br></br>
                          <input
                            type="number"
                            name="lbs"
                            style={{ width: "34vw" }}
                            onChange={addOrderInputHandle}
                            value={formValue.lbs}
                          />
                        </div>
                        <div
                          style={{
                            width: "8vw",
                            height: "11vh",
                            color: "#7D8D9D",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          oz
                        </div>
                      </div>

                      <div style={{ display: "flex" }}>
                        <div
                          className="inventoryInput_container"
                          style={{ width: "21vw", marginRight: "1%" }}
                        >
                          <label>Package Dimensions</label> <br></br>
                          <input
                            type="number"
                            name="packageDimensions"
                            onChange={addOrderInputHandle}
                            value={formValue.packageDimensions}
                            placeholder="length"
                            style={{
                              width: "21vw",
                              fontWeight: "bold",
                              paddingLeft: "3%",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            width: "3vw",
                            height: "11vh",
                            color: "#7D8D9D",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "10px",
                          }}
                        >
                          𐤕
                        </div>
                        <div
                          className="inventoryInput_container"
                          style={{ width: "21vw", marginRight: "1%" }}
                        >
                          <label></label> <br></br>
                          <input
                            type="number"
                            name="width"
                            placeholder="width"
                            style={{
                              width: "20vw",
                              fontWeight: "bold",
                              paddingLeft: "3%",
                            }}
                            onChange={addOrderInputHandle}
                            value={formValue.width}
                          />
                        </div>
                        <div
                          style={{
                            width: "3vw",
                            height: "11vh",
                            color: "#7D8D9D",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "10px",
                          }}
                        >
                          𐤕
                        </div>
                        <div
                          className="inventoryInput_container"
                          style={{ width: "22vw", marginRight: ".7%" }}
                        >
                          <label>Condition</label> <br></br>
                          <input
                            type="number"
                            placeholder="height"
                            name="height"
                            onChange={addOrderInputHandle}
                            value={formValue.height}
                            style={{
                              width: "21vw",
                              fontWeight: "bold",
                              paddingLeft: "3%",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            width: "3vw",
                            height: "11vh",
                            color: "#7D8D9D",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "15px",
                          }}
                        >
                          inches
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "15vw",
                      height: "12vh",
                      margin: "auto",
                      marginTop: "30px",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={handleClose}
                      style={{
                        marginRight: "4%",
                        color: "black",
                        font: "normal normal medium 15px/58px Poppins",
                        width: "6vw",
                        textTransform: "capitalize",
                        backgroundColor: "#E2E2E2",
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      style={{
                        font: "normal normal medium 15px/58px Poppins",
                        width: "6vw",
                        textTransform: "capitalize",
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            </Box4>
          </Box>
        ) : (
          <>
            {showDoyouPopup ? (
              <Box className="successPopupContainer">
                <h3 className="successPopupHeading">
                  Do you want to export listings to marketplace
                </h3>
                <div className="successPopupBtnCont1">
                  <Button
                    className="btn"
                    onClick={handleClose}
                    variant="contained"
                    style={{
                      background: "#E2E2E2",
                      color: "#282C45",
                      position: "relative",
                      left: "10px",
                    }}
                  >
                    No
                  </Button>
                  <Button
                    className="btn"
                    onClick={() => {
                      setShowDoyouPopup(false);
                    }}
                    variant="contained"
                  >
                    yes
                  </Button>
                </div>
              </Box>
            ) : (
              <div className="successPopupContainer">
                <div className="successPopupImage">
                  <img src={Success} width="110px" alt="warning..." />
                </div>
                <h3 className="successPopupHeading">
                  {" "}
                  Successfully exported to the marketplace{" "}
                </h3>
                <div className="successPopupBtnCont">
                  <button
                    className="btn"
                    onClick={() => navigate("/dashboard")}
                    variant="contained"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}
