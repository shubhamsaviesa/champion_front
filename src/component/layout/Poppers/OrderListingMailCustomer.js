
import * as React from 'react';
import {Box, styled, Button, Typography } from '@mui/material';
import '../../style/Popup/orderpopup.css'
import MailIcon from "./image/Group 529.png"
import Modal from '@mui/material/Modal';
// import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
const style = {
  position: 'absolute',
  top: '20%',
  left: '13%',
  width: "70vw",
  height: "62vh",
  bgcolor: 'background.paper',
  borderRadius:3,
  border:"none",
  p: 3,
};

const Btn4=styled(Button)`background: #13A74B 0% 0% no-repeat padding-box;font: normal normal medium 19px/58px Poppins;
letter-spacing: 0px;color: #FFFFFF;border-radius: 10px;text-transform:capitalize;width:10vw;height:45px;&:hover{background:#13A74B}`

const BoxHeading=styled(Box)`display:flex;width:100%;height:6vh;justify-content:space-between`

const Typography1=styled(Typography)`color: #0E0B3A;font-size:20px;font-weight:600`

export default function MailToCustomer() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
     
      <span onClick={handleOpen}><img style={{width:"90px",height:"80px"}} src={MailIcon} alt='loading'/> </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{width:"35vw",height:"70vh",left:"30%",top:"13%"}}>
               <BoxHeading>
                <Typography1>Send Message To Customer</Typography1>
                <Box onClick={handleClose} style={{cursor:"pointer",marginLeft: "0px", height: "31px",width:"0px",paddingTop: "3px",marginTop:"-27px",borderRadius:"10px"}}>  </Box>
              </BoxHeading> 
             <Box className='deliveryForm' style={{left:"0",height:"55vh"}}>
                        <div style={{display:"flex",marginTop:"-15px",flexDirection:"column",alignItems:"center"}}>
                          <div style={{display:"flex"}}>
 <div className='infoInput'  style={{width:'100%'}}>
                                <label>From</label> <br></br>
                                <input type='text' style={{width:"99%"}}/>
                            </div>
                            <div className='infoInput' style={{width:'100%'}}>
                                <label>To</label> <br></br>
                                <input type='text' style={{width:"99%"}}/>
                            </div>
                          </div>
                           
                            <div className='infoInput' style={{width:'100%'}}>
                                <label>Subject</label> <br></br>
                                <input type='text' style={{width:"99%"}}/>
                            </div>

                            <div className='infoInput' style={{width:'100%',height:"16.5vh"}}>
                                <label>Message</label> <br></br>
                                <textarea style={{width:"99%",height:"10vh",background: "#F6F7F8 0% 0% no-repeat padding-box",border:"none"}}/>
                            </div>
                        </div>
                <div style={{display:"flex",justifyContent:"end",width:"100%",marginBottom:"10px"}}>
                     <Btn4 onClick={handleClose}>Send</Btn4>
                 </div>
            </Box>
        </Box>
      </Modal>
    </div>
  );
}
