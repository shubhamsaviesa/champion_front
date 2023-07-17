import React, { useState } from 'react';
import { Button, styled, Box } from '@mui/material'
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { BiExport } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import SelectChannelPopup from './SelectChannelPopup';


const Dialog1 = styled(Dialog)`& div > div{left:2%;border-radius:20px}`
const Box2 = styled(Box)`width:30vw;height:12vh;text-align:center;margin:20px`
const Box3 = styled(Box)`width:30vw;height:15vh;text-align:center;margin:20px;& button{margin-right:15px;width:6vw;margin-top:10%}`
const Box4 = styled(Box)`width:30vw;height:6vh;text-align:center;margin:20px;& button{text-transform:capitalize;width:6vw;background:#13A74B}`
const Typography1 = styled(Typography)`text-align: center;width:35vw;height:5vh;margin-top:10px;
font: normal normal 600 20px/35px Poppins;
letter-spacing: 0px;
color: #282C45;`

const Typography2 = styled(Typography)`text-align: center;width:35vw;height:5vh;margin-top:50px;
font: normal normal 600 20px/35px Poppins;
letter-spacing: 0px;
color: #282C45;`

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
    const [showConfirm, setShowConfirm] = useState(true)
    const Navigation = useNavigate()

    const handleClose = () => {
        onClose(selectedValue);
    };
    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog1 onClose={handleClose} open={open}>

            {showConfirm ?
                <Box>
                    <Typography1>Do you want to export listings to marketplace?</Typography1>
                    <Box3>
                        <Button variant="contained" style={{ color: "#282C45", position: "relative", left: "18px" }} onClick={() => { Navigation('/') }}>Skip</Button>
                        <Button style={{ position: "relative", left: "25px" }} onClick={() => { setShowConfirm(!showConfirm) }} variant="contained" color="success">yes</Button>
                    </Box3>
                </Box> :
                <SelectChannelPopup />
            }

        </Dialog1>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function ExportListing() {
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

            <span onClick={handleClickOpen}>Export Listing <BiExport size={25} /></span>
            <SimpleDialog
                // selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}
