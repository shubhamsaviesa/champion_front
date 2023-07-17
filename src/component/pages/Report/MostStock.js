import React, { useState } from 'react'
import Reportscss from '../../style/Reports/reports.module.css'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import {BsArrowRight} from 'react-icons/bs'
import MostStockTable from './Table/MostStockTable'

const MostStock = () => {
    const [showreport,setShowreport] = useState(true)
    const getReport=()=>{
        setShowreport(!showreport)
    }
    
    let RenderPage;
    if(showreport){
        RenderPage=
        <>
          <div className={Reportscss.globalfiltersListing}>
    <div style={{marginLeft:"5%"}}>
            <div className={Reportscss.productDateonListing}>
              <lable style={{fontSize:"15px",color:'grey'}}>available less than</lable><br/>
                <input type='text' placeholder='10' style={{ color: "#7D8D9D", textAlign: "center", paddingRight: "15px" ,fontSize:"15px",border:'0.2px solid grey',width:"18rem"}} /></div>
        </div>
    
        <button className={Reportscss.exportbtn} style={{marginTop:"2%"}} onClick={getReport}>Get Report<BsArrowRight/></button>
     
    </div>
        </>
    }
    else{
        RenderPage=
        <>
        <div className={Reportscss.globalfiltersListing}>
  
        <div style={{marginLeft:"5%"}}>
            <div className={Reportscss.productDateonListing}>
              <lable style={{fontSize:"15px",color:'grey'}}>available less than</lable><br/>
                <input type='text' placeholder='10' style={{ color: "#7D8D9D", textAlign: "center", paddingRight: "15px" ,fontSize:"15px",border:'0.2px solid grey',width:"18rem"}} /></div>
        </div>
        <button className={Reportscss.exportbtn} style={{marginTop:"2%"}} onClick={getReport}>Get Report<BsArrowRight/></button>

  </div>
  <MostStockTable/>
      </>
    }
    
    return (
        <div>
            <div className='backgroundcontainer'>
                <div className='headingbaronaction'>
                    <div className='toptableheading'>
                        <div className='subtoptableheadingone'>
                            <div>Reports</div>
                        </div>
                        <div className='subtoptableheadingone'>
                            <span>Reports</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Sales Report By Most in stock</span>
                        </div>
                    </div>
                </div>
            
                {RenderPage}

            </div>

        </div>
    )
}

export default MostStock