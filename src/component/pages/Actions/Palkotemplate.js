import React from 'react'
import {MdOutlineArrowForwardIos} from 'react-icons/md'
import Palkotemplatetable from './Table/Palkotemplatetable'

const Palkotemplate = () => {
  return (
    <>
    <div>
        <div className='backgroundcontainer'>
            <div className='headingbaronaction'>
                <div className='toptableheading'>
                    <div className='subtoptableheadingone'>
                        <div>Palko Template</div>
                    </div>
                    <div className='subtoptableheadingone'>
                        <span>Actions</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Bulk Import</span><span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Palko Template</span>
                    </div>
                </div>
            </div>
<Palkotemplatetable/>
        
        </div>

    </div>
</>
  )
}

export default Palkotemplate