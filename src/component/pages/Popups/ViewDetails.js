import React, { useState, useContext, useEffect, useMemo } from "react";
import "../../style/Actions/Addinventory.css";
import { Button, styled } from "@mui/material";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import ImageUpload from "../../images/bookcommerceimage/Layer 37.png";
import { DataContext } from "../../context/DataProvider";
import { useSelector, useDispatch } from "react-redux";
import { insertEditeInventoryData } from "../../../rtk/features/Action/addInventorySlice";
import FormData from "form-data";
import { toast } from "react-toastify";
import _ from "lodash";
import { GetProductCatalogId } from "../../../rtk/features/Action/productCatalogsSlice";

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
  background: #59c180 0% 0% no-repeat padding-box;
  letter-spacing: 0px;
  text-transform: capitalize;
  width: 8vw;
  height: 5.5vh;
  color: #ffffff;
  &:hover {
    background-color: #59c180;
  }
`;

const ViewDetails = () => {
  const initialValue = {
    productname: "",
    description: "",
    identifiertype: "",
    identifier: "",
    category: "",
    condition: "",
    brand: "",
    availableqty: "",
    manufacturer: "",
    manufacturernumber: "",
    lisrtprice: "",
    mapprice: "",
    upc: "",
    gstin: "",
    sku: "",
    other: "",
    costprice: "",
    profitprice: "",
    marketplacecommision: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    image_upload: "",
    image_upload2: "",
    image_upload3: "",
    lbs: "",
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const customId = "custom-id-yes";

  const { sidenavbar } = useContext(DataContext);

  const [inventoryFormValue, setInventoryFormValue] = useState(initialValue);
  const [media, setMedia] = useState("");
  const [file, setFile] = useState("");

  const ProductCatalogData = useSelector((state) => state.ProductCatalog);

  const inventoryFormStatus = useSelector(
    (state) => state.inventoryForm.users.status
  );

  const [status, setStatus] = useState("");

  useEffect(() => {
    switch (inventoryFormStatus) {
      case "success":
        toast.success("Item Edited Successfully", {
          toastId: customId,
        });
        navigate("/ProductCatalog");
        break;
      case "sku exist":
        toast.error("SKU already exists. Please enter a different SKU.", {
          toastId: customId,
        });
        break;
      case "fail":
        toast.error("Failed to insert inventory data.", {
          toastId: customId,
        });
        break;
      case "Internal server error":
        toast.error("Internal server error", {
          toastId: customId,
        });
        break;
      default:
        break;
    }
  }, [inventoryFormStatus]);

  useEffect(() => {
    if (status) {
      toast(status);
      setStatus("");
    }
  }, [status]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetProductCatalogId(id));
  }, []);

  useEffect(() => {
    const product = ProductCatalogData?.users;
    if (product) {
      setInventoryFormValue(product);
    } else {
      setInventoryFormValue(initialValue);
    }
  }, [id, ProductCatalogData]);

  const inventoryInputHandle = ({ target: { name, value } }) => {
    if (
      [
        "availableqty",
        "manufacturernumber",
        "lisrtprice",
        "mapprice",
        "costprice",
        "profitprice",
        "marketplacecommision",
        "weight",
        "length",
        "width",
        "height",
        "lbs",
      ].includes(name)
    ) {
      setInventoryFormValue({
        ...inventoryFormValue,
        [name]: !isNaN(value) ? value : "",
      });
    } else {
      setInventoryFormValue({ ...inventoryFormValue, [name]: value });
    }
  };

  const inventoryImageHandle = ({ target: { files } }) => {
    if (file.length < 3) {
      setFile([...file, files[0]]);
    }
  };

  const requiredFields = [
    "productname",
    "description",
    "identifiertype",
    "condition",
    "sku",
    "category",
    "availableqty",
    "costprice",
    "profitprice",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasEmptyFields = requiredFields.some(
      (fieldName) => !inventoryFormValue[fieldName]
    );

    if (hasEmptyFields) {
      toast.error("Please fill all the required fields", {
        toastId: customId,
      });
      return;
    }

    dispatch(insertEditeInventoryData(inventoryFormValue))
      .then(() => {
        switch (inventoryFormStatus) {
          case "success":
            toast.success("Item Edited Successfully");
            navigate("/ProductCatalog");
            break;
          case "sku exist":
            toast.error("SKU already exists. Please enter a different SKU.");
            break;
          case "fail":
            toast.error("Failed to insert inventory data.");
            break;
          case "Internal server error":
            toast.error("Backend server Crash");
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
    <>
      <div>
        <div
          className={
            sidenavbar ? "backgroundcontainer" : "backgroundcontainer2"
          }
        >
          <div
            className={
              sidenavbar ? "headingbaronaction" : "headingbaronaction2"
            }
          >
            <div className="toptableheading">
              <div className="subtoptableheadingone">
                <div>View Inventory</div>
              </div>
              <div className="subtoptableheadingone">
                <span>Actions</span>{" "}
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">View Inventory</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="addinveForm">
              <div>
                <div className="addinveFormSegment">
                  <h3>View Product</h3>
                  <div style={{ display: "flex" }}>
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
                        name="productname"
                        placeholder="Light"
                        value={inventoryFormValue.productname}
                        onChange={inventoryInputHandle}
                      />
                    </div>
                    <div className="inventoryInput_container">
                      <label>
                        Description
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
                        name="description"
                        placeholder="Lorem"
                        value={inventoryFormValue.description}
                        onChange={inventoryInputHandle}
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
                        name="identifiertype"
                        onChange={inventoryInputHandle}
                        value={inventoryFormValue.identifiertype}
                        style={{
                          color: "#0E0B3A",
                          background: "#F6F7F8 0% 0% no-repeat padding-box",
                        }}
                      >
                        <option>Lorem </option>
                        <option>- lorem </option>
                        <option>-lorem</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: "flex", marginTop: "-15px" }}>
                    <div className="inventoryInput_container">
                      <label>Identifier</label> <br></br>
                      <input
                        type="text"
                        name="identifier"
                        value={inventoryFormValue.identifier}
                        onChange={inventoryInputHandle}
                      />
                    </div>

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
                      <input
                        type="text"
                        name="category"
                        value={inventoryFormValue.category}
                        onChange={inventoryInputHandle}
                      />
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
                        value={inventoryFormValue.condition}
                        onChange={inventoryInputHandle}
                        style={{
                          color: "#0E0B3A",
                          background: "#F6F7F8 0% 0% no-repeat padding-box",
                        }}
                      >
                        <option>Excellent </option>
                        <option>- Good </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "-15px",
                    marginLeft: "17px",
                  }}
                >
                  <div className="inventoryInput_container">
                    <label>Brand</label> <br></br>
                    <input
                      type="text"
                      name="brand"
                      placeholder="Brand name"
                      value={inventoryFormValue.brand || ""}
                      onChange={inventoryInputHandle}
                    />
                  </div>

                  <div className="inventoryInput_container">
                    <label>
                      Available Qty
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
                      name="availableqty"
                      placeholder="99"
                      value={inventoryFormValue.availableqty}
                      onChange={inventoryInputHandle}
                    />
                  </div>
                </div>
              </div>

              <div className="addinveFormSegment" style={{ height: "35vh" }}>
                <h3>Manufacturer</h3>
                <div style={{ display: "flex" }}>
                  <div className="inventoryInput_container">
                    <label>Manufacturer</label> <br></br>
                    <input
                      type="text"
                      name="manufacturer"
                      value={inventoryFormValue.manufacturer || ""}
                      onChange={inventoryInputHandle}
                    />
                  </div>
                  <div className="inventoryInput_container">
                    <label>Manufacturer Part Number</label> <br></br>
                    <input
                      type="text"
                      name="manufacturernumber"
                      value={inventoryFormValue.manufacturernumber || ""}
                      onChange={inventoryInputHandle}
                    />
                  </div>
                  <div className="inventoryInput_container">
                    <label>List Price(MSRP)</label> <br></br>
                    <input
                      type="text"
                      name="lisrtprice"
                      value={inventoryFormValue.lisrtprice || ""}
                      onChange={inventoryInputHandle}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", marginTop: "-15px" }}>
                  <div className="inventoryInput_container">
                    <label>Map Price</label> <br></br>
                    <input
                      type="text"
                      name="mapprice"
                      value={inventoryFormValue.mapprice || ""}
                      onChange={inventoryInputHandle}
                    />
                  </div>
                  <div className="inventoryInput_container">
                    <label>UPC</label> <br></br>
                    <input
                      type="text"
                      name="upc"
                      value={inventoryFormValue.upc || ""}
                      onChange={inventoryInputHandle}
                    />
                  </div>
                  <div className="inventoryInput_container">
                    <label>GSTIN</label> <br></br>
                    <input
                      type="text"
                      name="gstin"
                      value={inventoryFormValue.gstin || ""}
                      onChange={inventoryInputHandle}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", marginTop: "-15px" }}>
                  <div className="inventoryInput_container">
                    <label>
                      SKU
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
                      name="sku"
                      placeholder="SKU123"
                      value={inventoryFormValue.sku}
                      onChange={inventoryInputHandle}
                      readOnly
                    />
                  </div>
                  <div className="inventoryInput_container">
                    <label>Other</label> <br></br>
                    <input
                      type="text"
                      name="other"
                      value={inventoryFormValue.other}
                      onChange={inventoryInputHandle}
                      placeholder="lorem"
                    />
                  </div>
                </div>
              </div>

              <h3 style={{ marginLeft: "20px" }}>
                Image Upload
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
              </h3>
              <div className="ImageUpload" style={{ marginLeft: "20px" }}>
                <div>
                  <input
                    type="file"
                    name="image_upload"
                    // onChange={inventoryInputHandle.image_upload}
                    onChange={inventoryImageHandle}
                    readOnly
                  />
                  <label htmlFor="file">
                    <img
                      src={inventoryFormValue.imageupload1}
                      alt="loading..."
                      width={140}
                      height={100}
                    />
                  </label>
                </div>
                <div style={{ margin: "0 52px" }}>
                  <input
                    type="file"
                    name="image_upload2"
                    onChange={inventoryImageHandle}
                    readOnly
                  />
                  <label htmlFor="file">
                    <img
                      src={inventoryFormValue.imageupload2}
                      width={140}
                      height={100}
                      alt="loading..."
                    />
                  </label>
                </div>
                <div>
                  <input
                    type="file"
                    id="file"
                    name="image_upload3"
                    onChange={inventoryImageHandle}
                    readOnly
                  />
                  <label htmlFor="file">
                    <img
                      src={inventoryFormValue.imageupload3}
                      width={140}
                      height={100}
                      alt="loading..."
                    />
                  </label>
                </div>
              </div>
              <div className="addinveFormSegment" style={{ height: "15vh" }}>
                <h5 style={{ marginTop: "2%", fontWeight: "bold" }}>Pricing</h5>
                <div className="pricing">
                  <div style={{ display: "flex" }}>
                    <div
                      className="inventoryInput_container"
                      style={{ width: "21vw", marginRight: "1%" }}
                    >
                      <label>
                        Cost Price
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
                        name="costprice"
                        value={inventoryFormValue.costprice}
                        onChange={inventoryInputHandle}
                        placeholder="20$"
                        style={{ width: "21vw", paddingLeft: "3%" }}
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
                    ></div>
                    <div
                      className="inventoryInput_container"
                      style={{ width: "21vw", marginRight: "1%" }}
                    >
                      <label>
                        Profit Price
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
                        name="profitprice"
                        value={inventoryFormValue.profitprice}
                        onChange={inventoryInputHandle}
                        placeholder="10$"
                        style={{ width: "20vw", paddingLeft: "3%" }}
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
                    ></div>
                    <div
                      className="inventoryInput_container"
                      style={{ width: "22vw", marginRight: ".7%" }}
                    >
                      <label>Marketplace Commision</label> <br></br>
                      <input
                        type="text"
                        placeholder="10$"
                        name="marketplacecommision"
                        value={inventoryFormValue.marketplacecommision || 0}
                        onChange={inventoryInputHandle}
                        style={{ width: "21vw", paddingLeft: "3%" }}
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
                    ></div>
                  </div>
                </div>
              </div>
              <div className="addinveFormSegment" style={{ height: "30vh" }}>
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
                        type="text"
                        name="weight"
                        value={inventoryFormValue.weight || 0}
                        onChange={inventoryInputHandle}
                        style={{ width: "33vw" }}
                        placeholder="100"
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
                        type="text"
                        name="lbs"
                        value={inventoryFormValue.lbs || 0}
                        onChange={inventoryInputHandle}
                        style={{ width: "34vw" }}
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
                        type="text"
                        name="length"
                        value={inventoryFormValue.length || 0}
                        onChange={inventoryInputHandle}
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
                        type="text"
                        name="width"
                        value={inventoryFormValue.width || 0}
                        onChange={inventoryInputHandle}
                        placeholder="width"
                        style={{
                          width: "20vw",
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
                      style={{ width: "22vw", marginRight: ".7%" }}
                    >
                      <label>Condition</label> <br></br>
                      <input
                        type="text"
                        placeholder="height"
                        name="height"
                        value={inventoryFormValue.height || 0}
                        onChange={inventoryInputHandle}
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
                  style={{
                    marginRight: "4%",
                    color: "black",
                    font: "normal normal medium 15px/58px Poppins",
                    width: "6vw",
                    textTransform: "capitalize",
                    backgroundColor: "#E2E2E2",
                  }}
                  onClick={() => navigate("/Dashboard")}
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
        </div>
      </div>
    </>
  );
};

export default ViewDetails;
