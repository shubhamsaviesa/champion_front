import React, { useContext } from 'react'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import OrderTable from '../Actions/Table/OrderTable'
import ShipmentTable from '../Actions/Table/ShipmentTable'
import { DataContext } from '../../context/DataProvider'


const Shipment = () => {
    const { sidenavbar } = useContext(DataContext)
    let rendertable;

    if (sidenavbar) {
        rendertable = <>
 <div>
                <div className='backgroundcontainer'>
                    <div className='headingbaronaction'>
                        <div className='toptableheading'>
                            <div className='subtoptableheadingone'>
                                <div>Shipment</div>
                            </div>
                            <div className='subtoptableheadingone'>
                                <span>Orders</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Shipment</span>
                            </div>
                        </div>
                    </div>
                    <ShipmentTable />
                </div>

            </div>
        </>
    } else {
        rendertable = <>
 <div>
                <div className='backgroundcontainer2'>
                    <div className='headingbaronaction2'>
                        <div className='toptableheading'>
                            <div className='subtoptableheadingone'>
                                <div>Shipment</div>
                            </div>
                            <div className='subtoptableheadingone'>
                                <span>Orders</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Shipment</span>
                            </div>
                        </div>
                    </div>
                    <ShipmentTable />
                </div>

            </div>
        </>
    }
    return (
        <>
       {rendertable}    
        </>
    )
}

export default Shipment