import * as React from 'react';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Success from '../../images/success.png'
import '../../style/Popup/sucessPopup.css'
import { BiExport } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';

const Box2 = styled(Box)`display:flex;width:60vw;height:6vh;margin:10px 0;& div{width:14vw;height:4vh;font: normal normal normal 18px/33px Poppins;
letter-spacing: 0px;text-align:left;padding-left:64px;
color: #000000}`
const Box3 = styled(Box)`display:flex;& div{width:15vw;height:6vh;font: normal normal normal 18px/33px Poppins;
letter-spacing: 0px;text-align:center;padding:4px 0px 4px 0px;
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


export default function ExportListingTable({channelname}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()
  const [showSuccessPopup, setShowSuccessPopup] = React.useState(true)
  const [showDoyouPopup, setShowDoyouPopup] = React.useState(true)
  return (
    <div>
      <span onClick={handleOpen}>Export Listings <BiExport size={20} /></span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {
          showSuccessPopup ?
            <Box sx={style}>
              <Typography1>Select Channel</Typography1>

              <Box4>
                <Box style={{ height: "5vh", width: "15vw", display: "flex", position: "relative", top: "10px", left: "60px" }}>
                  <label className="switch" for="checkbox">
                    {/* <input type="checkbox" id="checkbox" /> */}
                    {/* <div className="slider round"></div> */}
                  </label> Channels
                </Box>
                <Box3>
                  <Box >Profit Percentage</Box>
                  <Box style={{ margin: "0 39px" }}>Profit Price</Box>
                  <Box>Shipping Price</Box>
                </Box3>
              </Box4>
              <Box4>
                <Box style={{ height: "5vh", width: "15vw", display: "flex", position: "relative", top: "10px", left: "60px" }}>
                  <label className="switch" for="checkbox">
                    <input type="checkbox" id="checkbox" />
                    <div className="slider round"></div>
                  </label> {channelname}
                </Box>
                <Box3>
                  <Box ><input style={InputStyle} type='text' /></Box>
                  <Box style={{ margin: "0 45px" }}><input style={InputStyle} type='text' /></Box>
                  <Box><input style={InputStyle} type='text' /></Box>
                </Box3>
              </Box4>

              <div style={{ width: "15vw", height: "12vh", margin: "auto", marginTop: "50px" }}>
                <Button1 variant="contained" style={{ color: "#282C45" }} disabled  >Cancel</Button1>
                <Button2 variant="contained" onClick={() => setShowSuccessPopup(false)} >Next</Button2>
              </div>
            </Box>
            :
            <>{
              showDoyouPopup ?
                <Box className='successPopupContainer'>
                  <h3 className='successPopupHeading'>Do you want to export listings to marketplace</h3>
                  <div className='successPopupBtnCont1'>
                    <Button className='btn' onClick={handleClose} variant="contained" style={{ background: "#E2E2E2", color: "#282C45", position: "relative", left: "10px" }}>No</Button>
                    <Button className='btn' onClick={() => { setShowDoyouPopup(false) }} variant="contained" >yes</Button>
                  </div>
                </Box>
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
