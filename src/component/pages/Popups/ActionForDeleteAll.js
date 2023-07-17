import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { BsThreeDotsVertical } from "react-icons/bs";
// import DeleteListing from "./DeleteListing";
import DeleteListing from "./DeleteMapping";
import ViewDetails from "./ViewDetails";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { toast } from "react-toastify";

export default function ActionInTable({
  multipleIdDelete,
  compoNamemultidelete,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [itemDeleted, setItemDeleted] = React.useState(false);

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleClickAway = () => {
    setOpen(false);
    setItemDeleted(false);
  };

  const handleClose = () => {
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
              <Paper>
                <Typography
                  style={{
                    marging: "0px",
                  }}
                  component="span"
                  sx={{
                    p: 1,
                    cursor: "pointer",
                    font: "normal normal small 10px/25px Poppins",
                    letterSpacing: "0px",
                    lineHeight: "0px",
                    color: "#282C45",
                  }}
                >
                  {multipleIdDelete.length > 0 ? (
                    <DeleteListing
                      multipleIdDelete={multipleIdDelete}
                      compoNamemultidelete={compoNamemultidelete}
                      setOpen={setOpen}
                    />
                  ) : (
                    <div style={{ padding: "0.5rem" }}>
                      Please select one or more than one item for deletion.
                    </div>
                  )}
                </Typography>
              </Paper>
            </Fade>
          )}
        </Popper>

        <Grid container justifyContent="center">
          <Grid item>
            <div className="dropdown_menu">
              <h6
                className="dropdown_menu"
                style={{ paddingTop: "6px" }}
                onClick={handleClick("bottom-end")}
              >
                Action
              </h6>
            </div>
          </Grid>
        </Grid>
      </Box>
    </ClickAwayListener>
  );
}
