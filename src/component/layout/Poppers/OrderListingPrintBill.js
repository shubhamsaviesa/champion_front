
import * as React from 'react';
import { Box, styled, Typography } from '@mui/material';
// import "./order.scss"
import PrintIcon from "./image/Group 528.png"
// import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CompanyLogo from "./image/Group 1184.png"
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const TableContainer1 = styled(TableContainer)`width:96%;padding:10px;height:44vh`
const TableBody1 = styled(TableBody)``
const TableRows1 = styled(TableRow)`border-bottom: 1px solid #E6E6E6;border-top: 1px solid #E6E6E6;& td{line-height:1;padding:10px;font: normal normal medium 16px/42px Poppins;
letter-spacing: 0px;font-size:13px;border-right: 1px solid #E6E6E6;
color: #43425D;}`
const style = {
   position: 'absolute',
   top: '20%',
   left: '13%',
   width: "70vw",
   height: "62vh",
   bgcolor: 'background.paper',
   borderRadius: 3,
   p: 1,
};

const BoxHeading = styled(Box)`display:flex;width:101%;height:11vh;justify-content:space-between`

const Typography1 = styled(Typography)`color: #43425D;font-size:20px;font-weight:600`

const Typography2 = styled(Typography)`color: #707070;font-size:14px;font-weight:600`

const BoxAddress = styled(Box)`width: 97%;height: 10vh;background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 0px 20px #0000001C;display:flex;justify-content:space-between;padding:7px;
border-radius: 15px;`

const Typography3 = styled(Typography)`font: normal normal 600 22px/13px Poppins;letter-spacing: 0px;color: #707070;margin-top:15px;margin-left:15px;width:95px`

const Typography4 = styled(Typography)`font: normal normal 600 17px/13px Poppins;margin:10px 0;
letter-spacing: 0px;color: #43425D;`

const Typography5 = styled(Typography)`font: normal normal normal 13px/27px Poppins;margin:-7px 0 -7px 2px;
letter-spacing: 0px;color: #707070;`

const Typography6 = styled(Typography)`font: normal normal normal 17px/35px Poppins;
letter-spacing: 0px;color: #43425D;`

const Typography7 = styled(Typography)`margin:-7px 0  -10px 3px;font: normal normal normal 12px/27px Poppins;`

const Typography8 = styled(Typography)`font: normal normal 600 15px/23px Poppins;color: #43425D;margin-left:37%;width:50vw`

const BoxFooter = styled(Box)`font: normal normal normal 12px/21px Poppins;position:absolute;top:585px;
letter-spacing: 0px;color: #43425D;`

export default function PrintBillInvoice() {
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   return (
      <div>

         <span onClick={handleOpen}><img style={{ width: "90px", height: "80px" }} src={PrintIcon} alt='loading' /> </span>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style} style={{ width: "55vw", height: "89vh", left: "20%", top: "2%" }}>

               <BoxHeading>
                  <Box style={{ display: "flex" }}>
                     <Box>
                        <img width="70px" src={CompanyLogo} alt='loading' />
                     </Box>
                     <Box style={{ marginTop: "7px", marginLeft: "10px" }}>
                        <Typography1>Your Company Name</Typography1>
                        <Typography2>Your Company Slogan</Typography2>
                     </Box>
                  </Box>
                  <Box>
                     <Box onClick={handleClose} style={{ cursor: "pointer", marginLeft: "80px", height: "31px", width: "0px", paddingTop: "3px", marginTop: "-10px", borderRadius: "10px" }}>  </Box>
                     <Typography3>INVOICE</Typography3>
                  </Box>


               </BoxHeading>

               <BoxAddress>

                  <Box>
                     <Typography4>Address</Typography4>
                     <Typography5>Town,Country, Postal Code   </Typography5>
                     <Typography5>
                        Phone:<span style={{ color: "#000000" }}>999999999,</span> Fax: <span style={{ color: "#000000" }}>0122345678</span>
                     </Typography5>
                  </Box>

                  <Box>
                     <Typography6>
                        INVOICE NO.[12345]
                     </Typography6>
                     <Typography6 style={{ marginTop: "-7px" }}> DATE: 10/07/2012</Typography6>
                  </Box>
               </BoxAddress>

               <BoxAddress style={{ height: "15.5vh", margin: "10px 0" }}>
                  <Box style={{ width: "27vw" }}>
                     <Typography4 style={{ color: "#000000" }}>Billing Address:</Typography4>
                     <Box style={{ font: "normal normal normal 14px/30px Poppins", color: "#000000" }}>
                        <Typography7><span style={{ fontWeight: "600" }}>Name:-</span>Filips J Bisbee </Typography7>
                        <Typography7><span style={{ fontWeight: "600" }}>Company:-</span>Auto Palace </Typography7>
                        <Typography7><span style={{ fontWeight: "600" }}>Address:-</span>2389 Little street streetsboro 2345 </Typography7>
                        <Typography7><span style={{ fontWeight: "600" }}>Town,Country Postal Code:-</span>123456 </Typography7>
                        <Typography7><span style={{ fontWeight: "600" }}>Phone:-</span>3330456789</Typography7>
                     </Box>
                  </Box>

                  <Box style={{ width: "24vw" }}>
                     <Typography4 style={{ color: "#000000" }}>Delivery Address:</Typography4>
                     <Box style={{ font: "normal normal normal 14px/30px Poppins", color: "#000000" }}>
                        <Typography7><span style={{ fontWeight: "600" }}>Name:-</span>Filips J Bisbee </Typography7>
                        <Typography7><span style={{ fontWeight: "600" }}>Company:-</span>Auto Palace </Typography7>
                        <Typography7><span style={{ fontWeight: "600" }}>Address:-</span>2389 Little street streetsboro 2345 </Typography7>
                        <Typography7><span style={{ fontWeight: "600" }}>Town,Country Postal Code:-</span>123456 </Typography7>
                        <Typography7><span style={{ fontWeight: "600" }}>Phone:-</span>3330456789</Typography7>
                     </Box>
                  </Box>
               </BoxAddress>
               <TableContainer1 component={Paper}>
                  <Typography style={{ font: "normal normal medium 17px/13px Poppins", color: "#43425D" }}>Comments or Special Instructions :</Typography>
                  <Table aria-label="simple table" >
                     <TableBody1>
                        <TableRows1>
                           <TableCell >SALES PERSON</TableCell>
                           <TableCell >P.O.NUMBER</TableCell>
                           <TableCell >SENT DATE</TableCell>
                           <TableCell >SENT VIA</TableCell>
                           <TableCell >F.O.B.POINT</TableCell>
                           <TableCell style={{ borderRight: "none" }}>TERMS</TableCell>
                        </TableRows1>
                        <TableRows1>
                           <TableCell >-</TableCell>
                           <TableCell >-</TableCell>
                           <TableCell >-</TableCell>
                           <TableCell >-</TableCell>
                           <TableCell >-</TableCell>
                           <TableCell style={{ borderRight: "none" }}>Due on reciept</TableCell>
                        </TableRows1>

                     </TableBody1>
                  </Table>
                  <br></br>
                  <Table aria-label="simple table" >
                     <TableBody1>
                        <TableRows1>
                           <TableCell >QUANTITY</TableCell>
                           <TableCell >DESCRIPTION</TableCell>
                           <TableCell >UNIT PRICE</TableCell>
                           <TableCell style={{ borderRight: "none" }} >AMOUNT</TableCell>
                        </TableRows1>
                        <TableRows1>
                           <TableCell ></TableCell>
                           <TableCell ></TableCell>
                           <TableCell ></TableCell>
                           <TableCell style={{ borderRight: "none" }}></TableCell>
                        </TableRows1>
                        <TableRows1>
                           <TableCell ></TableCell>
                           <TableCell ></TableCell>
                           <TableCell ></TableCell>
                           <TableCell style={{ borderRight: "none" }}></TableCell>
                        </TableRows1>
                     </TableBody1>
                  </Table>
                  <Box style={{ marginLeft: "68%", width: "32%", position: "relative", border: "none" }} >
                     <Table>
                        <TableRows1>
                           <TableCell style={{ lineHeight: "0", paddingLeft: "4px", width: "5vw" }} > SUBTOTAL </TableCell>
                           <TableCell style={{ borderRight: "none" }}></TableCell>
                        </TableRows1>
                        <TableRows1>
                           <TableCell style={{ lineHeight: "0", paddingLeft: "4px", width: "5vw" }}> SALES TAX </TableCell>
                           <TableCell style={{ borderRight: "none" }}></TableCell>
                        </TableRows1>
                        <TableRows1>
                           <TableCell style={{ lineHeight: "0", paddingLeft: "4px", width: "5vw" }}> P&P </TableCell>
                           <TableCell style={{ borderRight: "none" }}></TableCell>
                        </TableRows1>
                        <TableRows1>
                           <TableCell style={{ width: "5vw", paddingLeft: "4px" }}>TOTAL DUE</TableCell>
                           <TableCell style={{ borderRight: "none" }}></TableCell>
                        </TableRows1>
                     </Table>
                  </Box>
                  <BoxFooter>
                     Make all Cheques Payble to <span>[Company Name]</span> <br></br>
                     If you have any questions concerning this invoice. contact <span>[Name,Phone Number,Email]</span>
                     <Typography8>THANK YOU FOR YOUR BUSINESS!</Typography8>
                  </BoxFooter>
               </TableContainer1>
            </Box>
         </Modal>
      </div>
   );
}
