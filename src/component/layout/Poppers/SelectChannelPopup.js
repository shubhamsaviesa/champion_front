
import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material';
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Box2 = styled(Box)`display:flex;width:80vw;height:5vh;margin-bottom:-13px;& div{width:17vw;height:4vh;font: normal normal normal 18px/33px Poppins;
letter-spacing: 0px;text-align:left;padding-left:44px;
color: #000000}`
const Box3 = styled(Box)`display:flex;width:80vw;height:6.5vh;background: #FFFFFF 0% 0% no-repeat padding-box; margin:10px 0;padding-left:20px;
border-radius: 10px;& div{width:19vw;height:6vh;font: normal normal normal 18px/33px Poppins;
letter-spacing: 0px;text-align:left;padding:4px 0px 4px 0px;display:flex;
color: #000000}`
const Typography1 = styled(Typography)`font: normal normal bold 20px/38px Poppins;letter-spacing: 0px;color: #000000;height:5vh`
const Button1 = styled(Button)`text-transform:capitalize;margin-right:4%;color:#282C45;font: normal normal medium 15px/58px Poppins;background: #E2E2E2 0% 0% no-repeat padding-box;
border-radius: 10px;width:6vw;&:hover{background:#FFFFFF}`
const Button2 = styled(Button)`text-transform:capitalize;color:#FFFFFF;font: normal normal medium 15px/58px Poppins;background: #13A74B 0% 0% no-repeat padding-box;
border-radius: 10px;width:6vw; &:hover{background:#13A74B}`
const Circle = styled(Box)`border-radius:10px;border: 4px solid #13A74B;margin-right:10px;margin-top:6px`
const CircleGray = styled(Box)`border-radius:10px;border: 4px solid #707070;margin-right:10px;margin-top:6px`


const InputStyle = {
    background: "white 0% 0% no-repeat padding-box",
    border: "1px solid #E2E2E2", height: "5vh", width: "15vw",
    borderRadius: "8px",
}


export default function SelectChannelPopup(props) {
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        /* navigate('/invetoryListings') */
    };

    const [success, setSuccess] = React.useState(true)
    const [showDoyou, setShowDoyou] = React.useState(true)
    const [loader, setLoader] = React.useState(true)

    //selectedchannelname
    const channelName = []
    const [walmartName, setWalmartName] = useState(false)
    const [alibrisName, setAlibrisName] = useState(false)
    const [AbebooksName, setAbebooksName] = useState(false)
    const [eCampName, setECampName] = useState(false)
    const [valoreName, setValoreName] = useState(false)
    const [bibName, setBibName] = useState(false)
    const [eBayName, setEBayName] = useState(false)
    const [amacaName, setAmacaName] = useState(false)
    const [amacoName, setAmacoName] = useState(false)

    //for exporting channelnames and itemsids
    const nextHandle = async () => {
        if (walmartName) {
            channelName.push("Walmart")
        }

        if (alibrisName) {
            channelName.push("Alibris")
        }

        if (AbebooksName) {
            channelName.push("AbeBooks")
        }

        if (eCampName) {
            channelName.push("eCampus")
        }

        if (valoreName) {
            channelName.push("ValoreBooks")
        }

        if (bibName) {
            channelName.push("Biblio")
        }

        if (eBayName) {
            channelName.push("eBay")
        }

        if (amacaName) {
            channelName.push("Amazon.Ca")
        }

        if (amacoName) {
            channelName.push("Amazon.com")
        }

    }

    //for circle change
    const [walCircle, setWalCircle] = useState(true)
    const [abeCircle, setAbeCircle] = useState(true)
    const [aliCircle, setAliCircle] = useState(true)
    const [eCaCircle, setECaCircle] = useState(true)
    const [valoCircle, setValoCircle] = useState(true)
    const [bibCircle, setBibCircle] = useState(true)
    const [ebayCircle, setEbayCircle] = useState(true)
    const [amacaCircle, setAmacaCircle] = useState(true)
    const [amacoCircle, setAmacoCircle] = useState(true)

    return (
        <div>
            <Typography1>Select Channel</Typography1>
            <Box2>
                <Box>Channels</Box>
                <Box>Profit Percentage</Box>
                <Box>Profit Price</Box>
                <Box>Shipping Price</Box>
            </Box2>
            <Box3>
                <Box style={{ paddingTop: "8px" }}>
                    {
                        walCircle ? <CircleGray onClick={() => { setWalCircle(!walCircle); setWalmartName(true) }} style={{ width: "12px", height: "12px", padding: "0" }}></CircleGray> :
                            <Circle onClick={() => { setWalCircle(!walCircle); setWalmartName(false) }} style={{ width: "12px", height: "12px", padding: "0" }}></Circle>
                    }
                    Channels
                </Box>
                <Box ><input style={InputStyle} type='text' /></Box>
                <Box><input style={InputStyle} type='text' /></Box>
                <Box><input style={InputStyle} type='text' /></Box>

            </Box3>

            <Box3>
                <Box style={{ paddingTop: "8px" }}>
                    {
                        abeCircle ? <CircleGray onClick={() => { setAbeCircle(!abeCircle); setAbebooksName(true) }} style={{ width: "12px", height: "12px", padding: "0" }}></CircleGray> :
                            <Circle onClick={() => { setAbeCircle(!abeCircle); setAbebooksName(false) }} style={{ width: "12px", height: "12px", padding: "0" }}></Circle>
                    }

                    Walmart
                </Box>
                <Box ><input style={InputStyle} type='text' /></Box>
                <Box><input style={InputStyle} type='text' /></Box>
                <Box><input style={InputStyle} type='text' /></Box>
            </Box3>

            <Box3>
                <Box style={{ paddingTop: "8px" }}>
                    {
                        aliCircle ? <CircleGray onClick={() => { setAliCircle(!aliCircle); setAlibrisName(true) }} style={{ width: "12px", height: "12px", padding: "0" }}></CircleGray> :
                            <Circle onClick={() => { setAliCircle(!aliCircle); setAlibrisName(false) }} style={{ width: "12px", height: "12px", padding: "0" }}></Circle>
                    }
                    Amazon
                </Box>
                <Box ><input style={InputStyle} type='text' /></Box>
                <Box><input style={InputStyle} type='text' /></Box>
                <Box><input style={InputStyle} type='text' /></Box>
            </Box3>

            <Box3>
                <Box style={{ paddingTop: "8px" }}>
                    {
                        eCaCircle ? <CircleGray onClick={() => { setECaCircle(!eCaCircle); setECampName(true) }} style={{ width: "12px", height: "12px", padding: "0" }}></CircleGray> :
                            <Circle onClick={() => { setECaCircle(!eCaCircle); setECampName(false) }} style={{ width: "12px", height: "12px", padding: "0" }}></Circle>
                    }
                    Newegg
                </Box>
                <Box ><input style={InputStyle} type='text' /></Box>
                <Box><input style={InputStyle} type='text' /></Box>
                <Box><input style={InputStyle} type='text' /></Box>
            </Box3>

            <Box3>
                <Box style={{ paddingTop: "8px" }}>
                    {
                        valoCircle ? <CircleGray onClick={() => { setValoCircle(!valoCircle); setValoreName(true) }} style={{ width: "12px", height: "12px", padding: "0" }}></CircleGray> :
                            <Circle onClick={() => { setValoCircle(!valoCircle); setValoreName(false) }} style={{ width: "12px", height: "12px", padding: "0" }}></Circle>
                    }
                    eBay
                </Box>
                <Box ><input style={InputStyle} type='text' /></Box>
                <Box><input style={InputStyle} type='text' /></Box>
                <Box><input style={InputStyle} type='text' /></Box>
            </Box3>

            <Box3>
                <Box style={{ paddingTop: "8px" }}>
                    {
                        bibCircle ? <CircleGray onClick={() => { setBibCircle(!bibCircle); setBibName(true) }} style={{ width: "12px", height: "12px", padding: "0" }}></CircleGray> :
                            <Circle onClick={() => { setBibCircle(!bibCircle); setBibName(false) }} style={{ width: "12px", height: "12px", padding: "0" }}></Circle>
                    }
                    Sears
                </Box>
                <Box ><input style={InputStyle} type='text' /></Box>
                <Box><input style={InputStyle} type='text' /></Box>
                <Box><input style={InputStyle} type='text' /></Box>
            </Box3>

            <Box3>
                <Box style={{ paddingTop: "8px" }}>
                    {
                        ebayCircle ? <CircleGray onClick={() => { setEbayCircle(!ebayCircle); setEBayName(true) }} style={{ width: "12px", height: "12px", padding: "0" }}></CircleGray> :
                            <Circle onClick={() => { setEbayCircle(!ebayCircle); setEBayName(false) }} style={{ width: "12px", height: "12px", padding: "0" }}></Circle>
                    }
                    Wish
                </Box>
                <Box ><input style={InputStyle} type='text' /></Box>
                <Box><input style={InputStyle} type='text' /></Box>
                <Box><input style={InputStyle} type='text' /></Box>
            </Box3>

            <div style={{ width: "15vw", height: "12vh", margin: "auto", marginTop: "30px" }}>
                <Button1 variant="contained" onClick={handleClose} style={{ color: "#282C45" }}>Cancel</Button1>
                <Button2 variant="contained" onClick={nextHandle} > Next </Button2>
            </div>



        </div>
    );
}
