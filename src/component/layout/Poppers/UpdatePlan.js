
import React, { useState } from 'react';
import { Box, Button, styled, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import ForwardIcon from "../../images/updateplan/Group 1144.png"
import BackwardIcon from "../../images/updateplan/Group 784.png"
import Arrow from "../../images/updateplan/arrow (6).png"
import GreenWrapper from "../../images/updateplan/freeplane.png"
import GreenTraingle from "../../images/updateplan/Path 1075.png"
import Bluewrapper from "../../images/updateplan/Group 1128.png"
import BlueTraingle from "../../images/updateplan/Path 10751.png"
import zIndex from '@mui/material/styles/zIndex';

const Btn1 = styled(Button)`background: #13A74B;font: normal normal 600 18px/33px Segoe UI;
letter-spacing: 0px;text-transform:capitalize;height:44px;width:8vw;margin-right:15px;
color: #FFFFFF;
border-radius: 10px; &:hover {
  background: #FFFFFF;
  Color:#040404;

}`

const Btn2 = styled(Button)`font: normal normal 600 18px/33px Segoe UI;height:44px;width:8vw;
letter-spacing: 0px;text-transform:capitalize;margin-right:8px;
color: #0E0B3A;
border-radius: 8px;`



const style = {
  position: 'absolute',
  top: '8%',
  left: '13%',
  width: "70vw",
  height: "80vh",
  bgcolor: 'tranprent',
  borderRadius: "10px",
  border: "none",
  display: "flex",
  boxShadow: 14,
  p: 3,
};

const Card1 = styled(Box)`background: #FFFFFF 0% 0% no-repeat padding-box;width:15vw;height:60vh;position:relative;
box-shadow:0px 0px 20px #0000001C;margin-top:2%`

const BoxWrapper = styled(Box)`position:absolute;background-size: contain;
background-repeat: no-repeat;width:100%;height:100%;font: normal normal normal 27px/65px Poppins;padding-left:20px;
letter-spacing: 0px;color: #FFFFFF;`

const BoxTriangle = styled(Box)`position:absolute;top:86%;left:21%;background-size: contain;
background-repeat: no-repeat;width:40%;height: 125px;`

const BoxText = styled(Box)`width:100%;text-align:center;height:10vh;position:absolute;top:45%`

const Typography1 = styled(Typography)`font: normal normal normal 25px/60px Poppins;letter-spacing: 0px;color: #808080`
const Typography2 = styled(Typography)`font: normal normal normal 13px/20px Poppins;letter-spacing: 0px;color: #808080`

const BoxLine = styled(Box)`width:86%;height:24px;border:1px solid #999999;border-radius:20px;position:relative;left:8%;top:-19px`

const LineDot = styled(Box)`border-left:1px solid #707070;height:70px;margin-left:11px`
const Dot = styled(Box)`width:25px;height:25px;border-radius:50%;background-color:#13A74B`
export default function UpdatePlan() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showPlans, setShowPlans] = useState(true)
  const AccountSetting_Handle = () => {
    setShowPlans(!showPlans)
  }

  const [showMore, setShowMore] = useState(true)
  const forwardHandle = () => {
    setShowMore(false)
  }

  const backwardHandle = () => {
    setShowMore(true)
  }

  return (
    <div>

      <div onClick={handleOpen}>Update Plan</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >



        <Box sx={style}>
          <Box style={{ position: "absolute", top: "45%",left:"-3px", zIndex: "1" }}> <img onClick={backwardHandle} width="60px" src={BackwardIcon} alt='loading...' /> </Box>
          <Box style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ background: "white", display: "flex", height: "6vh", alignItems: "center", borderRadius: "10px" }}>
                <div className='div1'>{showPlans ? <Btn1>Monthly Plans</Btn1> : <Btn2 onClick={AccountSetting_Handle}>Monthly Plans</Btn2>}</div>
                <div className='div2'>{showPlans ? <Btn2 onClick={AccountSetting_Handle}>Yearly Plans</Btn2> : <Btn1>Yearly Plans</Btn1>}</div>
              </div>

            </div>

            {
              showPlans ? <Box >
                {showMore ? <Box style={{ display: "flex", justifyContent: "space-around" }}>
                  <Card1>
                    <BoxWrapper style={{ backgroundImage: `url(${GreenWrapper})` }}>  </BoxWrapper>
                    <BoxText>
                      <Typography1>$00/MON</Typography1>
                      <Typography2>Upto 50 orders per month</Typography2>
                    </BoxText>
                    <BoxTriangle> <button style={{width:"150%",height:"35%",border:"none",borderRadius:"10px",backgroundColor:"#7D8D9D",color:"white"}}>CHOOSE</button> </BoxTriangle>
                  </Card1>

                  <Card1>
                    <BoxWrapper style={{ backgroundImage: `url(${GreenWrapper})` }}>  </BoxWrapper>
                    <BoxText>
                      <Typography1>$40/MON</Typography1>
                      <Typography2>Upto 100 orders per month</Typography2>
                    </BoxText>
                    <BoxTriangle> <button style={{width:"150%",height:"35%",border:"none",borderRadius:"10px",backgroundColor:"#7D8D9D",color:"white"}}>SUBSCRIBED</button> </BoxTriangle>
                  </Card1>

                  <Card1>
                    <BoxWrapper style={{ backgroundImage: `url(${GreenWrapper})` }}>  </BoxWrapper>
                    <BoxText>
                      <Typography1>$70/MON</Typography1>
                      <Typography2>Upto 500 orders per month</Typography2>
                    </BoxText>
                    <BoxTriangle> <button style={{width:"150%",height:"35%",border:"none",borderRadius:"10px",backgroundColor:"#7D8D9D",color:"white"}}>CHOOSE</button>  </BoxTriangle>
                  </Card1>

                  <Card1>
                    <BoxWrapper style={{ backgroundImage: `url(${GreenWrapper})` }}>  </BoxWrapper>
                    <BoxText>
                      <Typography1>$140/MON</Typography1>
                      <Typography2>Upto 1000 orders per month</Typography2>
                    </BoxText>
                    <BoxTriangle> <button style={{width:"150%",height:"35%",border:"none",borderRadius:"10px",backgroundColor:"#7D8D9D",color:"white"}}>SUBSCRIBED</button> </BoxTriangle>
                  </Card1>

                </Box> : <Box style={{ display: "flex", justifyContent: "space-around" }}>
                  <Card1>
                    <BoxWrapper style={{ backgroundImage: `url(${GreenWrapper})` }}> </BoxWrapper>
                    <BoxText>
                      <Typography1>$290/MON</Typography1>
                      <Typography2>Upto 10000 orders per month</Typography2>
                    </BoxText>
                    <BoxTriangle><button style={{width:"150%",height:"35%",border:"none",borderRadius:"10px",backgroundColor:"#7D8D9D",color:"white"}}>CHOOSE</button>  </BoxTriangle>
                  </Card1>

                  <Card1>
                    <BoxWrapper style={{ backgroundImage: `url(${GreenWrapper})` }}>  </BoxWrapper>
                    <BoxText>
                      <Typography1>$490/MON</Typography1>
                      <Typography2>Upto 25000 orders per month</Typography2>
                    </BoxText>
                    <BoxTriangle><button style={{width:"150%",height:"35%",border:"none",borderRadius:"10px",backgroundColor:"#7D8D9D",color:"white"}}>SUBSCRIBED</button></BoxTriangle>
                  </Card1>

                  <Card1>
                    <BoxWrapper style={{ backgroundImage: `url(${GreenWrapper})` }}>  </BoxWrapper>
                    <BoxText>
                      <Typography1>$790/MON</Typography1>
                      <Typography2>Upto 50000 orders per month</Typography2>
                    </BoxText>
                    <BoxTriangle> <button style={{width:"150%",height:"35%",border:"none",borderRadius:"10px",backgroundColor:"#7D8D9D",color:"white"}}>CHOOSE</button> </BoxTriangle>
                  </Card1>

                  <Card1>
                    <BoxWrapper style={{ backgroundImage: `url(${GreenWrapper})` }}> </BoxWrapper>
                    <BoxText>
                      <Typography1>$1190/MON</Typography1>
                      <Typography2>Upto 100000 orders per month</Typography2>
                    </BoxText>
                    <BoxTriangle><button style={{width:"150%",height:"35%",border:"none",borderRadius:"10px",backgroundColor:"#7D8D9D",color:"white"}}>SUBSCRIBED</button>  </BoxTriangle>
                  </Card1>

                </Box>}



              </Box> : <Box>
                {showMore ? <Box style={{ display: "flex", justifyContent: "space-around" }}>

                  <Card1>
                    <BoxWrapper style={{ backgroundImage: `url(${GreenWrapper})` }}>  </BoxWrapper>
                    <BoxText>
                      <Typography1>$00/MON</Typography1>
                      <Typography2>Upto 60 orders per month</Typography2>
                    </BoxText>
                    <BoxTriangle><button style={{width:"150%",height:"35%",border:"none",borderRadius:"10px",backgroundColor:"#7D8D9D",color:"white"}}>CHOOSE</button>  </BoxTriangle>
                  </Card1>

                  <Card1>
                    <BoxWrapper style={{ backgroundImage: `url(${GreenWrapper})` }}>  </BoxWrapper>
                    <BoxText style={{ top: "32%" }}>
                      <Typography1>$20/MON</Typography1>
                      <div style={{ font: "normal normal medium 15px/20px Poppins", color: "#808080" }}>(if paid yearly)</div>
                      <div style={{ font: "normal normal medium 18px/23px Poppins", color: "#808080", display: "flex", justifyContent: "center" }}>
                        <Box style={{ fontSize: "11px", paddingTop: "2px" }}>$</Box> 240/ <Box style={{ fontSize: "11px", paddingTop: "10px" }}>ANNUM</Box>
                      </div>
                      <Typography2>Upto 100 orders per month</Typography2>
                    </BoxText>
                    <BoxTriangle> <button style={{width:"150%",height:"35%",border:"none",borderRadius:"10px",backgroundColor:"#7D8D9D",color:"white"}}>SUBSCRIBED</button> </BoxTriangle>
                  </Card1>

                  <Card1>
                    <BoxWrapper style={{ backgroundImage: `url(${GreenWrapper})` }}>  </BoxWrapper>
                    <BoxText style={{ top: "32%" }}>
                      <Typography1>$65/MON</Typography1>
                      <div style={{ font: "normal normal medium 11px/23px Poppins", color: "#808080" }}>(if paid yearly)</div>
                      <div style={{ font: "normal normal medium 18px/23px Poppins", color: "#808080", display: "flex", justifyContent: "center" }}>
                        <Box style={{ fontSize: "11px", paddingTop: "2px" }}>$</Box> 780/ <Box style={{ fontSize: "11px", paddingTop: "10px" }}>ANNUM</Box>
                      </div>
                      <Typography2>Upto 500 orders per month</Typography2>
                    </BoxText>
                    <BoxTriangle><button style={{width:"150%",height:"35%",border:"none",borderRadius:"10px",backgroundColor:"#7D8D9D",color:"white"}}>CHOOSE</button>  </BoxTriangle>
                  </Card1>

                  <Card1>
                    <BoxWrapper style={{ backgroundImage: `url(${GreenWrapper})` }}>  </BoxWrapper>
                    <BoxText style={{ top: "32%" }}>
                      <Typography1>$140/MON</Typography1>
                      <div style={{ font: "normal normal medium 11px/23px Poppins", color: "#808080" }}>(if paid yearly)</div>
                      <div style={{ font: "normal normal medium 18px/23px Poppins", color: "#808080", display: "flex", justifyContent: "center" }}>
                        <Box style={{ fontSize: "11px", paddingTop: "2px" }}>$</Box> 1680/ <Box style={{ fontSize: "11px", paddingTop: "10px" }}>ANNUM</Box>
                      </div>
                      <Typography2>Upto 1000 orders per month</Typography2>
                    </BoxText>
                    <BoxTriangle> <button style={{width:"150%",height:"35%",border:"none",borderRadius:"10px",backgroundColor:"#7D8D9D",color:"white"}}>SUBSCRIBED</button> </BoxTriangle>
                  </Card1>


                </Box> : <Box style={{ display: "flex", justifyContent: "space-around" }}>

                  <Card1>
                    <BoxWrapper style={{ backgroundImage: `url(${GreenWrapper})` }}>  </BoxWrapper>
                    <BoxText style={{ top: "32%" }}>
                      <Typography1>$280/MON</Typography1>
                      <div style={{ font: "normal normal medium 15px/20px Poppins", color: "#808080" }}>(if paid yearly)</div>
                      <div style={{ font: "normal normal medium 18px/23px Poppins", color: "#808080", display: "flex", justifyContent: "center" }}>
                        <Box style={{ fontSize: "11px", paddingTop: "2px" }}>$</Box> 3360/ <Box style={{ fontSize: "11px", paddingTop: "10px" }}>ANNUM</Box>
                      </div>
                      <Typography2>Upto 10,000 orders per month</Typography2>
                    </BoxText>
                    <BoxTriangle> <button style={{width:"150%",height:"35%",border:"none",borderRadius:"10px",backgroundColor:"#7D8D9D",color:"white"}}>CHOOSE</button> </BoxTriangle>
                  </Card1>

                  <Card1>
                    <BoxWrapper style={{ backgroundImage: `url(${GreenWrapper})` }}>  </BoxWrapper>
                    <BoxText style={{ top: "32%" }}>
                      <Typography1>$480/MON</Typography1>
                      <div style={{ font: "normal normal medium 15px/20px Poppins", color: "#808080" }}>(if paid yearly)</div>
                      <div style={{ font: "normal normal medium 18px/23px Poppins", color: "#808080", display: "flex", justifyContent: "center" }}>
                        <Box style={{ fontSize: "11px", paddingTop: "2px" }}>$</Box> 5760/ <Box style={{ fontSize: "11px", paddingTop: "10px" }}>ANNUM</Box>
                      </div>
                      <Typography2>Upto 25,000 orders per month</Typography2>
                    </BoxText>
                    <BoxTriangle> <button style={{width:"150%",height:"35%",border:"none",borderRadius:"10px",backgroundColor:"#7D8D9D",color:"white"}}>SUBSCRIBED</button> </BoxTriangle>
                  </Card1>

                  <Card1>
                    <BoxWrapper style={{ backgroundImage: `url(${GreenWrapper})` }}>  </BoxWrapper>
                    <BoxText style={{ top: "32%" }}>
                      <Typography1>$780/MON</Typography1>
                      <div style={{ font: "normal normal medium 11px/23px Poppins", color: "#808080" }}>(if paid yearly)</div>
                      <div style={{ font: "normal normal medium 18px/23px Poppins", color: "#808080", display: "flex", justifyContent: "center" }}>
                        <Box style={{ fontSize: "11px", paddingTop: "2px" }}>$</Box> 9360/ <Box style={{ fontSize: "11px", paddingTop: "10px" }}>ANNUM</Box>
                      </div>
                      <Typography2>Upto 50,000 orders per month</Typography2>
                    </BoxText>
                    <BoxTriangle><button style={{width:"150%",height:"35%",border:"none",borderRadius:"10px",backgroundColor:"#7D8D9D",color:"white"}}>CHOOSE</button>  </BoxTriangle>
                  </Card1>

                  <Card1>
                    <BoxWrapper style={{ backgroundImage: `url(${GreenWrapper})` }}>  </BoxWrapper>
                    <BoxText style={{ top: "32%" }}>
                      <Typography1>$1180/MON</Typography1>
                      <div style={{ font: "normal normal medium 11px/23px Poppins", color: "#808080" }}>(if paid yearly)</div>
                      <div style={{ font: "normal normal medium 18px/23px Poppins", color: "#808080", display: "flex", justifyContent: "center" }}>
                        <Box style={{ fontSize: "11px", paddingTop: "2px" }}>$</Box> 14160/ <Box style={{ fontSize: "11px", paddingTop: "10px" }}>ANNUM</Box>
                      </div>
                      <Typography2>Upto 100,000 orders per month</Typography2>
                    </BoxText>
                    <BoxTriangle><button style={{width:"150%",height:"35%",border:"none",borderRadius:"10px",backgroundColor:"#7D8D9D",color:"white"}}>SUBSCRIBED</button>  </BoxTriangle>
                  </Card1>


                </Box>}

              </Box>
            }





            {/* <BoxLine></BoxLine> */}

            <Box style={{ width: "90%", font: "normal normal normal 17px/28px Poppins", color: "#0E0B3A", display: "flex", justifyContent: "center", position: "relative", top: '5%' }}>
              Swipe for more plan details <img style={{ width: "25px", margin: "5px 0 0 5px" }} src={Arrow} alt='arr...' />
            </Box>



          </Box>
          <Box style={{ position: "absolute", top: "45%", right: "0px", zIndex: "1" }}> <img width="60px" onClick={forwardHandle} src={ForwardIcon} alt='loading...' /> </Box>
        </Box>

      </Modal>
    </div>
  );
}