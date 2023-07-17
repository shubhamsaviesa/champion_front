import * as React from 'react';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Success from '../../images/success.png'
import '../../style/Popup/sucessPopup.css'
import { BiExport } from 'react-icons/bi'
import { Navigate, useNavigate } from 'react-router-dom';

const Box2 = styled(Box)`display:flex;width:60vw;height:6vh;margin:10px 0;& div{width:14vw;height:4vh;font: normal normal normal 18px/33px Poppins;
letter-spacing: 0px;text-align:left;padding-left:64px;
color: #000000}`
const Box3 = styled(Box)`display:flex;& div{width:15vw;height:6vh;font: normal normal normal 18px/33px Poppins;
letter-spacing: 0px;text-align:left;padding:4px 0px 4px 0px;
color: #000000}`
const Box4 = styled(Box)`display:flex;width:67vw;height:6.5vh;background: #FFFFFF 0% 0% no-repeat padding-box;
margin:20px 0;
border-radius: 10px;`
const Typography1 = styled(Typography)`font: normal normal bold 20px/38px Poppins;letter-spacing: 0px;color: #000000;height:5vh;margin:30px 0 20px 20px`
const Button1 = styled(Button)`text-transform:capitalize;margin-right:4%;color:#282C45;font: normal normal medium 15px/58px Poppins;background: #E2E2E2 0% 0% no-repeat padding-box;
border-radius: 10px;width:6vw`
const Button2 = styled(Button)`text-transform:capitalize;color:#FFFFFF;font: normal normal medium 15px/58px Poppins;background: #13A74B 0% 0% no-repeat padding-box;
border-radius: 10px;width:6vw; &:hover{background:#13A74B}`
const Circle = styled(Box)`width:12px;height: 12px;border-radius:10px;border: 4px solid #13A74B;margin-right:10px;margin-top:4px`
const style = {
    position: 'absolute',
    top: '6%',
    left: '13%',
    bottom: "10%",
    width: "70vw",
    height: "82vh",
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: 3,
};
const InputStyle = {
    background: "#EBE9E9 ",
    border: "1px solid #E2E2E2", height: "5vh", width: "15vw", paddingLeft: "10px",
    borderRadius: "10px"
}


export default function CreateShippingPoper() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()
    const [showSuccessPopup, setShowSuccessPopup] = React.useState(true)
    const [showDoyouPopup, setShowDoyouPopup] = React.useState(true)
    return (
        <div>
            <span onClick={handleOpen}>CONTINUE </span>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {
                    showSuccessPopup ?
                  
  <div className='successPopupContainerListing'>
  <Box>
  <div className='successPopupImage'><img src={Success} width="110px" alt="warning..." /></div>
      <Typography1> Token ID Generated Successfully</Typography1>
      <Box3 style={{ marginLeft: "161px", margintop: "56px" }} >
          <button className='btn' onClick={() => setShowSuccessPopup(false)} variant="contained" >OK</button>
          
      </Box3>
  </Box></div>

                        :
                        <>{
                            showDoyouPopup ?
                            <div className='successPopupContainerListing'>
                                <Box>
                                    <Typography1>Do you want to export listings to marketplace?</Typography1>
                                    <Box3 style={{ marginLeft: "161px", margintop: "56px" }} >
                                        <Button variant="contained" style={{ color: "#282C45", backgroundColor: "#E2E2E2", position: "relative", left: "18px" }} onClick={() => { navigate('/dashboard') }}>Skip</Button>
                                        <Button style={{ position: "relative", left: "25px" }} onClick={() => navigate('/generatelable')} variant="contained" color="success">yes</Button>
                                    </Box3>
                                </Box></div>
                                :
                                <div className='successPopupContainer'>
                                    <div className='successPopupImage'><img src={Success} width="110px" alt="warning..." /></div>
                                    <h3 className='successPopupHeading'> Successfully exported to the marketplace </h3>
                                    <div className='successPopupBtnCont'>
                                        <button className='btn' onClick={() => navigate("/dashboard")} variant="contained" >OK</button>
                                    </div>
                                </div>
                        }
                        </>

                }
            </Modal>
        </div>
    );
}
