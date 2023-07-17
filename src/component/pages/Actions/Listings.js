import React,{useContext} from 'react'
import {MdOutlineArrowForwardIos} from 'react-icons/md'
import ListingTable from './Table/ListingTable'
import { DataContext } from '../../context/DataProvider'


const Listings = () => {
    const { sidenavbar } = useContext(DataContext)
    let rendertable;
    if(sidenavbar){
rendertable = <>  <div>
        <div className='backgroundcontainer'>
            <div className='headingbaronaction'>
                <div className='toptableheading'>
                    <div className='subtoptableheadingone'>
                        <div>All Product Listings</div>
                    </div>
                    <div className='subtoptableheadingone'>
                        <span>Actions</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>All Product Listings</span>
                    </div>
                </div>
            </div>
<ListingTable/>
        
        </div>

    </div>
</>
    }else{
        rendertable = <>  <div>
        <div className='backgroundcontainer2'>
            <div className='headingbaronaction2'>
                <div className='toptableheading'>
                    <div className='subtoptableheadingone'>
                        <div>All Product Listings</div>
                    </div>
                    <div className='subtoptableheadingone'>
                        <span>Actions</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>All Product Listings</span>
                    </div>
                </div>
            </div>
<ListingTable/>
        
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

export default Listings