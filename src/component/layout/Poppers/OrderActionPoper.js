import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import OrderListingViewDetails from "./OrderListingViewDetails";

const ListStyle = {
  p: 1,
  cursor: "pointer",
  font: "normal normal medium 10px/25px Poppins",
  letterSpacing: "0px",
  color: "#282C45",
};

export default function OrderActionPopper(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const Navigation = useNavigate();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const [sendActionPopperData, setSendActionPopperData] = React.useState();
  const getData = (data) => {
    setSendActionPopperData(data);
    // console.log("log",data)
    console.log("action sendActionPopperData", sendActionPopperData);
    props.getData(sendActionPopperData);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper style={{ padding: "10px" }}>
                <Typography style={ListStyle}>
                  {" "}
                  <OrderListingViewDetails getData={getData} />
                </Typography>
                <Typography style={ListStyle}> In Process</Typography>
                <Typography style={ListStyle}> Complete</Typography>
                <Typography style={ListStyle}> Cancel</Typography>
                <Typography style={ListStyle}> </Typography>
                <Typography
                  style={ListStyle}
                  onClick={() => {
                    Navigation("/CreateShppingOrder");
                  }}
                >
                  {" "}
                  Create Shipping Order
                </Typography>
              </Paper>
            </Fade>
          )}
        </Popper>

        <Grid container justifyContent="center">
          <Grid item>
            <span onClick={handleClick("bottom-end")}>
              <BsThreeDotsVertical />
            </span>
          </Grid>
        </Grid>
      </Box>
    </ClickAwayListener>
  );
}
