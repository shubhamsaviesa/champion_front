import React, { useContext } from 'react'
import Reportscss from '../../style/Reports/reports.module.css'
import LineChart1 from '../Dashboard/Lingraph'
import BarChartHome from '../Dashboard/BarChart'
import Calendar from '../../images/celander.png'
import barcode from '../../images/barcode.png'
import subtraction1 from '../../images/subtraction1.png'
import subtraction2 from '../../images/subtraction2.png'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../context/DataProvider'
import { Box } from '@mui/material'
import Dashboardpage from '../../style/Dashboard/dashboard.module.css'

const Report = () => {

     const Navigate = useNavigate()
     const bySku = () => {
          Navigate('/bySku')
     }

     const byTime = () => {
          Navigate('/ByTime')
     }

     const LowStock = () => {
          Navigate('/LowStock')
     }

     const MostStock = () => {
          Navigate('/MostStock')
     }


     let RenderDashboard;
     const { sidenavbar } = useContext(DataContext)

     if (sidenavbar) {
          RenderDashboard =
               <>
                    <div className={Reportscss.BoxContainer}>
                         <div className={Reportscss.graphcontainerone}>
                              <div className={Reportscss.sectionOne}>
                                   <div className={Reportscss.headings}>
                                        <div className={Reportscss.headingtext}>Total Sales</div>
                                        <select className={Reportscss.headingselectbox}>
                                             <option value="volvo">7 days</option>
                                             <option value="saab">Saab</option>
                                        </select>
                                   </div>
                                   <div className={Reportscss.graphone}>
                                        <LineChart1 />
                                   </div>
                                   <div style={{ display: "flex", fontSize: "12px", textAlign: "center", justifyContent: "center" }}>
                                        <div style={{ display: "flex" }}>  <Box className={Dashboardpage.boxbrand} style={{ borderColor: "#DC1F1B" }}></Box><span>Sears</span><span>50K</span></div>
                                        <div style={{ display: "flex" }}>  <Box className={Dashboardpage.boxbrand} style={{ borderColor: "#F79301" }}></Box><span>Amazon</span><span>46K</span></div>
                                        <div style={{ display: "flex" }}>  <Box className={Dashboardpage.boxbrand} style={{ borderColor: "#01ACCA" }}></Box><span>Walmart</span><span>150K</span></div>
                                        <div style={{ display: "flex" }}>  <Box className={Dashboardpage.boxbrand} style={{ borderColor: "#854081" }}></Box><span>eBay</span><span>100K</span></div>
                                        <div style={{ display: "flex" }}>  <Box className={Dashboardpage.boxbrand} style={{ borderColor: "#97D419" }}></Box><span>Wish</span><span>10K</span></div>
                                        <div style={{ display: "flex" }}>  <Box className={Dashboardpage.boxbrand} style={{ borderColor: "#ffe9ab" }}></Box><span>Newegg</span><span>10K</span></div>
                                   </div>
                              </div>
                              {/* -------------------------------------------------------- graph one end --------------------------------- */}

                              <div className={Reportscss.sectionOne}>
                                   <div className={Reportscss.headings}>
                                        <div className={Reportscss.headingtext}>Total Product</div>
                                        <select className={Reportscss.headingselectbox}>
                                             <option value="volvo">7 days</option>
                                             <option value="saab">Saab</option>
                                        </select>
                                   </div>

                                   <div className={Reportscss.graphtwo}>
                                        <BarChartHome />

                                   </div>
                              </div>
                              {/* -------------------------------------------------------- graph two end --------------------------------- */}
                         </div>
                         {/* -------------------------------------------------------- Container one end --------------------------------- */}

                         <div className={Reportscss.graphcontainertwo}>
                              <div className={Reportscss.sectionOne}>
                                   <div className={Reportscss.headings}>
                                        <div className={Reportscss.headingtext}>Detailed Sale Reports</div>

                                   </div>
                                   <div className={Reportscss.graphthreeforbox}>
                                        <div className={Reportscss.firstbox}>
                                             <div onClick={byTime} className={Reportscss.imagereportbox}>
                                                  <div className={Reportscss.imagereport}><img src={Calendar} alt="loading" /></div>
                                                  <div>By Time</div>
                                             </div>
                                        </div>
                                        <div className={Reportscss.firstbox}>
                                             <div onClick={bySku} className={Reportscss.imagereportbox}>
                                                  <div><img src={barcode} alt="loading" /></div>
                                                  <div>By SKU</div>
                                             </div>
                                        </div>

                                   </div>
                              </div>



                              {/* -------------------------------------------------------- graph one end --------------------------------- */}

                              <div className={Reportscss.sectionOne}>
                                   <div className={Reportscss.headings}>
                                        <div className={Reportscss.headingtext}>Detailed Inventory Report</div>
                                        <div className={Reportscss.headingselectboxforlisting}>
                                             24600K
                                        </div>
                                   </div>

                                   <div className={Reportscss.graphthreeforbox}>
                                        <div className={Reportscss.firstbox}>
                                             <div onClick={LowStock} className={Reportscss.imagereportbox}>
                                                  <div className={Reportscss.imagereport}><img src={subtraction1} alt="loading" /></div>
                                                  <div>Low in stock</div>
                                             </div>
                                        </div>
                                        <div className={Reportscss.firstbox}>
                                             <div onClick={MostStock} className={Reportscss.imagereportbox}>
                                                  <div><img src={subtraction2} alt="loading" /></div>
                                                  <div>Most In stock</div>
                                             </div>
                                        </div>

                                   </div>
                              </div>
                              {/* -------------------------------------------------------- graph two end --------------------------------- */}
                         </div>

                    </div>
               </>

     } else {
          RenderDashboard =
               <>
                    <div className={Reportscss.BoxContainer2}>
                         <div className={Reportscss.graphcontainerone}>
                              <div className={Reportscss.sectionOne}>
                                   <div className={Reportscss.headings}>
                                        <div className={Reportscss.headingtext}>Total Sales</div>
                                        <select className={Reportscss.headingselectbox}>
                                             <option value="volvo">7 days</option>
                                             <option value="saab">Saab</option>
                                        </select>
                                   </div>
                                   <div className={Reportscss.graphone}>
                                        <LineChart1 />
                                   </div>
                              </div>
                              {/* -------------------------------------------------------- graph one end --------------------------------- */}

                              <div className={Reportscss.sectionOne}>
                                   <div className={Reportscss.headings}>
                                        <div className={Reportscss.headingtext}>Total Product</div>
                                        <select className={Reportscss.headingselectbox}>
                                             <option value="volvo">7 days</option>
                                             <option value="saab">Saab</option>
                                        </select>
                                   </div>

                                   <div className={Reportscss.graphtwo}>
                                        <BarChartHome />

                                   </div>
                              </div>
                              {/* -------------------------------------------------------- graph two end --------------------------------- */}
                         </div>
                         {/* -------------------------------------------------------- Container one end --------------------------------- */}

                         <div className={Reportscss.graphcontainertwo}>
                              <div className={Reportscss.sectionOne}>
                                   <div className={Reportscss.headings}>
                                        <div className={Reportscss.headingtext}>Detailed Sale Reports</div>

                                   </div>
                                   <div className={Reportscss.graphthreeforbox}>
                                        <div className={Reportscss.firstbox}>
                                             <div onClick={byTime} className={Reportscss.imagereportbox}>
                                                  <div className={Reportscss.imagereport}><img src={Calendar} alt="loading" /></div>
                                                  <div>By Time</div>
                                             </div>
                                        </div>
                                        <div className={Reportscss.firstbox}>
                                             <div onClick={bySku} className={Reportscss.imagereportbox}>
                                                  <div><img src={barcode} alt="loading" /></div>
                                                  <div>By SKU</div>
                                             </div>
                                        </div>

                                   </div>
                              </div>



                              {/* -------------------------------------------------------- graph one end --------------------------------- */}

                              <div className={Reportscss.sectionOne}>
                                   <div className={Reportscss.headings}>
                                        <div className={Reportscss.headingtext}>Detailed Inventory Report</div>
                                        <div className={Reportscss.headingselectboxforlisting}>
                                             24600K
                                        </div>
                                   </div>

                                   <div className={Reportscss.graphthreeforbox}>
                                        <div className={Reportscss.firstbox}>
                                             <div onClick={LowStock} className={Reportscss.imagereportbox}>
                                                  <div className={Reportscss.imagereport}><img src={subtraction1} alt="loading" /></div>
                                                  <div>Low in stock</div>
                                             </div>
                                        </div>
                                        <div className={Reportscss.firstbox}>
                                             <div onClick={MostStock} className={Reportscss.imagereportbox}>
                                                  <div><img src={subtraction2} alt="loading" /></div>
                                                  <div>Most In stock</div>
                                             </div>
                                        </div>

                                   </div>
                              </div>
                              {/* -------------------------------------------------------- graph two end --------------------------------- */}
                         </div>

                    </div>
               </>
     }



     return (
          <>
               {RenderDashboard}
          </>
     )
}

export default Report


