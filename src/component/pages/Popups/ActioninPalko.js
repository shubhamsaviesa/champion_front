import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteListing from "./DeleteListing";
import ViewDetails from "./ViewDetails";
export default function ActioninPalko() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Box>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography
                sx={{
                  p: 1,
                  cursor: "pointer",
                  font: "normal normal medium 10px/25px Poppins",
                  letterSpacing: "0px",
                  color: "#282C45",
                }}
              >
                {" "}
                View Details
              </Typography>
              <Typography
                sx={{
                  p: 1,
                  cursor: "pointer",
                  font: "normal normal small 10px/25px Poppins",
                  letterSpacing: "0px",
                  color: "#282C45",
                }}
              >
                {" "}
                Delete Listing
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>

      <Grid container justifyContent="center">
        <Grid item>
          <span onClick={handleClick("bottom-end")}>Action</span>
        </Grid>
      </Grid>
    </Box>
  );
}
