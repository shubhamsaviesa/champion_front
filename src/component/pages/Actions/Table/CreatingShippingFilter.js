import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'
import {BiExport} from 'react-icons/bi'
import SearchIcon from '../../../images/bookcommerceimage/Path 332.png'
import Listings from '../../../style/Actions/Listings.module.css'
import {FaSync} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import ExportListingTable from '../../../layout/Poppers/ExportListingTable'
import ListingTable from '../../../layout/Poppers/ListingTable'

export const GlobalFilter = ({ filter, setFilter,getDatefrom }) => {
  const [value, setValue] = useState(filter)
  const [inputvalue, setInputValue] = useState("")
  const [channelVal, setChannelVal] = useState("")


  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 0)

  const onChangeChannel = useAsyncDebounce(value => {
    setFilter(value || undefined);
  }, 0)

  const onChangeDate=(val,type)=>{
    // getDatefrom(val)
    console.log(val, type)
  }

  const inputHandle = (e) => {
    setInputValue(e.target.value)
  }
  const submitHandle = () => {
    setValue(inputvalue)
    onChange(inputvalue)
  }

  const handleExportPopper = () =>{
    
  }

  return (
    <>
   
      <div className={Listings.globalfiltersListing}>
        <div className={Listings.searchbaronListing}>
          <h5 style={{ marginBottom: "2px", marginLeft: "7px", fontSize: "16px" }}>Search</h5>
          <div className={Listings.searchfieldonListing} style={{ marginTop: "0px" }}>
           <img src={SearchIcon} alt='loading...' />
            <input type='search'
              value={inputvalue || ''}
              onChange={inputHandle}
              placeholder="Search..." style={{ border: "none" }} />
            <label for='search' onClick={submitHandle}>Search</label>
          </div>
        </div>

      
        <div className={Listings.fdateonLisiting}>
          <div className={Listings.productDateonListing}>
              <span className={Listings.productDatespan}>From Date</span>{" "}
              <input type='date' style={{ color: "#7D8D9D", textAlign: "center", paddingRight: "15px" }} placeholder="dd-mm-yyyy" onChange={(e) => getDatefrom(e.target.value,"from")} />
              <span className={Listings.productDatespan}>To Date</span>{" "}
              <input type='date' style={{ color: "#7D8D9D", textAlign: "center", paddingRight: "15px" }} placeholder="dd-mm-yyyy" onChange={(e) => getDatefrom(e.target.value,"to")} /></div>
        </div>
      </div>
    </>
  )
}

