import React, { useEffect, useMemo, useState } from "react";
import {
  useTable,
  usePagination,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import INVENTRY_LISTINGS from "./INVENTRY_LISTINGS.json";
import { OrderColoumns } from "./OrderColoumns";
import { Checkbox } from "./Checkbox";
import { GlobalFilter } from "./OrderFilter";
import { BsThreeDots } from "react-icons/bs";
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ActionInTable from "../../Popups/ActionInTable";
import OrderActionPopper from "../../../layout/Poppers/OrderActionPoper";
import { useSelector, useDispatch } from "react-redux";
import { orderListing } from "../../../../rtk/features/order/orderSlice";
import DeleteListing from "../../Popups/ActionForDeleteAll";

const ListingTable = () => {
  const columns = useMemo(() => OrderColoumns, []);
  const OrderListing = useSelector((state) => state.Order);
  console.log("OrderListing", OrderListing);
  console.log("OrderListing dependancy", OrderListing.order?.id);

  const dispatch = useDispatch();
  const [data, setFetchData] = useState([]);
  const compoNamemultidelete = "multiOrderListing";
  useEffect(() => {
    dispatch(orderListing());
  }, [OrderListing.order?.status === "delete success"]);

  useEffect(() => {
    setFetchData(OrderListing.order?.listings || []);
  }, [OrderListing]);

  // Add state variables for start and end dates
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Use useEffect to filter data based on start and end dates
  useEffect(() => {
    if (startDate && endDate) {
      const filteredData = OrderListing.order?.listings.filter((item) => {
        const itemDate = new Date(item.date);
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        return itemDate >= startDateObj && itemDate <= endDateObj;
      });
      setFetchData(filteredData);
    } else {
      setFetchData(OrderListing.order?.listings || []);
    }
  }, [OrderListing.order?.listings, startDate, endDate]);

  const [selectedIds, setSelectedIds] = useState([]);
  const rowGetAll = (e, id, checked) => {
    console.log("checked", checked);
    if (checked === false) {
      setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
    } else {
      setSelectedIds((prevSelectedIds) =>
        prevSelectedIds.filter((selectedId) => selectedId !== id)
      );
    }
  };

  console.log("selectedIds", selectedIds);

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
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          sn: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <Checkbox
              {...row.getToggleRowSelectedProps()}
              onClick={(e) => rowGetAll(e, row.original._id, row.isSelected)}
            />
          ),
        },
        ...columns,

        {
          id: "Edit",
          Header: "Action",
          Cell: ({ row }) => (
            <div className="dropdown">
              <OrderActionPopper />
            </div>
          ),
        },
      ]);
    }
  );
  const { globalFilter } = state;
  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}   startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate} />
      <div className="actionbuttonintable">
        <div>
          <div className="headinglistingintable">Listings</div>
        </div>
        <div className="dropdownnintable">
          <DeleteListing
            multipleIdDelete={selectedIds}
            compoNamemultidelete={compoNamemultidelete}
          />
        </div>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {(column.Header === "Order Date" ||
                    column.Header === "Price") && (
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TiArrowSortedDown />
                        ) : (
                          <TiArrowSortedUp />
                        )
                      ) : (
                        <TiArrowUnsorted />
                      )}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td style={{ paddingLeft: "8px" }} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>
              <div className="bottamcontainer">
                <div className="exportboxcontainer">
                  <div></div>
                </div>
                <div className="paginationcontainer">
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
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ListingTable;
