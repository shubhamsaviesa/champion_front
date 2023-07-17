import React,{useContext, useEffect,useState} from 'react'
// import "./setting.scss"
import { useNavigate } from "react-router-dom"
import { Box, styled, Typography, Button } from "@mui/material"
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { DataContext } from '../../context/DataProvider'
import {useDispatch,useSelector} from 'react-redux'
import {EmailDataPost} from '../../../rtk/features/Settings/emailSlice'

const Box1 = styled(Box)`background: #FFFFFF 0% 0% no-repeat padding-box;border: 1px solid #707070;width:29.3vw;padding:25px`
const Typography1 = styled(Typography)`font: normal normal medium 20px/13px Poppins;letter-spacing: 0px;color: #000000;`
const Typography2 = styled(Typography)`font: normal normal medium 20px/13px Poppins;letter-spacing: 0px;color: #87859D;margin:15px 10px`
const Btn3 = styled(Button)`background: #E2E2E2 0% 0% no-repeat padding-box;font: normal normal medium 19px/58px Poppins;margin-right:2%;
letter-spacing: 0px;color: #282C45;border-radius: 10px;text-transform:capitalize;width:10vw;height:45px;&:hover{background:#E2E2E2}`
const Btn4 = styled(Button)`background: #13A74B 0% 0% no-repeat padding-box;font: normal normal medium 19px/58px Poppins;
letter-spacing: 0px;color: #FFFFFF;border-radius: 10px;text-transform:capitalize;width:10vw;height:45px;&:hover{background:#13A74B}`
const EmailSettings = () => {
  const navigate = useNavigate()
  const { sidenavbar } = useContext(DataContext)
  const EmailDataResoponse = useSelector(state=>state.Emaill)
  const dispatch =useDispatch()


useEffect(()=>{
  
},dispatch)

  console.log("emailData ",EmailDataResoponse)

   const [confirmSub, setConfirmSub] = useState("");
  const [confirmMail, setConfirmMail] = useState("");
  const [cancelSub, setCancelSub] = useState("");
  const [cancelMail, setCancelMail] = useState("");
  const saveHandle = (e) => {
    e.preventDefault();
    console.log("confirmMail",confirmMail);
    console.log("confirmMail",confirmSub);
    console.log("confirmMail",cancelMail);
    console.log("confirmMail",cancelSub);
    dispatch(EmailDataPost({confirmsub:confirmSub,confirmmsg:confirmMail,cancelsub:cancelSub,cancelmsg:cancelMail}))
    // navigate("/");
  };

let rendertable;
if(sidenavbar){
rendertable = <>
<div style={{ position: "relative", top: "0%", left: "15.2%", width: "84vw", height: "115vh",backgroundColor:"#F9FAFC" }}>
     <div className='headingbaronaction' style={{marginTop:"1%"}}>
                        <div className='toptableheading'>
                            <div className='subtoptableheadingone'>
                                <div>Email Settings</div>
                            </div>
                            <div className='subtoptableheadingone'>
                                <span>Settings</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Email Settings</span>
                            </div>
                        </div>
                    </div>
      <Box style={{ display: "flex", justifyContent: "space-around",backgroundColor:"#F9FAFC",marginTop:"5%" }}>
        <Box1>
          <Typography1>Confirmation Mail Setting</Typography1>
          <Typography2>Subject</Typography2>
          <textarea className='emailsettingInput' style={{ backgroundColor:"#F9FAFC"}} onChange={(e) => setConfirmSub(e.target.value)}/>
          <Typography2>Custom Confirmation Email</Typography2>
          <textarea className='emailsettingInput' style={{ height: "35vh" ,backgroundColor:"#F9FAFC"}}  onChange={(e) => setConfirmMail(e.target.value)}/>
        </Box1>
        <Box1>
          <Typography1>Cancellation Mail Setting</Typography1>
          <Typography2>Subject</Typography2>
          <textarea style={{width:"500px"}} className='emailsettingInput' style={{ backgroundColor:"#d4dfff"}}   onChange={(e) => setCancelSub(e.target.value)}/>
          <Typography2>Cancellation Email</Typography2>
          <textarea className='emailsettingInput' style={{ height: "35vh" ,backgroundColor:"#F9FAFC"}} onChange={(e) => setCancelMail(e.target.value)}/>
        </Box1>

      </Box>

      <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "20px" }}>
        <Btn3>Cancel</Btn3>
        <Btn4 onClick={saveHandle}>Save</Btn4>
      </div>
    </div>
</>
}else{
rendertable = <>
<div style={{ position: "relative", top: "0%", left: "5%", width: "96vw", height: "115vh",backgroundColor:"#F9FAFC" }}>
     <div className='headingbaronaction2' style={{marginTop:"1%"}}>
                        <div className='toptableheading'>
                            <div className='subtoptableheadingone'>
                                <div>Email Settings</div>
                            </div>
                            <div className='subtoptableheadingone'>
                                <span>Settings</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Email Settings</span>
                            </div>
                        </div>
                    </div>
      <Box style={{ display: "flex", justifyContent: "space-around",backgroundColor:"#F9FAFC",marginTop:"5%" }}>
        <Box1>
          <Typography1>Confirmation Mail Setting</Typography1>
          <Typography2>Subject</Typography2>
          <textarea className='emailsettingInput' style={{ backgroundColor:"#F9FAFC"}}/>
          <Typography2>Custom Confirmation Email</Typography2>
          <textarea className='emailsettingInput' style={{ height: "35vh" ,backgroundColor:"#F9FAFC"}} />
        </Box1>

        <Box1>
          <Typography1>Confirmation Mail Setting</Typography1>
          <Typography2>Subject</Typography2>
          <textarea className='emailsettingInput' style={{ backgroundColor:"#F9FAFC"}}/>
          <Typography2>Cancellation Email</Typography2>
          <textarea className='emailsettingInput' style={{ height: "35vh" ,backgroundColor:"#F9FAFC"}} />
        </Box1>

      </Box>

      <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "20px" }}>
        <Btn3>Cancel</Btn3>
        <Btn4 onClick={saveHandle}>Save</Btn4>
      </div>
    </div>
</>
}



  return (
    <>
    {rendertable} 
    </>
  )
}

export default EmailSettings