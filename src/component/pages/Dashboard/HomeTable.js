import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import AmazonLogo from "./amazo.png";
import sears from "./searspng.png";
import ebay from "./ebay.png";
import wish from "./wish.png";
import WalmartLogo from "./walmar.png";
import Newegg from "./newegg.png";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { sear } from "../../images/Searslogotable.jpg";

function createData(
  sn,
  salesChannel,
  orderToday,
  RevenueToday,
  Order30days,
  Revenue30day
) {
  return {
    sn,
    salesChannel,
    orderToday,
    RevenueToday,
    Order30days,
    Revenue30day,
  };
}
const rows = [
  createData(1, AmazonLogo, 33, "45", 200, "49"),
  createData(2, WalmartLogo, 24, "145", 200, "149"),
  createData(2, ebay, 24, "145", 200, "149"),
  createData(2, sears, 24, "145", 200, "149"),
  createData(2, wish, 24, "145", 200, "149"),
  createData(2, Newegg, 24, "145", 200, "149"),
];

const BoxHeading = styled(Box)`font: normal normal 600 18px/13px Poppins;
letter-spacing: 0px;display:flex;justify-content:space-between;height: 6vh;margin-right:10px
color: #FFFFFF;width:80%`;
const TableRows = styled(TableRow)`
  & th {
    font: normal normal normal 12px/12px Poppins;
    background-color: #f6f6f6;
    border: none;
  }
`;
const TableRows1 = styled(TableRow)`
  & td {
    font: normal normal normal 12px/12px Poppins;
    color: #282c45;
    border: none;
  }
`;
const TableHead1 = styled(TableHead)`
  background-color: #f6f6f6;
`;
const TableBody1 = styled(TableBody)`
  & tr {
    border: none;
  }
`;

const HomeFooterTable = () => {
  const [newRows, setRows] = useState(rows);
  const [order, setOrder] = useState("ASC");
  const sortingASC = (col) => {
    if (order === "ASC") {
      const sortedRows = [...newRows].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      console.log(sortedRows);
      setRows(sortedRows);
      setOrder("DSC");
    }
  };
  const sortingDSC = (col) => {
    if (order === "DSC") {
      const sortedRows = [...newRows].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setRows(sortedRows);
      setOrder("ASC");
    }
  };

  return (
    <>
      <BoxHeading>
        <Box style={{ marginTop: "15px" }}>Sales Breakdown</Box>
        <Box style={{ color: "green" }}>246K</Box>
      </BoxHeading>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "none", overflowX: "hidden", width: "82%" }}
      >
        <Table aria-label="simple table">
          <TableHead1>
            <TableRows>
              <TableCell sx={{ minWidth: 0 }}>
                <Box style={{ display: "flex" }}>
                  <Box style={{ paddingTop: "7px" }}>Sales channel</Box>
                  <Box
                    style={{
                      marginLeft: "8px",
                      borderRadius: "3px",
                      width: "14px",
                      textAlign: "center",
                      paddingBottom: "4px",
                    }}
                  >
                    <IoIosArrowUp /> <br></br>
                    <IoIosArrowDown />
                  </Box>
                </Box>
              </TableCell>
              <TableCell sx={{}}>
                <Box style={{ display: "flex" }}>
                  <Box style={{ paddingTop: "7px" }}>Orders Today</Box>
                  <Box
                    style={{
                      marginLeft: "8px",
                      borderRadius: "3px",
                      width: "14px",
                      textAlign: "center",
                      paddingBottom: "4px",
                    }}
                  >
                    <IoIosArrowUp /> <br></br>
                    <IoIosArrowDown />
                  </Box>
                </Box>
              </TableCell>
              <TableCell sx={{}}>
                <Box style={{ display: "flex" }}>
                  <Box style={{ paddingTop: "7px" }}>Revenue Today</Box>
                  <Box
                    style={{
                      marginLeft: "8px",
                      borderRadius: "3px",
                      width: "14px",
                      textAlign: "center",
                      paddingBottom: "4px",
                    }}
                  >
                    <IoIosArrowUp /> <br></br>
                    <IoIosArrowDown />
                  </Box>
                </Box>
              </TableCell>

              <TableCell sx={{}}>
                <Box style={{ display: "flex" }}>
                  <Box style={{ paddingTop: "7px" }}>Order 30 day</Box>
                  <Box
                    style={{
                      marginLeft: "8px",
                      borderRadius: "3px",
                      width: "14px",
                      textAlign: "center",
                      paddingBottom: "4px",
                    }}
                  >
                    <IoIosArrowUp /> <br></br>
                    <IoIosArrowDown />
                  </Box>
                </Box>
              </TableCell>

              <TableCell sx={{}}>
                <Box style={{ display: "flex" }}>
                  <Box style={{ paddingTop: "7px" }}>Revenue 30 day</Box>
                  <Box
                    style={{
                      marginLeft: "8px",
                      borderRadius: "3px",
                      width: "14px",
                      textAlign: "center",
                      paddingBottom: "4px",
                    }}
                  >
                    <IoIosArrowUp /> <br></br>
                    <IoIosArrowDown />
                  </Box>
                </Box>
              </TableCell>
            </TableRows>
          </TableHead1>
          <TableBody1>
            {rows.map((row, i) => (
              <TableRows1
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  <img
                    style={{ width: "150px", height: "35px" }}
                    src={row.salesChannel}
                  />
                </TableCell>
                <TableCell align="left">{row.orderToday}</TableCell>
                <TableCell align="left">{row.RevenueToday}</TableCell>
                <TableCell align="left">{row.Order30days}</TableCell>
                <TableCell align="left">{row.Order30days}</TableCell>
              </TableRows1>
            ))}
          </TableBody1>
        </Table>
        <div className="paginationCont" style={{ left: "79%" }}>
          <Stack spacing={2}>
            <Pagination count={5} shape="rounded" />
          </Stack>
        </div>
      </TableContainer>
    </>
  );
};
export default HomeFooterTable;
