import { createContext, useState, useContext } from "react";
import React from "react";

export const DataContext = createContext(null);
export const DataContextUse = () => useContext(DataContext);
const DataProvider = ({ children }) => {
  const [welcomValue, setWelcomValue] = useState(false);
  const [topHeader, setTopHeader] = useState("");
  const [account, setAccount] = useState("");
  const [tempresult, setTempresult] = useState({});
  const [templateName, setTemplateName] = useState([]);
  const [editTempName, setEditTempName] = useState("");
  const [yourtemp, setYourtemp] = useState([]);
  const [tempId, setTempId] = useState("");
  const [bookcommtemp, setBookcommtemp] = useState([]);
  const [mappedArr, setMappedArr] = useState();
  const [exporrtSelectedItem_id, setExporrtSelectedItem_id] = useState([]); //for exportItem from productcatalog page
  const [getTemplateListingData, setGetTemplateListingData] = useState([]); //for recieving data on templatelisting table
  const [templateListingSelected_id, setTemplateListingSelected_id] = useState(
    []
  );
  const [deleteListingStatus, setDeleteListingStatus] = useState("");
  const [getDeleteWarn, setGetDeleteWarn] = useState(false);
  const [orderViewDetails, setOrderViewDetails] = useState({});
  //for error in response
  const [resError, setResError] = useState("");
  const [sidenavbar, setSidenavbar] = useState(true);

  //for edit channel credential
  const [editChannelDetails, setEditChannelDetails] = useState({});

  //for sending number of values
  const providerValue = React.useMemo(
    () => ({
      welcomValue,
      setWelcomValue,
      sidenavbar,
      setSidenavbar,
      topHeader,
      setTopHeader,
      account,
      setAccount,
      tempresult,
      setTempresult,
      yourtemp,
      setYourtemp,
      editTempName,
      setEditTempName,
      tempId,
      setTempId,
      templateName,
      setTemplateName,
      bookcommtemp,
      setBookcommtemp,
      mappedArr,
      setMappedArr,
      exporrtSelectedItem_id,
      setExporrtSelectedItem_id,
      getTemplateListingData,
      setGetTemplateListingData,
      templateListingSelected_id,
      setTemplateListingSelected_id,
      deleteListingStatus,
      setDeleteListingStatus,
      resError,
      setResError,
      editChannelDetails,
      setEditChannelDetails,
      getDeleteWarn,
      setGetDeleteWarn,
      orderViewDetails,
      setOrderViewDetails,
    }),
    [
      welcomValue,
      topHeader,
      account,
      tempresult,
      yourtemp,
      tempId,
      templateName,
      editTempName,
      bookcommtemp,
      mappedArr,
      exporrtSelectedItem_id,
      getTemplateListingData,
      deleteListingStatus,
      templateListingSelected_id,
      resError,
      editChannelDetails,
      getDeleteWarn,
      orderViewDetails,
      sidenavbar,
    ]
  );
  return (
    <DataContext.Provider value={providerValue}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
