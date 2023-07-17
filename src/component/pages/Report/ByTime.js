import React, { useState } from 'react'
import Reportscss from '../../style/Reports/reports.module.css'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { BsArrowRight } from 'react-icons/bs'
import LineChart1 from '../Dashboard/Lingraph'
import ReportTable from './Table/ReportTable'
import { Box } from '@mui/material'
import Dashboardpage from '../../style/Dashboard/dashboard.module.css'

const ByTime = () => {
    const [getreport, setGetreport] = useState('false');

    const getReportFun = () => {
        setGetreport(!getreport);
    }

    let RenderedComponent;

    if (getreport) {
        RenderedComponent =
         <>
         <div className='headingbaronaction'>
                    <div className='toptableheading'>
                        <div className='subtoptableheadingone'>
                            <div>Reports</div>
                        </div>
                        <div className='subtoptableheadingone'>
                            <span>Reports</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Sales Report By Time</span>
                        </div>
                    </div>
                </div>
                <div className={Reportscss.globalfiltersListing}>

<div className={Reportscss.fdateonLisiting}>
    <div className={Reportscss.productDateonListing}>
        <span className={Reportscss.productDatespan}>From Date</span>{" "}
        <input type='date' style={{ color: "#7D8D9D", textAlign: "center", paddingRight: "15px" }} placeholder="dd-mm-yyyy" />
        <span className={Reportscss.productDatespan}>To Date</span>{" "}
        <input type='date' style={{ color: "#7D8D9D", textAlign: "center", paddingRight: "15px" }} placeholder="dd-mm-yyyy" /></div>
</div>

<div className={Reportscss.channelfilteronlisitng}>
    <div className={Reportscss.channnelcontaineronListing}>
        <select
            className="itemcondtion"
            name="item_condition"
            style={{ color: "#888888", background: "#F1F1F1", borderRadius: "23px", width: "92%" }}>
            {/* <option  className="dropdown-item" >Used:Like New </option> */}
            <option  >Channels</option>
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
<div>
    <button onClick={getReportFun} className={Reportscss.exportbtn}>Get Report<BsArrowRight /></button>
</div>

</div>
        </>;
    } else {
        RenderedComponent = 
        <>
        <div className='headingbaronaction'>
                   <div className='toptableheading'>
                       <div className='subtoptableheadingone'>
                           <div>Reports</div>
                       </div>
                       <div className='subtoptableheadingone'>
                           <span>Reports</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Sales Report By Time</span>
                       </div>
                   </div>
               </div>
               <div className={Reportscss.globalfiltersListing}>

<div className={Reportscss.fdateonLisiting}>
   <div className={Reportscss.productDateonListing}>
       <span className={Reportscss.productDatespan}>From Date</span>{" "}
       <input type='date' style={{ color: "#7D8D9D", textAlign: "center", paddingRight: "15px" }} placeholder="dd-mm-yyyy" />
       <span className={Reportscss.productDatespan}>To Date</span>{" "}
       <input type='date' style={{ color: "#7D8D9D", textAlign: "center", paddingRight: "15px" }} placeholder="dd-mm-yyyy" /></div>
</div>

<div className={Reportscss.channelfilteronlisitng}>
   <div className={Reportscss.channnelcontaineronListing}>
       <select
           className="itemcondtion"
           name="item_condition"
           style={{ color: "#888888", background: "#F1F1F1", borderRadius: "23px", width: "92%" }}>
           {/* <option  className="dropdown-item" >Used:Like New </option> */}
           <option  >Channels</option>
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
<div>
   <button onClick={getReportFun} className={Reportscss.exportbtn}>Get Report<BsArrowRight /></button>
</div>
</div>
<div className={Reportscss.graphcontainerone}>
                    <div className={Reportscss.sectionOne}>
                         <div className={Reportscss.headings}>
                              <div className={Reportscss.headingtext}>Total Sales</div>
                              <select className={Reportscss.headingselectbox}>
                                   <option value="volvo">7 days</option>
                                   <option value="saab">Saab</option>
                              </select>
                         </div>
                         <div className={Reportscss.graphone}>
                              <LineChart1 />
                         </div>
                         <div style={{ display: "flex", fontSize: "12px", textAlign: "center", justifyContent: "center" }}>
                                                  <div style={{ display: "flex",marginRight:"61px"}}>  <Box className={Dashboardpage.boxbrand} style={{ borderColor: "#980000" }}></Box><span>Sears</span><span>50K</span></div>
                                                  <div style={{ display: "flex",marginRight:"61px" }}>  <Box className={Dashboardpage.boxbrand} style={{ borderColor: "#00FF00" }}></Box><span>Amazon</span><span>46K</span></div>
                                                  <div style={{ display: "flex",marginRight:"61px" }}>  <Box className={Dashboardpage.boxbrand} style={{ borderColor: "#FF0000" }}></Box><span>Walmart</span><span>150K</span></div>
                                                  <div style={{ display: "flex",marginRight:"61px" }}>  <Box className={Dashboardpage.boxbrand} style={{ borderColor: "#FFFF00" }}></Box><span>eBay</span><span>100K</span></div>
                                                  <div style={{ display: "flex",marginRight:"61px" }}>  <Box className={Dashboardpage.boxbrand} style={{ borderColor: "#FF9900" }}></Box><span>Wish</span><span>10K</span></div>
                                                  <div style={{ display: "flex",marginRight:"61px" }}>  <Box className={Dashboardpage.boxbrand} style={{ borderColor: "#4A86E8" }}></Box><span>Newegg</span><span>10K</span></div>
                                             </div>
                         <div>
                            <ReportTable/>
                         </div>
                    </div>
                   </div>
       </>;
    }

    return (
        <div>
            <div className='backgroundcontainer'>
               {RenderedComponent}
            </div>
        </div>
    )
}

export default ByTime