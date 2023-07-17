import React, { useState, useContext,useEffect} from 'react'
import '../../../style/Channels/connectpage.css'
import { Button, styled } from "@mui/material"
import Amazon_icon from '../../../images/channel/Amazon_icon.png'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import amazon1 from '../../../images/channel/bigc.png'
import ChannelTable from '../../../style/Channels/ChannelTable.module.css'
import BigCommerceTable from '../../Tables/Channel/BigCommerceTable'
import { DataContext } from '../../../context/DataProvider'
import { useSelector, useDispatch } from 'react-redux'
import { InsertBigcommerceData } from '../../../../rtk/features/Marketplace/BigcommerceSlice'
import { toast } from 'react-toastify';
import _ from 'lodash'

const Btn = styled(Button)`font: normal normal normal 15px Poppins;background: #E2E2E2 0% 0% no-repeat padding-box;
letter-spacing: 0px;text-transform: capitalize;
color: #282C45;margin-right:20px;width:8vw;height:5.5vh; &:hover{background-color:#E2E2E2}`
const Btn1 = styled(Button)`font: normal normal normal 15px Poppins;background: #13A74B 0% 0% no-repeat padding-box;
letter-spacing: 0px;text-transform: capitalize;width:8vw;height:5.5vh;
color: #FFFFFF; &:hover{background-color:#13A74B}`

const BigcommerceConnect = () => {
  const initialValues = { nickname: "", walmartid: "", walmartsecret: "" }
  const Navigation = useNavigate()
  const [showTable, setShowTable] = useState(true)
  const [formValues, setFormValues] = useState(initialValues);
  const { sidenavbar } = useContext(DataContext)
  const bigcommerce = useSelector(state => state.bigcommerce)
  const dispatch = useDispatch();

  console.log("bigcommerce",bigcommerce.BigcommerceData)

  const handleBigcommerceInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log("setformvalues", formValues)
  }

  useEffect(() => {
    if (!_.isEmpty(bigcommerce.BigcommerceData)) {
        if (bigcommerce.BigcommerceData.status == "succes") {
            toast.success(' Connected !');
        } else {
            toast.warn(' Wrong Cradentials !');
        }
    }
}, [bigcommerce.BigcommerceData]);


  const handleConnect = (e) => {
    e.preventDefault();
    dispatch(InsertBigcommerceData(formValues))
    // setShowTable(false)
  }
  
 
  return (
    <>
       {
        showTable ?
          <div>
            <div className={sidenavbar ?'headingbar' : 'headingbar2'}>
              <div className='toptableheading'>
                <div style={{ position: "relative", left: "2.5%", fontSize: "15px" }}>
                  <div>Connect to Bigcommerce</div>
                </div>
                <div style={{ position: "relative", right: "4%", fontSize: "15px" }}>
                  <span>Channels</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Connect to Bigcommerce</span>
                </div>
              </div>
            </div>
            <div className='amazonConnectContainer'>
              <div>
                <div className='amazonForm'>
                  <div className='heading'></div>
                  <form>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>
                      </div>
                    </div>
                    <div style={{ display: "flex", marginTop: "2%", marginBottom: "2%" }}>
                      <div><label>Connect Your Bigcommerce Account</label></div>
                      <div style={{ position: "relative", left: "48%" }}>
                        <label className="switch">
                          <input type="checkbox"
                            name='amazonenable'
                            style={{ width: "45px" }}
                            onChange={handleBigcommerceInput}
                            value={formValues.nickname}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                    <div style={{ width: "40vw", textAlign: "center", marginTop: "50px" }}>
                      <Btn onClick={() => Navigation(-1)}>Cancel</Btn>
                      <Btn1 type='submit' onClick={handleConnect} >Connect</Btn1>
                    </div>
                  </form>   <div style={{ width: "40vw", textAlign: "center", marginTop: "10px" }}>
                    <span style={{ font: "normal normal medium 22px/13px Poppins", color: "#87859D" }}>Dont't have an account?</span> <span style={{ font: "normal normal medium 22px/13px Poppins", color: "#59C180" }}> Register Now</span>
                  </div>
                </div>
              </div>
            </div>
          </div> :
          <div>
            <div className={ChannelTable.headingbar}>
              <div className={ChannelTable.toptableheading}>
                <div className={ChannelTable.headingOneImage}>
                  <div><img style={{ width: "70px", height: "35px" }} alt="loading..." src={amazon1} /></div>
                </div>
                <div className={ChannelTable.headingTwotext}>
                  <span>Channels</span><span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Connect to Big Commerce</span><span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Bigcommerce Listings</span>
                </div>
              </div>
            </div>
            <BigCommerceTable />
          </div>
      }
    </>
  )
}

export default BigcommerceConnect