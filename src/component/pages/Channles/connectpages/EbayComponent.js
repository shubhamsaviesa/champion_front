import React, { useEffect, useContext } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { RedirectEbayUrl } from "../../../../rtk/features/Marketplace/EbaySlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"; // Import axios

const EbayComponent = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  let [searchParams, setSearchParams] = useSearchParams();
  let search = useLocation().search;
  const ebayResponse = useSelector((state) => state.Ebay.EbayData.status);

  const ebayTokenApi = async (code) => {
    try {
      const config = {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };
      console.log("ebayTokenApi  called or not");
      // Send the formValues data as the request payload along with the config object
      const response = await axios.post(
        "http://api.championlister.com/api/user/EbayTokenGenrate",
        code,
        config
      );
      console.log("response in after we get code", response);
      // Assuming the response contains the eBay data, you can access it like this:
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    const code = new URLSearchParams(search).get("code");
    if (code) {
      ebayTokenApi(code);
    }
  }, [search]);

  return <div>EbayComponent</div>;
};

export default EbayComponent;
