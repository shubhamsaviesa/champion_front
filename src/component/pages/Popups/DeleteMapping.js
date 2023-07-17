import React, { useState, useEffect } from "react";
import WarningIcon from "../../images/waringicon.png";
import SuccessFullydeletedIcon from "../../images/success.png";
import { Button, styled, Box } from "@mui/material";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import {
  DeleteBulkImportData,
  DeleteBulkImportDataa,
} from "../../../rtk/features/Action/bulkImportSlice";

import { useSelector, useDispatch } from "react-redux";
import { theStore } from "../../../rtk/features/Action/testSlice";
import CircularProgress from "@mui/material/CircularProgress";
const Dialog1 = styled(Dialog)`
  & div > div {
    left: 2%;
    border-radius: 30px;
  }
`;
const Box2 = styled(Box)`
  width: 30vw;
  height: 12vh;
  text-align: center;
  margin: 20px;
`;
const Box3 = styled(Box)`
  width: 30vw;
  height: 6vh;
  text-align: center;
  margin: 20px;
  & button {
    margin-right: 20px;
    text-transform: capitalize;
    width: 6vw;
  }
`;
const Box4 = styled(Box)`
  width: 30vw;
  height: 6vh;
  text-align: center;
  margin: 20px;
  & button {
    text-transform: capitalize;
    width: 6vw;
    background: #13a74b;
  }
`;
const Typography1 = styled(Typography)`
  text-align: center;
  height: 5vh;
  margin-top: 10px;
  font: normal normal 600 20px/35px Poppins;
  letter-spacing: 0px;
  color: #282c45;
`;

const Typography2 = styled(Typography)`
  text-align: center;
  width: 32.4vw;
  height: 5vh;
  margin-top: 1px;
  font: normal normal 600 20px/35px Poppins;
  letter-spacing: 0px;
  color: #282c45;
`;

function SimpleDialog(row) {
  const {
    onClose,
    selectedValue,
    open,
    idForDelete,
    compoName,
    multipleIdDelete,
    compoNamemultidelete,
  } = row;
  const [showConfirm, setShowConfirm] = useState(true);
  const dataa = useSelector((state) => state.theStore.value.singleId);
  const dataaa = useSelector((state) => state.theStore.value.multipleId);
  const ProductCatalogData = useSelector((state) => state.ProductCatalog);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleDelete = (row) => {
    //single item delete bulk import
    console.log("called the singlebulkimport in deletemapping");
    if (compoName === "singleBulkImport") {
      try {
        dispatch(DeleteBulkImportData({ id: idForDelete }));
      } catch (e) {
        console.log(e);
      }
    }

    //multi-item delete bulk import
    if (compoNamemultidelete === "multiBulkImport") {
      console.log("multi-item delete multiBulkImport");
      try {
        if (multipleIdDelete.length > 0) {
          dispatch(DeleteBulkImportDataa({ id: multipleIdDelete }));
        } else {
          toast.warn("Please select atleast one book for delete!");
        }
      } catch (e) {
        console.log(e);
      }
    }
    setShowConfirm(false);
    onClose();
  };

  const okHandle = () => {
    onClose(false);
  };

  return (
    <Dialog1 onClose={handleClose} open={open}>
      {showConfirm ? (
        <Box>
          <Box2>
            <img src={WarningIcon} width="90px" alt="warning..." />
          </Box2>
          <Typography1>
            {dataa
              ? `Are you sure you want to delete the listing`
              : `Are you sure you want to delete the listings`}
          </Typography1>
          <Box3>
            <Button
              variant="contained"
              style={{ color: "#282C45", position: "relative", left: "10px" }}
              onClick={() => onClose(false)}
            >
              No
            </Button>
            <Button
              style={{ position: "relative", left: "10px" }}
              onClick={handleDelete}
              variant="contained"
              color="success"
            >
              yes
            </Button>
          </Box3>
        </Box>
      ) : (
        <Box>
          <Box2>
            <img src={SuccessFullydeletedIcon} width="110px" alt="warning..." />
          </Box2>{" "}
          <Typography2>Successfully Deleted</Typography2>
          <Box4>
            <Button variant="contained" color="success" onClick={okHandle}>
              Ok
            </Button>
          </Box4>
        </Box>
      )}
    </Dialog1>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.any,
};

export default function DeleteListing({
  idForDelete,
  compoName,
  multipleIdDelete,
  compoNamemultidelete,onClose
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    // setSelectedValue(value);
  };

  return (
    <div>
      <span onClick={() => handleClickOpen()}>Delete Listing</span>
      <SimpleDialog
        // selectedValue={selectedValue}
        idForDelete={idForDelete}
        compoName={compoName}
        compoNamemultidelete={compoNamemultidelete}
        multipleIdDelete={multipleIdDelete}
        open={open}
        onClose={handleClose}
        setOpen={setOpen}
      />
    </div>
  );
}
