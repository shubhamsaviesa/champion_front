import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { RiArrowDropDownLine } from "react-icons/ri";
import ExportListing from "./ExportListing";
export default function GlobalActionPopper() {
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
                  font: "normal normal small 10px/25px Poppins",
                  letterSpacing: "0px",
                  color: "#282C45",
                }}
              >
                <ExportListing />{" "}
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>

      <Grid container justifyContent="center">
        <Grid item>
          <div
            className="dropdownn"
            style={{
              background: "#F1F1F1 padding-box",
              borderRadius: "23px",
              height: "33px",
              width: "90px",
              textAlign: "center",
              paddingTop: "10px",
              cursor: "pointer",
            }}
          >
            <span onClick={handleClick("bottom-end")}>Export Listing</span>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
