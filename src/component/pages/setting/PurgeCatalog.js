import React, { useState, useContext } from 'react'
// import "./setting.scss"
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import purgeCss from '../../style/settings/purgecatalog.module.css'
// import PurgeCatalogPopup from './PurgeCatalogPopup'
import { Box, styled, Typography, Button } from "@mui/material"
import { DataContext } from '../../context/DataProvider'

import PurgeCatalogPopup from '../../layout/Poppers/PurgeCatalogPopup'
const Box1 = styled(Box)`width: 37vw;border-radius: 25px;margin-left:30%;margin-top:5%;padding: 20px;
height: 75vh;background: #FFFFFF 0% 0% no-repeat padding-box;box-shadow: 3px 6px 20px #00000008;`

const Typography1 = styled(Typography)`font: normal normal 600 18px/18px Poppins;
letter-spacing: 0px;color: #000000;`

const BoxCircle = styled(Box)`width:10px;height: 10px;border-radius:50%;
border: 3.5px solid #707070;margin-right:20px;display:flex;justify-content:center;align-items:center;
margin-top:6px;padding:0px`


const Btn3 = styled(Button)`background: #E2E2E2 0% 0% no-repeat padding-box;font: normal normal medium 19px/58px Poppins;margin-right:2%;
letter-spacing: 0px;color: #282C45;border-radius: 10px;text-transform:capitalize;width:10vw;height:45px;&:hover{background:#E2E2E2}`
const Btn4 = styled(Button)`background: #13A74B 0% 0% no-repeat padding-box;font: normal normal medium 19px/58px Poppins;
letter-spacing: 0px;color: #FFFFFF;border-radius: 10px;text-transform:capitalize;width:10vw;height:45px;&:hover{background:#13A74B}`
const PurgeCatalog = () => {
    const [changePopup, setChangePopup] = useState("")
    const { sidenavbar } = useContext(DataContext)

    let renderComponent;
    if (sidenavbar) {
        renderComponent = <>
  <div style={{ position: "relative", top: "0%", left: "15%", width: "84vw", height: "115vh", background: "#F6F6F6 0% 0% no-repeat padding-box" }}>
            <div className='toptableheading' style={{ backgroundColor: "white",marginTop:"10px" }}>
                <div style={{ position: "relative", left: "2.5%", fontSize: "15px" }}>
                    <div>Purge Catalog</div>
                </div>
                <div style={{ position: "relative", right: "4%" }}>
                    <span>Settings</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Purge Catalog</span>
                </div>
            </div>

            <Box1>
                <Typography1>Select Channel</Typography1>
                <table className={purgeCss.purgeCatalogTable}>
                    <tr className={purgeCss.Billingtr}>
                        <td ><Box>Channels</Box> </td>
                        <td className={purgeCss.BillingtdSecond}>
                            <BoxCircle >
                                <div style={{ position: "relative", marginLeft: "10%" }}>
                                    <label className="switch">
                                        <input type="checkbox" style={{ width: "45px" }} onChange={() => setChangePopup("purgeBookCatalog")} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </BoxCircle>
                        </td>
                    </tr>


                    <tr className={purgeCss.Billingtr}>
                        <td><Box>Walmart</Box> </td>
                        <td className={purgeCss.BillingtdSecond}>
                            <BoxCircle >
                                <div style={{ position: "relative", marginLeft: "10%" }}>
                                    <label className="switch">
                                        <input type="checkbox" style={{ width: "45px" }} onChange={() => setChangePopup("purgeBookCatalog")} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </BoxCircle>
                        </td>
                    </tr>

                    <tr className={purgeCss.Billingtr}>
                        <td><Box>Amazon</Box> </td>
                        <td className={purgeCss.BillingtdSecond}>
                            <BoxCircle >
                                <div style={{ position: "relative", marginLeft: "10%" }}>
                                    <label className="switch">
                                        <input type="checkbox" style={{ width: "45px" }} onChange={() => setChangePopup("purgeBookCatalog")} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </BoxCircle>
                        </td>
                    </tr>

                    <tr className={purgeCss.Billingtr}>
                        <td><Box>Newegg</Box> </td>
                        <td className={purgeCss.BillingtdSecond}>
                            <BoxCircle >
                                <div style={{ position: "relative", marginLeft: "10%" }}>
                                    <label className="switch">
                                        <input type="checkbox" style={{ width: "45px" }} onChange={() => setChangePopup("purgeBookCatalog")} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </BoxCircle>
                        </td>
                    </tr>

                    <tr className={purgeCss.Billingtr}>
                        <td><Box>eBay</Box> </td>
                        <td className={purgeCss.BillingtdSecond}>
                            <BoxCircle >
                                <div style={{ position: "relative", marginLeft: "10%" }}>
                                    <label className="switch">
                                        <input type="checkbox" style={{ width: "45px" }} onChange={() => setChangePopup("purgeBookCatalog")} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </BoxCircle>
                        </td>
                    </tr>

                    <tr className={purgeCss.Billingtr}>
                        <td><Box>Sears</Box> </td>
                        <td className={purgeCss.BillingtdSecond}>
                            <BoxCircle >
                                <div style={{ position: "relative", marginLeft: "10%" }}>
                                    <label className="switch">
                                        <input type="checkbox" style={{ width: "45px" }} onChange={() => setChangePopup("purgeBookCatalog")} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </BoxCircle>
                        </td>
                    </tr>

                    <tr className={purgeCss.Billingtr}>
                        <td><Box>Wish</Box> </td>
                        <td className={purgeCss.BillingtdSecond}>
                            <BoxCircle >
                                <div style={{ position: "relative", marginLeft: "10%" }}>
                                    <label className="switch">
                                        <input type="checkbox" style={{ width: "45px" }} onChange={() => setChangePopup("purgeBookCatalog")} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </BoxCircle>
                        </td>
                    </tr>
                </table>

                <br></br>
                <Box style={{ display: "flex", marginLeft: "5%" }}>
                    <div style={{ display: "flex", marginRight: "35px" }}>

                        <div style={{ position: "relative", marginRight: "10px" }}>
                            <label className="switch">
                                <input type="checkbox" style={{ width: "45px" }} onChange={() => setChangePopup("purgeBookCatalog")} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div><label>Purge Book Catalog</label></div>

                    </div>

                    <div style={{ display: "flex" }}>

                        <div style={{ position: "relative", marginRight: "20px" }}>
                            <label className="switch">
                                <input type="checkbox" style={{ width: "45px" }} onChange={() => setChangePopup("purgeMarketplace")} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div><label>Purge Marketplace Listings</label></div>

                    </div>

                </Box>
                <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "30px" }}>
                    <Btn3>Cancel</Btn3>
                    <Btn4><PurgeCatalogPopup /> </Btn4>
                </div>
            </Box1>

        </div>
        </>
    } else {
        renderComponent = <>
  <div style={{ position: "relative", top: "0%", left: "5%", width: "95vw", height: "115vh", background: "#F6F6F6 0% 0% no-repeat padding-box" }}>
            <div className='toptableheading' style={{ backgroundColor: "white",marginTop:"10px" }}>
                <div style={{ position: "relative", left: "2.5%", fontSize: "15px" }}>
                    <div>Purge Catalog</div>
                </div>
                <div style={{ position: "relative", right: "4%" }}>
                    <span>Settings</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Purge Catalog</span>
                </div>
            </div>

            <Box1>
                <Typography1>Select Channel</Typography1>
                <table className={purgeCss.purgeCatalogTable}>
                    <tr className={purgeCss.Billingtr}>
                        <td ><Box>Channels</Box> </td>
                        <td className={purgeCss.BillingtdSecond}>
                            <BoxCircle >
                                <div style={{ position: "relative", marginLeft: "10%" }}>
                                    <label className="switch">
                                        <input type="checkbox" style={{ width: "45px" }} onChange={() => setChangePopup("purgeBookCatalog")} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </BoxCircle>
                        </td>
                    </tr>


                    <tr className={purgeCss.Billingtr}>
                        <td><Box>Walmart</Box> </td>
                        <td className={purgeCss.BillingtdSecond}>
                            <BoxCircle >
                                <div style={{ position: "relative", marginLeft: "10%" }}>
                                    <label className="switch">
                                        <input type="checkbox" style={{ width: "45px" }} onChange={() => setChangePopup("purgeBookCatalog")} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </BoxCircle>
                        </td>
                    </tr>

                    <tr className={purgeCss.Billingtr}>
                        <td><Box>Amazon</Box> </td>
                        <td className={purgeCss.BillingtdSecond}>
                            <BoxCircle >
                                <div style={{ position: "relative", marginLeft: "10%" }}>
                                    <label className="switch">
                                        <input type="checkbox" style={{ width: "45px" }} onChange={() => setChangePopup("purgeBookCatalog")} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </BoxCircle>
                        </td>
                    </tr>

                    <tr className={purgeCss.Billingtr}>
                        <td><Box>Newegg</Box> </td>
                        <td className={purgeCss.BillingtdSecond}>
                            <BoxCircle >
                                <div style={{ position: "relative", marginLeft: "10%" }}>
                                    <label className="switch">
                                        <input type="checkbox" style={{ width: "45px" }} onChange={() => setChangePopup("purgeBookCatalog")} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </BoxCircle>
                        </td>
                    </tr>

                    <tr className={purgeCss.Billingtr}>
                        <td><Box>eBay</Box> </td>
                        <td className={purgeCss.BillingtdSecond}>
                            <BoxCircle >
                                <div style={{ position: "relative", marginLeft: "10%" }}>
                                    <label className="switch">
                                        <input type="checkbox" style={{ width: "45px" }} onChange={() => setChangePopup("purgeBookCatalog")} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </BoxCircle>
                        </td>
                    </tr>

                    <tr className={purgeCss.Billingtr}>
                        <td><Box>Sears</Box> </td>
                        <td className={purgeCss.BillingtdSecond}>
                            <BoxCircle >
                                <div style={{ position: "relative", marginLeft: "10%" }}>
                                    <label className="switch">
                                        <input type="checkbox" style={{ width: "45px" }} onChange={() => setChangePopup("purgeBookCatalog")} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </BoxCircle>
                        </td>
                    </tr>

                    <tr className={purgeCss.Billingtr}>
                        <td><Box>Wish</Box> </td>
                        <td className={purgeCss.BillingtdSecond}>
                            <BoxCircle >
                                <div style={{ position: "relative", marginLeft: "10%" }}>
                                    <label className="switch">
                                        <input type="checkbox" style={{ width: "45px" }} onChange={() => setChangePopup("purgeBookCatalog")} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </BoxCircle>
                        </td>
                    </tr>
                </table>

                <br></br>
                <Box style={{ display: "flex", marginLeft: "5%" }}>
                    <div style={{ display: "flex", marginRight: "35px" }}>

                        <div style={{ position: "relative", marginRight: "10px" }}>
                            <label className="switch">
                                <input type="checkbox" style={{ width: "45px" }} onChange={() => setChangePopup("purgeBookCatalog")} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div><label>Purge Book Catalog</label></div>

                    </div>

                    <div style={{ display: "flex" }}>

                        <div style={{ position: "relative", marginRight: "20px" }}>
                            <label className="switch">
                                <input type="checkbox" style={{ width: "45px" }} onChange={() => setChangePopup("purgeMarketplace")} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div><label>Purge Marketplace Listings</label></div>

                    </div>

                </Box>
                <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "30px" }}>
                    <Btn3>Cancel</Btn3>
                    <Btn4><PurgeCatalogPopup /> </Btn4>
                </div>
            </Box1>

        </div>
        </>
    }

    return (
        <>
        {renderComponent}
        </>
    )
}

export default PurgeCatalog