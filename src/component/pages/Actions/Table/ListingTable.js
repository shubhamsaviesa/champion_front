import React, { useMemo, useState, useEffect, useCallback } from "react";

import {
  useTable,
  usePagination,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import INVENTRY_LISTINGS from "./INVENTRY_LISTINGS.json";
import { ListingsColumn } from "./ListingsColumn";
import { Checkbox } from "./Checkbox";
import { GlobalFilter } from "./ListingsFilter";
import { BsThreeDots } from "react-icons/bs";
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ActionInTableForListing from "../../Popups/ActionInTableForListing";
import { useSelector, useDispatch } from "react-redux";
import { fectchListingData } from "../../../../rtk/features/Action/ListingSlice";
const ListingTable = () => {
  const compoName = "Listing";
  const [selectedIds, setSelectedIds] = useState([]);
  const columns = useMemo(() => ListingsColumn, []);
  // const data = useMemo(() => INVENTRY_LISTINGS, []);
  const ListingData = useSelector((state) => state.Listing);
  const dispatch = useDispatch();
  const [data, setFetchData] = useState(ListingData.users?.data || []);
  console.log("ListingData", ListingData);
  useEffect(() => {
    dispatch(fectchListingData());
    setSelectedIds([]);
  }, []);

  useEffect(() => {
    setFetchData(ListingData.users?.data || []);
  }, [ListingData.users?.data]);

  // Add state variables for start and end dates
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Use useEffect to filter data based on start and end dates
  useEffect(() => {
    if (startDate && endDate) {
      const filteredData = ListingData.users?.data.filter((item) => {
        const itemDate = new Date(item.date);
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        return itemDate >= startDateObj && itemDate <= endDateObj;
      });
      setFetchData(filteredData);
    } else {
      setFetchData(ListingData.users?.data || []);
    }
  }, [ListingData.users?.data, startDate, endDate]);

  // Use useCallback to avoid unnecessary re-renders
  const rowGetAll = useCallback((e, id, checked) => {
    setSelectedIds((prevSelectedIds) =>
      checked
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  }, []);
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
          id: "Images",
          Header: "Images",
          accessor: "PlayerImageURL",
          disableFilters: true,
          Cell: ({ row }) => (
            <>
              {" "}
              <img src={row.original.PlayerImageURL} width={30} alt="Player" />
              <a
                style={{ color: "black", textDecoration: "none" }}
                href="www.google.com"
              >
                {/* https://www.google.com */}
              </a>
            </>
          ),
        },

        {
          id: "Edit",
          Header: "Action",
          Cell: ({ row }) => (
            <div className="dropdown">
              <ActionInTableForListing
                idForDelete={row.original._id}
                idForEdit={row.original._id}
                compoName={compoName}
              />
            </div>
          ),
        },
      ]);
    }
  );
  const { globalFilter } = state;
  return (
    <>
      <GlobalFilter
        filter={globalFilter}
        setFilter={setGlobalFilter}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
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
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {(column.Header === "cost Price" ||
                    column.Header === "Quantity") && (
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
            <th>
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
            </th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ListingTable;
