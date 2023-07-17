import React, { useEffect, useContext } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { RedirectEbayUrl } from "../../../../rtk/features/Marketplace/EbaySlice";
import { useSelector, useDispatch } from "react-redux";

const EbayComponent = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  let [searchParams, setSearchParams] = useSearchParams();
  let search = useLocation().search;
  const ebayResponse = useSelector((state) => state.Ebay.EbayData.status);

  //   const ebayTokenApi = async (codes) => {
  //     console.log("codes", codes);
  //     try {
  //       await axiosInstance({
  //         url: "/EbayTokenGenrate",
  //         method: "POST",
  //         data: { code: codes },
  //       }).then((res) => {
  //         console.log("res in ebay component", res);
  //         if (res.data.access_token) {
  //           setReloadChannel(true);
  //           navigate("/ebayCompleted");
  //           //  let newWin = window.open('https://app.bookcommerce.com/channels','anyname','width=10,height=1,left=5,top=3')
  //           //  newWin.close()
  //         }
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  const ebayTokenApi = async (codes) => {
    try {
      dispatch(RedirectEbayUrl(codes)).then(() => {
        switch (ebayResponse) {
          case "res.data.access_token":
            navigate("/ebayCompleted");
        }
      });
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
