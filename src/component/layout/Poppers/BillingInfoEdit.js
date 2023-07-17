
import * as React from 'react';
import { Box, styled, Button, Typography } from '@mui/material';
// import "./order.scss"
import EditIcon2 from "./image/Path 801.png"
// import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '20%',
  left: '13%',
  width: "70vw",
  height: "62vh",
  bgcolor: 'background.paper',
  borderRadius: 3,

  p: 3,

};
const Btn3 = styled(Button)`background: #E2E2E2 0% 0% no-repeat padding-box;font: normal normal medium 19px/58px Poppins;margin-right:2%;
letter-spacing: 0px;color: #282C45;border-radius: 10px;text-transform:capitalize;width:10vw;height:45px;&:hover{background:#E2E2E2}`

const Btn4 = styled(Button)`background: #13A74B 0% 0% no-repeat padding-box;font: normal normal medium 19px/58px Poppins;
letter-spacing: 0px;color: #FFFFFF;border-radius: 10px;text-transform:capitalize;width:10vw;height:45px;&:hover{background:#13A74B}`

const BoxHeading = styled(Box)`display:flex;width:100%;height:6vh;justify-content:space-between`

const Typography1 = styled(Typography)`color: #0E0B3A;font-size:20px;font-weight:600`

export default function BillingEditInfo() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>

      <span onClick={handleOpen}><img src={EditIcon2} alt="loading..." /></span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <BoxHeading>
            <Typography1>Billing To</Typography1>
            <Box onClick={handleClose} style={{ cursor: "pointer", marginLeft: "77px", height: "31px", width: "0px", paddingTop: "3px", marginTop: "-27px", borderRadius: "10px" }}>  </Box>
          </BoxHeading>
          <Box className='deliveryForm'>
            <div style={{ display: "flex", marginTop: "-15px" }}>
              <div className='infoInput'>
                <label>First Name</label> <br></br>
                <input type='text' />
              </div>
              <div className='infoInput'>
                <label>Last Name</label> <br></br>
                <input type='text' />
              </div>
              <div className='infoInput'>
                <label>Street/Area</label> <br></br>
                <input type='text' />
              </div>
            </div>


            <div style={{ display: "flex", marginTop: "-15px" }}>
              <div className='infoInput'>
                <label>City</label> <br></br>
                <select>
                  <option>Usa</option>
                  <option>India</option>
                </select>
              </div>

              <div className='infoInput'>
                <label>State</label> <br></br>
                <select>
                  <option>Usa</option>
                  <option>India</option>
                </select>
              </div>

              <div className='infoInput'>
                <label>Country</label> <br></br>
                <select>
                  <option>Usa</option>
                  <option>India</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", marginTop: "-15px" }}>
              <div className='infoInput'>
                <label>Postal Code</label> <br></br>
                <input type='number' />
              </div>
              <div className='infoInput'>
                <label>Phone Number</label> <br></br>
                <input type='text' />
              </div>
              <div className='infoInput'>
                <label>Email</label> <br></br>
                <input type='email' />
              </div>
            </div>

            <div style={{ display: "flex", marginTop: "-15px" }}>

              <div className='infoInput'>
                <label>Payment</label> <br></br>
                <select>
                  <option>Prepaid</option>
                  <option>Postpaid</option>
                </select>
              </div>
              <div className='infoInput'>
                <label>Due Date</label> <br></br>
                <input type='number' />
              </div>

            </div>
            <div style={{ display: "flex", justifyContent: "end", width: "98%", marginTop: "0px", marginBottom: "10px" }}>
              <Btn3 onClick={handleClose}>Cancel</Btn3>
              <Btn4>Save</Btn4>
            </div>
          </Box>


        </Box>
      </Modal>
    </div>
  );
}
