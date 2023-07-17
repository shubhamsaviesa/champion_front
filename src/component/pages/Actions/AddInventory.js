import React, { useState, useContext, useEffect, useMemo } from "react";
import "../../style/Actions/Addinventory.css";
import { Button, styled } from "@mui/material";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../images/bookcommerceimage/Layer 37.png";
import { DataContext } from "../../context/DataProvider";
import { useSelector, useDispatch } from "react-redux";
import { insertAddInventoryData } from "../../../rtk/features/Action/addInventorySlice";
import FormData from "form-data";
import { toast } from "react-toastify";
import _ from "lodash";
import ClearIcon from "@mui/icons-material/Clear";
import Api_url from "../../../Api/Api";

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

const AddInventory = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const initialValue = {
    productname: "",
    description: "",
    identifiertype: "",
    identifier: "",
    category: "",
    subcategory: "",
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
    imageupload1: "",
    imageupload2: "",
    imageupload3: "",
    lbs: "",
  };

  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const { sidenavbar } = useContext(DataContext);
  const customId = "custom-id-yes";
  const [inventoryFormValue, setInventoryFormValue] = useState(initialValue);
  const [media, setMedia] = useState("");
  console.log("files", files);
  console.log("inventoryFormValue", inventoryFormValue);
  
  const fileHandler = (e) => {
    const file = e.target.files[0];

    // Check if the file has already been selected
    const isDuplicate = files.some(
      (f) => f.name === file.name && f.size === file.size
    );

    if (isDuplicate) {
      toast.error("You've already selected this file.");

      return;
    }

    if (files.length < 3) {
      setFiles([...files, file]);
    } else {
      console.log("You can only upload up to 3 images");
      toast.error("You can only upload up to 3 images", { toastId: customId });
    }
  };

  const deleteHandle = (name) => {
    const newFiles = files.filter((f) => f.name !== name);
    setFiles(newFiles);
  };

  const inventoryFormStatus = useSelector(
    (state) => state.inventoryForm.users.status
  );

  console.log("inventoryFormStatus", inventoryFormStatus);

  const dispatch = useDispatch();

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        // `http://localhost:5000/api/user/categories`
        Api_url+'/categories',
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to fetch categories");
    }
  };
  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await fetch(
        // `http://localhost:5000/api/user/subcategories/${categoryId}`
        Api_url+`/subcategories/${categoryId}`,
      );
      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error("Failed to fetch subcategories");
    }
  };
  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  useEffect(() => {
    if (inventoryFormValue.category) {
      fetchSubcategories(inventoryFormValue.category)
        .then((data) => {
          console.log("data subcategory name", data);

          setSubcategories(data);
        })
        .catch((error) => {
          console.error("Failed to fetch subcategories:", error);
        });
    }
  }, [inventoryFormValue.category]);

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
    } else if (name === "category") {
      const categoryName =
        categories.find((cat) => cat._id === value)?.name || "";
      setInventoryFormValue({
        ...inventoryFormValue,
        [name]: value,
        categoryName: categoryName,
        subcategory: "",
        subcategoryName: "",
      });
    } else if (name === "subcategory") {
      const categoryName =
        categories.find((cat) => cat._id === inventoryFormValue.category)
          ?.name || "";
      const subcategory = categories
        .find((cat) => cat._id === inventoryFormValue.category)
        ?.subcategories.find((subcat) => subcat === value);
      const subcategoryName = subcategory || "";
      setInventoryFormValue({
        ...inventoryFormValue,
        [name]: value,
        categoryName: categoryName,
        subcategoryName: subcategoryName,
      });
    } else {
      setInventoryFormValue({ ...inventoryFormValue, [name]: value });
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
    "subcategory",
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

    const formFields = {
      productname: inventoryFormValue.productname,
      description: inventoryFormValue.description,
      identifiertype: inventoryFormValue.identifiertype,
      identifier: inventoryFormValue.identifier,
      category:
        categories.find((cat) => cat._id === inventoryFormValue.category)
          ?.name || "",
      subcategory: subcategories.find(
        (subcat) => subcat._id === inventoryFormValue.subcategory
      )?.name,
      condition: inventoryFormValue.condition,
      brand: inventoryFormValue.brand,
      availableqty: inventoryFormValue.availableqty,
      manufacturer: inventoryFormValue.manufacturer,
      manufacturernumber: inventoryFormValue.manufacturernumber,
      lisrtprice: inventoryFormValue.lisrtprice,
      mapprice: inventoryFormValue.mapprice,
      upc: inventoryFormValue.upc,
      gstin: inventoryFormValue.gstin,
      sku: inventoryFormValue.sku,
      other: inventoryFormValue.other,
      costprice: inventoryFormValue.costprice,
      profitprice: inventoryFormValue.profitprice,
      marketplacecommision: inventoryFormValue.marketplacecommision,
      weight: inventoryFormValue.weight,
      length: inventoryFormValue.length,
      width: inventoryFormValue.width,
      height: inventoryFormValue.height,
      lbs: inventoryFormValue.lbs,
      imageupload1: files[0],
      imageupload2: files[1],
      imageupload3: files[2],
    };

    const form = new FormData();

    Object.entries(formFields).forEach(([name, value]) => {
      if (name === "category" || name === "subcategory") {
        form.append(name + "Name", value);
      } else {
        form.append(name, value);
      }
    });
    console.log("form", form);
    dispatch(insertAddInventoryData(form))
      .then(() => {
        switch (inventoryFormStatus) {
          case "success":
            toast.success("Item Creation Successfully", {
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
                <div>Add Inventory</div>
              </div>
              <div className="subtoptableheadingone">
                <span>Actions</span>{" "}
                <span>
                  <MdOutlineArrowForwardIos />
                </span>
                <span className="subMenu_subheading">Add Inventory</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="addinveForm">
              <div>
                <div className="addinveFormSegment">
                  <h3>Add Product</h3>
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
                      <select
                        name="category"
                        value={inventoryFormValue.category}
                        onChange={inventoryInputHandle}
                      >
                        <option value="">Select Category</option>
                        {categories.length > 0 ? (
                          categories.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))
                        ) : (
                          <option disabled>Loading categories...</option>
                        )}
                      </select>
                    </div>

                    <div className="inventoryInput_container">
                      <label>
                        Sub Category
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
                        name="subcategory"
                        value={inventoryFormValue.subcategory}
                        onChange={inventoryInputHandle}
                      >
                        <option value="">Select Subcategory</option>
                        {subcategories.length > 0 ? (
                          subcategories.map((subcategory) => (
                            <option key={subcategory} value={subcategory}>
                              {subcategory}
                            </option>
                          ))
                        ) : (
                          <option disabled>Loading subcategories...</option>
                        )}
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
                      value={inventoryFormValue.brand}
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

              <div className="addinveFormSegment" style={{ height: "35vh" }}>
                <h3>Manufacturer</h3>
                <div style={{ display: "flex" }}>
                  <div className="inventoryInput_container">
                    <label>Manufacturer</label> <br></br>
                    <input
                      type="text"
                      name="manufacturer"
                      value={inventoryFormValue.manufacturer}
                      onChange={inventoryInputHandle}
                    />
                  </div>
                  <div className="inventoryInput_container">
                    <label>Manufacturer Part Number</label> <br></br>
                    <input
                      type="text"
                      name="manufacturernumber"
                      value={inventoryFormValue.manufacturernumber}
                      onChange={inventoryInputHandle}
                    />
                  </div>
                  <div className="inventoryInput_container">
                    <label>List Price(MSRP)</label> <br></br>
                    <input
                      type="text"
                      name="lisrtprice"
                      value={inventoryFormValue.lisrtprice}
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
                      value={inventoryFormValue.mapprice}
                      onChange={inventoryInputHandle}
                    />
                  </div>
                  <div className="inventoryInput_container">
                    <label>UPC</label> <br></br>
                    <input
                      type="text"
                      name="upc"
                      value={inventoryFormValue.upc}
                      onChange={inventoryInputHandle}
                    />
                  </div>
                  <div className="inventoryInput_container">
                    <label>GSTIN</label> <br></br>
                    <input
                      type="text"
                      name="gstin"
                      value={inventoryFormValue.gstin}
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

              <h3 style={{ marginLeft: "20px", marginBottom: "2%" }}>
                Image Upload{" "}
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
                    id="file"
                    accept="image/*"
                    onChange={fileHandler}
                    name="imageupload1"
                  />
                  <label htmlFor="file">
                    {files.length > 0 && files[0].name ? (
                      <img
                        width="200px"
                        height="115px"
                        src={URL.createObjectURL(files[0])}
                        alt="loading..."
                      />
                    ) : (
                      <img src={ImageUpload} alt="loading..." />
                    )}
                  </label>
                  {files.length > 0 && files[0].name ? (
                    <ClearIcon
                      sx={{
                        cursor: "pointer",
                        position: "relative",
                        top: "-54px",
                        left: "-3px",
                      }}
                      onClick={() => deleteHandle(files[0].name, 0)}
                    />
                  ) : null}
                </div>

                <div style={{ margin: "0 52px" }}>
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={fileHandler}
                    name="imageupload2"
                  />
                  <label htmlFor="file">
                    {files[1] && files[1].name ? (
                      <img
                        width="200px"
                        height="115px"
                        src={URL.createObjectURL(files[1])}
                        alt="loading..."
                      />
                    ) : (
                      <img src={ImageUpload} alt="loading..." />
                    )}
                  </label>
                  {files[1] && files[1].name ? (
                    <ClearIcon
                      sx={{
                        cursor: "pointer",
                        position: "relative",
                        top: "-54px",
                        left: "-3px",
                      }}
                      onClick={() => deleteHandle(files[1].name, 1)}
                    />
                  ) : null}
                </div>

                <div>
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={fileHandler}
                    name="imageupload3"
                  />
                  <label htmlFor="file">
                    {files[2] && files[2].name ? (
                      <img
                        width="200px"
                        height="115px"
                        src={URL.createObjectURL(files[2])}
                        alt="loading..."
                      />
                    ) : (
                      <img src={ImageUpload} alt="loading..." />
                    )}
                  </label>
                  {files[2] && files[2].name ? (
                    <ClearIcon
                      sx={{
                        cursor: "pointer",
                        position: "relative",
                        top: "-54px",
                        left: "-3px",
                      }}
                      onClick={() => deleteHandle(files[2].name, 2)}
                    />
                  ) : null}
                </div>
              </div>

              <div className="addinveFormSegment" style={{ height: "15vh" }}>
                <h5 style={{ marginTop: "1%", fontWeight: "bold" }}>Pricing</h5>
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
                        value={inventoryFormValue.marketplacecommision}
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
                        value={inventoryFormValue.weight}
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
                        value={inventoryFormValue.lbs}
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
                        value={inventoryFormValue.length}
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
                        value={inventoryFormValue.width}
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
                        value={inventoryFormValue.height}
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
                  height: "18vh",
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

export default AddInventory;
