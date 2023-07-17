import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteListing from "./DeleteMapping";
import ViewDetails from "./EditMapping";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { Link, useNavigate } from "react-router-dom";

export default function ActionInTable({ idForDelete, compoName, idForEdit }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    handleClose(); // close the popup
    // perform any other action needed after delete, such as updating the list of items
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
              <Paper>
                <Typography
                  component="span"
                  sx={{
                    p: 1,
                    cursor: "pointer",
                    font: "normal normal medium 10px/25px Poppins",
                    letterSpacing: "0px",
                    color: "#282C45",
                  }}
                >
                  <Link
                    to={`/editTemplate/${idForEdit}`}
                    style={{ textDecoration: "none", color: "#282C45" }}
                  >
                    View Details
                  </Link>{" "}
                </Typography>

                <Typography
                  style={{
                    padding: "0px",
                    margin: "0px",
                    textAlign: "center",
                  }}
                  component="span"
                  sx={{
                    p: 1,
                    cursor: "pointer",
                    font: "normal normal small 10px/25px Poppins",
                    letterSpacing: "0px",
                    color: "#282C45",
                  }}
                >
                  <DeleteListing
                    idForDelete={idForDelete}
                    compoName={compoName}
                    onDelete={handleDelete}
                  />
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
