import React, { useMemo } from 'react'

import { useTable, usePagination, useRowSelect, useSortBy, useGlobalFilter } from 'react-table'
import INVENTRY_LISTINGS from './INVENTRY_LISTINGS.json'
import { CreateShippingColoumn } from './CreateShippingColoumn'
import { Checkbox } from './Checkbox'
import { GlobalFilter } from './CreatingShippingFilter'
import { BsThreeDots } from 'react-icons/bs';
import { TiArrowUnsorted, TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import ActionInTable from '../../Popups/ActionInTable'
import CreateShippingPoper from '../../../layout/Poppers/CreateShippingPoper'

const ListingTable = () => {
    const columns = useMemo(() => CreateShippingColoumn, [])
    const data = useMemo(() => INVENTRY_LISTINGS, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        setGlobalFilter,
        rows,
        selectedFlatRows,
        prepareRow
    } = useTable(
        {
            columns,
            data,

        }, useGlobalFilter
        , useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                ...columns,
                {
                    Header: "Quantity ship",
                    Cell: ({ row }) => (
                        <div className="dropdown">
                            <input />
                        </div>
                    )
                },

            ])
        }

    )
    const { globalFilter } = state
    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <div className="actionbuttonintable">
                <div>
                    <div className="headinglistingintable">Listings</div>
                </div>
                <div className="dropdownnintable">
                    <select className="dropdown_menu" name="cars" id="cars">
                        <option value="#">Action</option>
                        <option value="#">Delete Listings</option>
                    </select>
                </div>
            </div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {
                                        (column.Header === "cost Price" || column.Header === "Quantity") &&
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? <TiArrowSortedDown />
                                                    : <TiArrowSortedUp />
                                                : <TiArrowUnsorted />}
                                        </span>
                                    }
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td style={{ paddingLeft: "8px" }} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <table>
                <tbody >
                    <tr>
                        <div className='bottamcontainer'>
                            <div className="exportboxcontainer">
                                <div>
                                    <div className="form-group">
                                        <label>Shipment Type</label>
                                        <select id="inputState" className="form-control" style={{width:"150%"}}>
                                            <option>Choose</option>
                                            <option>Usps</option>
                                            <option>Custom Shipping</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                           
                                <div style={{position:"relative",right:"5%",margin:"2%",display:"flex",justifyContent:"space-between",width:"30%",alignItems:"center"}}>
                                <button style={{backgroundColor:"#E2E2E2",color:"black",height:"80%",width:"58%",borderRadius:"10px",border: "none"}}>Cancle</button>
                                <button style={{backgroundColor:"#42B86F",color:"white",height:"80%",width:"58%",borderRadius:"10px",border: "none"}} ><CreateShippingPoper/></button>    
                                </div>
                                
                      
                        </div>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default ListingTable