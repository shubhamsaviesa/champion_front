import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'
import { BiExport } from 'react-icons/bi'
import SearchIcon from '../../../images/bookcommerceimage/Path 332.png'
import Listings from '../../../style/Actions/Listings.module.css'
import { FaSync } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import ChanelTable from '../../../style/Channels/ChannelTable.module.css'
import { TiArrowBack } from 'react-icons/ti'
import ExportListingTable from '../../../layout/Poppers/ExportListingTable'

export const GlobalFilter = ({ filter, setFilter, getDatefrom,channelname }) => {

  const [value, setValue] = useState(filter)
  const [inputvalue, setInputValue] = useState("")
  const [channelVal, setChannelVal] = useState("")

  const Navigation = useNavigate()

  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 0)

  const onChangeChannel = useAsyncDebounce(value => {
    setFilter(value || undefined);
  }, 0)

  const onChangeDate = (val, type) => {
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

  const handleExportPopper = () => {

  }

  return (
    <>
      <div className={ChanelTable.actionbutton}>
      <div className={ChanelTable.backarrow}>
      <TiArrowBack size={30} onClick={()=>{Navigation(-1)}}/>
    </div> 
          <div className={ChanelTable.exportbutton}>
          <button type="button" className={ChanelTable.exportbtn} onClick={handleExportPopper}><ExportListingTable channelname={channelname} /></button>
        </div>
        <div className={ChanelTable.exportbutton}>
          <button type="button" className={ChanelTable.exportsync}>Sync Now {"   "}<FaSync size={20} /></button>
        </div>
      </div>
      <div className={ChanelTable.globalfilters}>
        <div className={ChanelTable.searchbar}>
          <h5 style={{ marginBottom: "2px", marginLeft: "7px", fontSize: "16px" }}>Search</h5>
          <div className={ChanelTable.searchfield} style={{ marginTop: "0px" }}>
            <img src={SearchIcon} alt='loading...' />
            <input className={ChanelTable} type='search'
              value={inputvalue || ''}
              onChange={inputHandle}
              placeholder="Search..." style={{ border: "none" }} />
            <label className={ChanelTable.label} for='search' onClick={submitHandle}>Search</label>
          </div>
        </div>

        <div className={ChanelTable.channelfilter}>

          <div className={ChanelTable.channnelcontainer}>
            <select
              className="itemcondtion"
              name="item_condition" value={channelVal} onChange={(e) => onChangeChannel(e.target.value)}
              style={{ color: "#888888", background: "#F1F1F1", borderRadius: "23px", width: "92%" }}>
              {/* <option  className="dropdown-item" >Used:Like New </option> */}
              <option  >Category</option>
              <option >Home Decor</option>
              <option >Industrial & Tools</option>
              <option >Personal Care</option>
              <option >Auromobiles</option>
              <option>All</option>
            </select>
            <div>
            </div>
          </div>
          <div className={ChanelTable.channnelcontainer}>
            <select
              className="itemcondtion"
              name="item_condition" value={channelVal} onChange={(e) => onChangeChannel(e.target.value)}
              style={{ color: "#888888", background: "#F1F1F1", borderRadius: "23px", width: "92%" }}>
              {/* <option  className="dropdown-item" >Used:Like New </option> */}
              <option  >Listed</option>
              <option >Home Decor</option>
              <option >Industrial & Tools</option>
              <option >Personal Care</option>
              <option >Auromobiles</option>
              <option>All</option>
            </select>
            <div>
            </div>
          </div>
        </div>

        <div className={ChanelTable.fdate}>
          <div className={ChanelTable.productDate}>
            <span className={ChanelTable.productDatespan}>From Date</span>{" "}
            <input type='date' style={{ color: "#7D8D9D", textAlign: "center", paddingRight: "15px" }} placeholder="dd-mm-yyyy" onChange={(e) => getDatefrom(e.target.value, "from")} />
            <span className={ChanelTable.productDatespan}>To Date</span>{" "}
            <input type='date' style={{ color: "#7D8D9D", textAlign: "center", paddingRight: "15px" }} placeholder="dd-mm-yyyy" onChange={(e) => getDatefrom(e.target.value, "to")} /></div>
        </div>
      </div>
    </>
  )
}

