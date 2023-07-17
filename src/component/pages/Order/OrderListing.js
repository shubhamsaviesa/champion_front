import React,{useContext} from 'react'
import {MdOutlineArrowForwardIos} from 'react-icons/md'
import OrderTable from '../Actions/Table/OrderTable'
import { DataContext } from '../../context/DataProvider'

const OrderListing = () => {
    const { sidenavbar } = useContext(DataContext)

    let RenderOrdertable;

    if(sidenavbar){
        RenderOrdertable =     <>
        <div>
            <div className='backgroundcontainer'>
                <div className='headingbaronaction'>
                    <div className='toptableheading'>
                        <div className='subtoptableheadingone'>
                            <div>Order Listings</div>
                        </div>
                        <div className='subtoptableheadingone'>
                            <span>Orders</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Order Listings</span>
                        </div>
                    </div>
                </div>
    <OrderTable/>
            
            </div>
            </div>
    </>
    }
    else{
        RenderOrdertable =     <>
        <div>
            <div className='backgroundcontainer2'>
                <div className='headingbaronaction2'>
                    <div className='toptableheading'>
                        <div className='subtoptableheadingone'>
                            <div>Order Listings</div>
                        </div>
                        <div className='subtoptableheadingone'>
                            <span>Orders</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Order Listings</span>
                        </div>
                    </div>
                </div>
    <OrderTable/>
            </div>
    
        </div>
    </>
    }

  return (
    <>
   {RenderOrdertable}
</>
  )
}

export default OrderListing