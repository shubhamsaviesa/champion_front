import React,{useContext, useEffect} from 'react'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import {BulkImportTable} from './Table/BulkImportTable'
import ProductCatalogTable from './Table/ProductCatalogTable'
import { DataContext } from '../../context/DataProvider'

const ProductCatalog = () => {
    const { sidenavbar } = useContext(DataContext)

  return (
 <>
  <div>
        <div className={sidenavbar ? "backgroundcontainer" : "backgroundcontainer2"}>
        <div className={sidenavbar ? "headingbaronaction" : "headingbaronaction2"}>
                    <div className='toptableheading'>
                        <div className='subtoptableheadingone'>
                            <div>Product Catalog</div>
                        </div>
                        <div className='subtoptableheadingone'>
                            <span>Actions</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Product Catalog</span>
                        </div>
                    </div>
                </div>
  <ProductCatalogTable />
            </div>
        </div>
 </>
  )
}

export default ProductCatalog