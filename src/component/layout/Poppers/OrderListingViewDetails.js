
import * as React from 'react';
import { Box, styled, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom"
import EditIcon from "./image/Group 530.png"
// import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Modal from '@mui/material/Modal';
import DeliveryEditInfo from './DeliveryInfoEdit';
import BillingEditInfo from './BillingInfoEdit';
import MailToCustomer from './OrderListingMailCustomer';
import PrintBillInvoice from './OrderListingPrintBill';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GrClose } from 'react-icons/gr'

function createData(sn, column1, column2) {
  return { sn, column1, column2 };
}
const rows = [
  createData(1, "Book Name", "ASF"),
  createData(2, "UPC", "1234"),
  createData(3, "Order Date", '12-12-22'),
  createData(4, "Payment Date", "12-12-22"),
  createData(4, "Order Quantity", "12-12-22"),
  createData(1, "order Price", "$123"),
  createData(2, "ISBN/ASIN/UPC", "1234"),
  createData(3, "Shiping Date", '12-12-22'),
  createData(4, "Shiping City", "XYZ"),

];
// ***
const style = {
  position: 'absolute',
  top: '20%',
  left: '13%',
  width: "70vw",
  height: "62vh",
  bgcolor: 'background.paper',
  borderRadius: 1,
  p: 3,

};

const BoxHeading = styled(Box)`display:flex;width:100%;height:10vh;justify-content:space-between`
const BoxIcon = styled(Box)`display:flex; position:relative;top:-19px;left:24px; & > div > img{width:90px;height:80px}`
const Typography1 = styled(Typography)`font: normal normal normal 18px/31px Poppins;color: #949494;`
const TableContainer1 = styled(TableContainer)`width:15vw;height:30vh;background: #FFFFFF:overflow-x:hidden;
border-radius: 10px;padding:10px;`

const TableBody1 = styled(TableBody)`height:10px`
const TableRows1 = styled(TableRow)`& td{padding:5px;
letter-spacing: 0px;font-size:12px;color: #414141;};height:10px`

export default function OrderListingViewDetails(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate()
  const editProduct_Handle = () => {
    navigate("/editProductOrderListing")
  }
  return (
    <>
      <div>
        <span onClick={handleOpen}>View Details</span>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <BoxHeading>
              <Box>
                <Typography1>Order ID - #12345</Typography1>
                <Typography1>Store Front - [ABC]</Typography1>
              </Box>
              <BoxIcon>
                <Box onClick={editProduct_Handle} style={{ cursor: "pointer" }}> <img src={EditIcon} alt='loading' /> </Box>
                <Box style={{ cursor: "pointer" }}> <MailToCustomer /> </Box>
                <Box style={{ cursor: "pointer" }}> <PrintBillInvoice /> </Box>
                <Box style={{ cursor: "pointer", marginLeft: "35px", padding: "5px", marginTop: "-6px" }}> <GrClose onClick={() => navigate(-1)} size={30} /> </Box>
              </BoxIcon>
            </BoxHeading>

            <Box style={{ display: "flex", justifyContent: "space-around" }}>
              <TableContainer1 >
                <Table>
                  <TableBody1>
                    {rows.map((row) => (
                      <TableRows1
                        style={{ height: "10px" }}
                        key={row.sn}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell style={{ borderRight: "1px solid #E6E6E6" }} align="left">{row.column1}</TableCell>
                        <TableCell align="left">{row.column2}</TableCell>
                      </TableRows1>
                    ))}
                  </TableBody1>
                </Table>
              </TableContainer1>
              <TableContainer1 style={{ height: "33vh" }} component={Paper}>
                <Table>

                  <TableBody1 style={{ height: "10px" }}>
                    <TableRows1>
                      <TableCell style={{ borderRight: "1px solid #E6E6E6" }} > Stock Total </TableCell>
                      <TableCell > 222 </TableCell>
                    </TableRows1>

                    <TableRows1>
                      <TableCell style={{ borderRight: "1px solid #E6E6E6" }} > Tax </TableCell>
                      <TableCell > 22 </TableCell>
                    </TableRows1>

                    <TableRows1>
                      <TableCell style={{ borderRight: "1px solid #E6E6E6" }} > Tax </TableCell>
                      <TableCell > 22222222 </TableCell>
                    </TableRows1>

                    <TableRows1>
                      <TableCell style={{ borderRight: "1px solid #E6E6E6" }} > Shiping Fee </TableCell>
                      <TableCell > 22</TableCell>
                    </TableRows1>

                    <TableRows1>
                      <TableCell style={{ borderRight: "1px solid #E6E6E6" }} >Discount </TableCell>
                      <TableCell > 22222222 </TableCell>
                    </TableRows1>

                    <TableRows1>
                      <TableCell style={{ borderRight: "1px solid #E6E6E6" }} > Other Fee </TableCell>
                      <TableCell > 222 </TableCell>
                    </TableRows1>

                    <TableRows1>
                      <TableCell style={{ borderRight: "1px solid #E6E6E6" }} > Total Price </TableCell>
                      <TableCell > 222 </TableCell>
                    </TableRows1>
                  </TableBody1>
                </Table>
              </TableContainer1>

              <TableContainer1 style={{ height: "20vh" }} component={Paper}>
                <Table aria-label="simple table" >

                  <TableBody1>
                    <TableRows1>
                      <TableCell style={{ borderRight: "1px solid #E6E6E6" }} >Delivery Info </TableCell>
                      <TableCell align='right' style={{ cursor: "pointer" }}> <DeliveryEditInfo /> </TableCell>
                    </TableRows1>

                    <TableRows1>
                      <TableCell style={{ borderRight: "1px solid #E6E6E6" }} > Deliver To </TableCell>
                      <TableCell > 22 </TableCell>
                    </TableRows1>

                    <TableRows1>
                      <TableCell style={{ borderRight: "1px solid #E6E6E6" }} > Phone Number </TableCell>
                      <TableCell > 22222222 </TableCell>
                    </TableRows1>

                    <TableRows1>
                      <TableCell style={{ borderRight: "1px solid #E6E6E6" }} > Delivery Address </TableCell>
                      <TableCell > 22</TableCell>
                    </TableRows1>


                  </TableBody1>
                </Table>
              </TableContainer1>

              <TableContainer1 style={{ height: "20vh" }} component={Paper}>
                <Table aria-label="simple table" >

                  <TableBody1>
                    <TableRows1 >
                      <TableCell style={{ borderRight: "1px solid #E6E6E6" }} >Billing Info </TableCell>
                      <TableCell align='right' style={{ cursor: "pointer" }} ><BillingEditInfo /> </TableCell>
                    </TableRows1>

                    <TableRows1>
                      <TableCell style={{ borderRight: "1px solid #E6E6E6" }} > Bill To </TableCell>
                      <TableCell > 22 </TableCell>
                    </TableRows1>

                    <TableRows1>
                      <TableCell style={{ borderRight: "1px solid #E6E6E6" }} > Phone Number </TableCell>
                      <TableCell > 22222222 </TableCell>
                    </TableRows1>

                    <TableRows1>
                      <TableCell style={{ borderRight: "1px solid #E6E6E6" }} >  Address on Bill </TableCell>
                      <TableCell > 22</TableCell>
                    </TableRows1>


                  </TableBody1>
                </Table>
              </TableContainer1>

            </Box>

          </Box>
        </Modal>

      </div>
    </>

  );
}
