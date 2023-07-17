import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../style/Channels/channelshome.css";
import Amazon_icon from "../../images/channel/Amazon_icon.png";
import walmart from "../../images/channel/walmart.png";
import ebay from "../../images/channel/EBay_logo.png";
import sears from "../../images/channel/sears.png";
import Newegg from "../../images/channel/Newegg.png";
import wishlogo from "../../images/channel/wishlogo.png";
import bigc from "../../images/channel/bigc.png";
import shopify from "../../images/channel/shopify.png";
import usps from "../../images/channel/usps.png";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { FetchChannelActiveData } from "../../../rtk/features/Marketplace/ChannelActiveSlice";
import _ from "lodash";

const Channels = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const ChannelActiveDataa = useSelector((state) => state.ChannelActiveData);
  console.log("ChannelActiveDataa", ChannelActiveDataa);
  useEffect(() => {
    dispatch(FetchChannelActiveData());
  }, []);

  const handleAmazonConnect = () => {
    if (
      ChannelActiveDataa?.ChannelActiveData?.channelStatus?.[5]?.Amazon ===
      "Connected"
    ) {
      // Amazon channel is already connected, do nothing
      return;
    }
    Navigate("/amazonconnect");
  };
  const handleWalmartConnect = () => {
    if (
      ChannelActiveDataa?.ChannelActiveData?.channelStatus?.[2]?.Walmart ===
      "Connected"
    ) {
      // Walmart channel is already connected, do nothing
      return;
    }

    Navigate("/walmartconnect");
  };
  const handleEbayConnect = () => {
    if (
      ChannelActiveDataa?.ChannelActiveData?.channelStatus?.[6]?.eBay ===
      "Connected"
    ) {
      // eBay channel is already connected, do nothing
      return;
    }
    Navigate("/EbayConnect");
  };
  const handleSearsConnect = () => {
    if (
      ChannelActiveDataa?.ChannelActiveData?.channelStatus?.[1]?.Sears ===
      "Connected"
    ) {
      // Sears channel is already connected, do nothing
      return;
    }
    Navigate("/SearsConnect");
  };

  const handleNewEggConnect = () => {
    if (
      ChannelActiveDataa?.ChannelActiveData?.channelStatus?.[0]?.Newegg ===
      "Connected"
    ) {
      // Newegg channel is already connected, do nothing
      return;
    }
    Navigate("/newegg");
  };

  const handleWishConnect = () => {
    if (
      ChannelActiveDataa?.ChannelActiveData?.channelStatus?.[3]?.Wish ===
      "Connected"
    ) {
      // Wish channel is already connected, do nothing
      return;
    }
    Navigate("/wishconnect");
  };

  const handleBigCommerceConnect = () => {
    Navigate("/BigcommerceConnect");
  };

  const handleShopifyConnect = () => {
    Navigate("/ShopifyConnect");
  };

  const handleUspsConnect = () => {
    Navigate("/UspsConnect");
  };
  // className={ChannelActiveDataa.ChannelActiveData.channelStatus[2]=='Connected'?"channelboxone":"channelboxtwo"}

  const { sidenavbar } = useContext(DataContext);

  return (
    <>
      <div
        className={sidenavbar ? "BoxContainerchannel" : "BoxContainerchannel2"}
      >
        <div className="channelscontainer">
          <div className="channelcontainerone">
            <div className="channelcontaineroneheading">Marketplaces</div>
            <div
              className={
                !_.isEmpty(ChannelActiveDataa.ChannelActiveData) &&
                ChannelActiveDataa.ChannelActiveData.channelStatus[5].Amazon ===
                  "Connected"
                  ? "channelboxtwo"
                  : "channelboxone"
              }
            >
              <img height="35px" width="45px" src={Amazon_icon} alt="loading" />
              <div className="channelboxonetext">Amazon</div>
              <div
                className={
                  !_.isEmpty(ChannelActiveDataa.ChannelActiveData) &&
                  ChannelActiveDataa.ChannelActiveData.channelStatus[5]
                    .Amazon === "Connected"
                    ? "connectedbutton"
                    : "connectbutton"
                }
                onClick={handleAmazonConnect}
              >
                {ChannelActiveDataa?.ChannelActiveData?.channelStatus?.[5]
                  ?.Amazon === "Connected"
                  ? "Connected"
                  : "Connect"}
              </div>
            </div>

            <div
              className={
                !_.isEmpty(ChannelActiveDataa.ChannelActiveData) &&
                ChannelActiveDataa.ChannelActiveData.channelStatus[2]
                  .Walmart === "Connected"
                  ? "channelboxtwo"
                  : "channelboxone"
              }
            >
              <img height="35px" width="40px" src={walmart} alt="loading" />
              <div className="channelboxonetext">Walmart</div>
              <div
                className={
                  !_.isEmpty(ChannelActiveDataa.ChannelActiveData) &&
                  ChannelActiveDataa.ChannelActiveData.channelStatus[2]
                    .Walmart === "Connected"
                    ? "connectedbutton"
                    : "connectbutton"
                }
                onClick={handleWalmartConnect}
              >
                {ChannelActiveDataa?.ChannelActiveData?.channelStatus?.[2]
                  ?.Walmart === "Connected"
                  ? "Connected"
                  : "Connect"}
              </div>
            </div>

            <div
              className={
                !_.isEmpty(ChannelActiveDataa.ChannelActiveData) &&
                ChannelActiveDataa.ChannelActiveData.channelStatus[6].eBay ===
                  "Connected"
                  ? "channelboxtwo"
                  : "channelboxone"
              }
            >
              <img height="30px" width="48px" src={ebay} alt="loading" />
              <div className="channelboxonetext">eBay</div>
              <div
                className={
                  !_.isEmpty(ChannelActiveDataa.ChannelActiveData) &&
                  ChannelActiveDataa.ChannelActiveData.channelStatus[6].eBay ===
                    "Connected"
                    ? "connectedbutton"
                    : "connectbutton"
                }
                onClick={handleEbayConnect}
              >
                {ChannelActiveDataa?.ChannelActiveData?.channelStatus?.[6]
                  ?.eBay === "Connected"
                  ? "Connected"
                  : "Connect"}
              </div>
            </div>

            <div
              className={
                !_.isEmpty(ChannelActiveDataa.ChannelActiveData) &&
                ChannelActiveDataa.ChannelActiveData.channelStatus[1].Sears ===
                  "Connected"
                  ? "channelboxtwo"
                  : "channelboxone"
              }
            >
              <img height="35px" width="45px" src={sears} alt="loading" />
              <div className="channelboxonetext">Sears</div>
              <div
                className={
                  !_.isEmpty(ChannelActiveDataa.ChannelActiveData) &&
                  ChannelActiveDataa.ChannelActiveData.channelStatus[1]
                    .Sears === "Connected"
                    ? "connectedbutton"
                    : "connectbutton"
                }
                onClick={handleSearsConnect}
              >
                {ChannelActiveDataa?.ChannelActiveData?.channelStatus?.[1]
                  ?.Sears === "Connected"
                  ? "Connected"
                  : "Connect"}
              </div>
            </div>

            <div
              className={
                !_.isEmpty(ChannelActiveDataa.ChannelActiveData) &&
                ChannelActiveDataa.ChannelActiveData.channelStatus[0].Newegg ===
                  "Connected"
                  ? "channelboxtwo"
                  : "channelboxone"
              }
            >
              <img height="40px" width="58px" src={Newegg} alt="loading" />
              <div className="channelboxonetext">Newegg</div>
              <div
                className={
                  !_.isEmpty(ChannelActiveDataa.ChannelActiveData) &&
                  ChannelActiveDataa.ChannelActiveData.channelStatus[0]
                    .Newegg === "Connected"
                    ? "connectedbutton"
                    : "connectbutton"
                }
                onClick={handleNewEggConnect}
              >
                {ChannelActiveDataa?.ChannelActiveData?.channelStatus?.[0]
                  ?.Newegg === "Connected"
                  ? "Connected"
                  : "Connect"}
              </div>
            </div>

            <div
              className={
                !_.isEmpty(ChannelActiveDataa.ChannelActiveData) &&
                ChannelActiveDataa.ChannelActiveData.channelStatus[3].Wish ===
                  "Connected"
                  ? "channelboxtwo"
                  : "channelboxone"
              }
            >
              <img height="25px" width="38px" src={wishlogo} alt="loading" />
              <div className="channelboxonetext">Wish</div>
              <div
                className={
                  !_.isEmpty(ChannelActiveDataa.ChannelActiveData) &&
                  ChannelActiveDataa.ChannelActiveData.channelStatus[3].Wish ===
                    "Connected"
                    ? "connectedbutton"
                    : "connectbutton"
                }
                onClick={handleWishConnect}
              >
                {ChannelActiveDataa?.ChannelActiveData?.channelStatus?.[3]
                  ?.Wish === "Connected"
                  ? "Connected"
                  : "Connect"}
              </div>
            </div>
          </div>
          <div className="channelcontainerone">
            <div className="channelcontaineroneheading">
              E Commerce Platform
            </div>
            <div className="channelboxone">
              <img height="30px" width="40px" src={bigc} alt="loading" />
              <div className="channelboxonetext">Big Commerce</div>
              <div className="connectbutton" onClick={handleBigCommerceConnect}>
                Connect
              </div>
            </div>
            <div className="channelboxone">
              <img height="35px" width="45px" src={shopify} alt="loading" />
              <div className="channelboxonetext">Shopify</div>
              <div className="connectbutton" onClick={handleShopifyConnect}>
                Connect
              </div>
            </div>
          </div>
          <div className="channelcontainerone">
            <div className="channelcontaineroneheading">Shiping carriers</div>
            <div
              className={
                !_.isEmpty(ChannelActiveDataa.ChannelActiveData) &&
                ChannelActiveDataa.ChannelActiveData.channelStatus[4].USPS ===
                  "Connected"
                  ? "channelboxtwo"
                  : "channelboxone"
              }
            >
              <img height="30px" width="55px" src={usps} alt="loading" />
              <div className="channelboxonetext">USPS</div>
              <div className="connectbutton" onClick={handleUspsConnect}>
                Connect
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Channels;
