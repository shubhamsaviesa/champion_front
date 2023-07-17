import React from 'react'
import {MdOutlineArrowForwardIos} from 'react-icons/md'
import GenrateLableTable from '../Actions/Table/GenrateLableTable'
import OrderTable from '../Actions/Table/OrderTable'


const GenerateLable = () => {
  return (
    <>
    <div>
        <div className='backgroundcontainer'>
            <div className='headingbaronaction'>
                <div className='toptableheading'>
                    <div className='subtoptableheadingone'>
                        <div>GenerateLablel</div>
                    </div>
                    <div className='subtoptableheadingone'>
                        <span>Orders</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>GenerateLabel</span>
                    </div>
                </div>
            </div>
<GenrateLableTable/>
        
        </div>

    </div>
</>
  )
}

export default GenerateLable