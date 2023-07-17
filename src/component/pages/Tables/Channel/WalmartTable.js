import React, { useMemo, useState,useContext } from 'react'
import { useTable, usePagination, useRowSelect, useSortBy, useGlobalFilter } from 'react-table'
import INVENTRY_LISTINGS from '../../Actions/Table/INVENTRY_LISTINGS.json'
import { ChannelTableColumn } from './ChannelTableColumn'
import { Checkbox } from '../../Actions/Table/Checkbox'
import { GlobalFilter } from './CommanChannelFilter'
import { BsThreeDots } from 'react-icons/bs';
import { TiArrowUnsorted, TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import ActionInTable from '../../Popups/ActionInTable'
import ChanelTable from '../../../style/Channels/ChannelTable.module.css'
import { DataContext } from '../../../context/DataProvider'

const WalmartTable = () => {
    const columns = useMemo(() => ChannelTableColumn, [])
    const data = useMemo(() => INVENTRY_LISTINGS, [])
    const [channelname,setChannelname] = useState("Walmart")
    const { sidenavbar } = useContext(DataContext)

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
              {
                sn: 'selection',
                Header: ({ getToggleAllRowsSelectedProps }) => (
                   <Checkbox {...getToggleAllRowsSelectedProps()} />
                ),
                Cell: ({ row }) => <Checkbox  {...row.getToggleRowSelectedProps()} />
              },...columns,
              {
                id: "Images",
                Header: "Images",
                accessor: 'PlayerImageURL',
                disableFilters: true,
                Cell: ({ row }) => (
                 <> <img
                  src={row.original.PlayerImageURL}
                     width={30}
                    alt='Player'
                  />
                  <a style={{color:"black",textDecoration:"none"}} href='www.google.com'>https://www.google.com</a>
                  </>
                )
                
              },
      
               {
                id: "Edit",
                Header: "Action",
                Cell: ({ row }) => (
                  <div className="dropdown">
                    <ActionInTable />
                  </div>
                )
              },
      
            ])
          }

    )
    const { globalFilter } = state
    let ChannelConnectsTablerender;
    if(sidenavbar){
        ChannelConnectsTablerender =
        <>
        <div className={ChanelTable.maincontainer}>
           <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} channelname={channelname}/>
           <div className={ChanelTable.actionbuttonintable}>
               <div>
                 <div className={ChanelTable.headinglistingintable}>Listings</div>
               </div>
               <div className={ChanelTable.dropdownnintable}>
                 <select className={ChanelTable.dropdown_menu} name="cars" id="cars">
                   <option value="#">Action</option>
                   <option value="#">Delete Listings</option>
                 </select>
               </div>
             </div>
           <table className={ChanelTable.Channeltable} {...getTableProps()}>
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
           <table className={ChanelTable.forPagination}>
            
               <tbody >
                 <tr>
                 <div className='bottamcontainer'>
               <div className="exportboxcontainer">
                   <div>
       
                   </div>
               </div>
               <div className={ChanelTable.paginationcontainer}>
                   <div className="pagination">
       
                       <a
                           className="page-link "
                           onClick={() => previousPage()}
                           disabled={!canPreviousPage}
                       >
                           <AiOutlineLeft />
                       </a>
                       <a
                           className="page-link"
                           style={{ color: "black" }}
                           onClick={() => gotoPage(0)}
                           disabled={!canPreviousPage}
                       >
                           1
                       </a>
                       <a
                           className="page-link"
                           style={{ color: "black" }}
                           onClick={() => gotoPage(pageCount - 1)}
                       >
                           2
                       </a>
                       <a
                           className="page-link"
                           style={{ color: "black" }}
                           onClick={() => gotoPage(pageCount - 1)}
                       >
                           3
                       </a>
                       <a
                           className="page-link"
                           style={{ color: "black" }}
                           onClick={() => gotoPage(pageCount - 1)}
                       >
                           <BsThreeDots />
                       </a>
                       <a
                           className="page-link"
                           onClick={() => nextPage()}
                           disabled={!canNextPage}
                       >
                           <AiOutlineRight />
                       </a>
                   </div>
               </div>
           </div>
                 </tr>
               </tbody>
           </table>
         
           </div>
           </>
    }else{
        ChannelConnectsTablerender =
        <>
        <div className={ChanelTable.maincontainer}>
        <div className={ChanelTable.maincontainer2}>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} channelname={channelname}/>
           <div className={ChanelTable.actionbuttonintable}>
               <div>
                 <div className={ChanelTable.headinglistingintable}>Listings</div>
               </div>
               <div className={ChanelTable.dropdownnintable}>
                 <select className={ChanelTable.dropdown_menu} name="cars" id="cars">
                   <option value="#">Action</option>
                   <option value="#">Delete Listings</option>
                 </select>
               </div>
             </div>
           <table className={ChanelTable.Channeltable} {...getTableProps()}>
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
           <table className={ChanelTable.forPagination}>
            
               <tbody >
                 <tr>
                 <div className='bottamcontainer'>
               <div className="exportboxcontainer">
                   <div>
       
                   </div>
               </div>
               <div className={ChanelTable.paginationcontainer}>
                   <div className="pagination">
       
                       <a
                           className="page-link "
                           onClick={() => previousPage()}
                           disabled={!canPreviousPage}
                       >
                           <AiOutlineLeft />
                       </a>
                       <a
                           className="page-link"
                           style={{ color: "black" }}
                           onClick={() => gotoPage(0)}
                           disabled={!canPreviousPage}
                       >
                           1
                       </a>
                       <a
                           className="page-link"
                           style={{ color: "black" }}
                           onClick={() => gotoPage(pageCount - 1)}
                       >
                           2
                       </a>
                       <a
                           className="page-link"
                           style={{ color: "black" }}
                           onClick={() => gotoPage(pageCount - 1)}
                       >
                           3
                       </a>
                       <a
                           className="page-link"
                           style={{ color: "black" }}
                           onClick={() => gotoPage(pageCount - 1)}
                       >
                           <BsThreeDots />
                       </a>
                       <a
                           className="page-link"
                           onClick={() => nextPage()}
                           disabled={!canNextPage}
                       >
                           <AiOutlineRight />
                       </a>
                   </div>
               </div>
           </div>
                 </tr>
               </tbody>
           </table>  
            </div>
         
         
           </div>
           </>
    }
  return (
    <>
{ChannelConnectsTablerender}
    </>
  )
}

export default WalmartTable