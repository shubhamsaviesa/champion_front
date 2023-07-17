import React, { useState, useContext } from 'react'
import '../../style/Actions/bulkimport.css'
import { Button, styled } from "@mui/material"
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { BulkImportTable } from './Table/BulkImportTable'
import { DataContext } from '../../context/DataProvider'
const Btn = styled(Button)`font: normal normal normal 15px Poppins;background: #E2E2E2 0% 0% no-repeat padding-box;
letter-spacing: 0px;text-transform: capitalize;
color: #282C45;margin-right:20px;width:8vw;height:5.5vh; &:hover{background-color:#E2E2E2}`
const Btn1 = styled(Button)`font: normal normal normal 15px Poppins;background: #59C180 0% 0% no-repeat padding-box;
letter-spacing: 0px;text-transform: capitalize;width:8vw;height:5.5vh;
color: #FFFFFF; &:hover{background-color:#59C180}`

const BulkImport = () => {
    const initialValue = {
        bookname: "",
        description: "",
        sku: "",
        ISBN_ASIN_UPC: "",
        title: '',
        quantity: "",
        cost_price: "",
        profit: "",
        marketplace_commision: "",
        author: "",
        publisher: "",
        publication_date: "",
        volume: "",
        edition: "",
        book_number: "",
        weight: "",
        length: "",
        width: "",
        height: "",
    }

    const Navigation = useNavigate()
    const [itemCondition, setItemCondition] = useState('')
    const [inventoryFormValue, setInventoryFormValue] = useState(initialValue)
    const [media, setMedia] = useState('')
    const [file, setFile] = useState('');
    const { sidenavbar } = useContext(DataContext)

    const inventoryInputHandle = (e) => {
        const { name, value } = e.target;
        setInventoryFormValue({ ...inventoryFormValue, [name]: value });
    }
let rendertable;
if(sidenavbar){
 rendertable =     <>
  <div>
        <div className='backgroundcontainer'>
            <div className='headingbaronaction'>
                <div className='toptableheading'>
                    <div className='subtoptableheadingone'>
                        <div>Bulk Import</div>
                    </div>
                    <div className='subtoptableheadingone'>
                        <span>Actions</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Bulk Import</span>
                    </div>
                </div>
            </div>
            <BulkImportTable />

        </div>

    </div>
</>
}else{
 rendertable =  <>
    <div>
        <div className='backgroundcontainer2'>
            <div className='headingbaronaction2'>
                <div className='toptableheading'>
                    <div className='subtoptableheadingone'>
                        <div>Bulk Import</div>
                    </div>
                    <div className='subtoptableheadingone'>
                        <span>Actions</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Bulk Import</span>
                    </div>
                </div>
            </div>
            <BulkImportTable />

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

export default BulkImport