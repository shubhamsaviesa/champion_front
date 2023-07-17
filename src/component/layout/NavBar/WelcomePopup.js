import React, { useEffect} from 'react';
import { Button, styled, Box } from '@mui/material'
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
const Dialog1 = styled(Dialog)`& div > div{left:2%;border-radius:20px;padding:10px;width:30vw;overflow-x:hidden}`
const Box3 = styled(Box)`width:30vw;height:7vh;
& button{height:6vh;width:9vw;font-size:13px;position:relative;left:33%;background-color:#13A74B;
 &:hover{background-color:#13A74B;border-radius:50px}}`

const Typography1 = styled(Typography)`text-align: center;width:30vw;height:7vh;
font: normal normal 600 22px/35px Poppins;letter-spacing: 0px;color: #282C45;`

const Typography2 = styled(Typography)`text-align: center;width:30vw;height:5vh;
font: normal normal normal 21px/35px  Poppins;
letter-spacing: 0px;
color: #282C45;`

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog1 onClose={handleClose} open={open}>
      <Box>
        <Box onClick={handleClose} style={{ cursor: "pointer", position: "relative", left: "90%", top: "-21px" }}>  </Box>
        <Typography1>Welcome to Champion Lister </Typography1>
        <Typography2 >Easily connect to various channels</Typography2>
        <Typography2 style={{ marginTop: "-10px" }}>and start selling your Products</Typography2>
        <Box3>
          <Button onClick={handleClose} variant="contained" >Get started</Button>
        </Box3>
      </Box>
    </Dialog1>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,

};

export default function WelcomePopup({ changePopup }) {
  const [open, setOpen] = React.useState(false);

 

  useEffect(() => { setOpen(true) }, [])

  const handleClose = (value) => {
    setOpen(false);

  };

  return (
    <div>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        changePopup={changePopup}
      />
    </div>
  );
}
