import React, { useState, useContext,useEffect } from 'react'
import '../../../style/Channels/connectpage.css'
import { Button, styled } from "@mui/material"
import Amazon_icon from '../../../images/channel/Amazon_icon.png'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import UsPsTable from '../../Tables/Channel/UsPsTable'
import amazon1 from '../../../images/channel/usps.png'
import ChannelTable from '../../../style/Channels/ChannelTable.module.css'
import { DataContext } from '../../../context/DataProvider'
import { useDispatch, useSelector } from 'react-redux'
import { InsertUspsData } from '../../../../rtk/features/Marketplace/UspsSlice'
import { toast } from 'react-toastify';
import _ from 'lodash'

const Btn = styled(Button)`font: normal normal normal 15px Poppins;background: #E2E2E2 0% 0% no-repeat padding-box;
letter-spacing: 0px;text-transform: capitalize;
color: #282C45;margin-right:20px;width:8vw;height:5.5vh; &:hover{background-color:#E2E2E2}`
const Btn1 = styled(Button)`font: normal normal normal 15px Poppins;background: #13A74B 0% 0% no-repeat padding-box;
letter-spacing: 0px;text-transform: capitalize;width:8vw;height:5.5vh;
color: #FFFFFF; &:hover{background-color:#13A74B}`

const UspsConnect = () => {
  const initialValues = { Uspsid: "", Uspspassword: "" }
  const Navigation = useNavigate()
  const [showTable, setShowTable] = useState(true)
  const [formValues, setFormValues] = useState(initialValues);
  const { sidenavbar } = useContext(DataContext)
  const usps = useSelector(state => state.usps)
  const dispatch = useDispatch()
  console.log("usps", usps)

  const handleUspsInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  useEffect(() => {
    if (!_.isEmpty(usps.UspsData)) {
        if (usps.UspsData.status == "succes") {
            toast.success(' Connected !');
        } else {
            toast.warn(' Wrong Cradentials !');
        }
    }
}, [usps.UspsData]);  


  const handleConnect = (e) => {
    e.preventDefault()
    dispatch(InsertUspsData(formValues))
    // Navigation('/Shipment') 
  }


  return (
    <>
      {
        showTable ?
          <div>
            <div className={sidenavbar ? 'headingbar' : 'headingbar2'}>
              <div className='toptableheading'>
                <div style={{ position: "relative", left: "2.5%", fontSize: "15px" }}>
                  <div>Connect to Usps</div>
                </div>
                <div style={{ position: "relative", right: "4%", fontSize: "15px" }}>
                  <span>Channels</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Connect to Usps</span>
                </div>
              </div>
            </div>

            <div className={sidenavbar ? 'amazonConnectContainer' : 'amazonConnectContainer2'}>
              <div>
                <div className='amazonForm'>
                  <div className='heading'>You need an Usps Professional Seller account to sell on Usps</div>
                  <form>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>
                        <div>
                          <label htmlFor="text">Usps ID</label>
                        </div>
                        <input style={{ width: "100%" }} type="text"
                          name='Uspsid'
                          onChange={handleUspsInput}
                          value={formValues.Uspsid}
                        />
                        <div>
                          <label htmlFor="text">Usps Password</label>
                        </div>
                        <input style={{ width: "100%" }} type="text"
                          name='Uspspassword'
                          onChange={handleUspsInput}
                          value={formValues.Uspspassword}
                        />
                      </div>
                      <div>


                      </div>
                    </div>


                    <div style={{ width: "40vw", textAlign: "center", marginTop: "50px" }}>
                      <Btn onClick={() => Navigation(-1)}>Cancel</Btn>
                      <Btn1 type='submit' onClick={handleConnect}>Connect</Btn1>
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
                  <span>Channels</span><span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Connect to Usps</span><span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Usps Listings</span>
                </div>
              </div>
            </div>
            <UsPsTable />
          </div>
      }


    </>
  )
}

export default UspsConnect