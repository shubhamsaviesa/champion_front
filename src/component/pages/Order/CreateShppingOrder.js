import React from 'react'
import {MdOutlineArrowForwardIos} from 'react-icons/md'
import CreateShipingTable from '../Actions/Table/CreateShipingTable'



const CreateShppingOrder = () => {
  return (
    <>
    <div>
        <div className='backgroundcontainer'>
            <div className='headingbaronaction'>
                <div className='toptableheading'>
                    <div className='subtoptableheadingone'>
                        <div>CreateShippingOrder</div>
                    </div>
                    <div className='subtoptableheadingone'>
                        <span>Orders</span><span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Order Listings</span><span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>CreateShippingOrder</span>
                    </div>
                </div>
            </div>
<CreateShipingTable/>

        </div>

    </div>
</>
  )
}

export default CreateShppingOrder