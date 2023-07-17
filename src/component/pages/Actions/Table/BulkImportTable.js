import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  useTable,
  usePagination,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import INVENTRY_LISTINGS from "./INVENTRY_LISTINGS.json";
import { COLUMNS } from "./columns";
import { Checkbox } from "./Checkbox";
import { GlobalFilter } from "./GlobalFilter";
import { BsThreeDots } from "react-icons/bs";
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ActionInTable from "../../Popups/ActionInBulkImport";
import paginationTable from "../../../style/Actions/bulkimport.module.css";
import { useSelector, useDispatch } from "react-redux";
import { FetchAddtemplateData } from "../../../../rtk/features/Action/bulkImportSlice";
import {
  getData,
  getMultipleId,
} from "../../../../rtk/features/Action/testSlice";
import _ from "lodash";
import DeleteListing from "../../Popups/ActionForDeleteAll";

export const BulkImportTable = () => {
  const compoName = "singleBulkImport";
  const compoNamemultidelete = "multiBulkImport";
  const columns = useMemo(() => COLUMNS, []);
  const FetchtemplateResponse = useSelector((state) => state.bulkimport);
  console.log("FetchtemplateResponse in table", FetchtemplateResponse);
  const dispatch = useDispatch();

  const [data, setFetchData] = useState(
    FetchtemplateResponse.bulkimportData?.templatedetails || []
  );
  const [templateName, setTemplateName] = useState([]);

  useEffect(() => {
    dispatch(FetchAddtemplateData());
  }, [FetchtemplateResponse.users]);

  useEffect(() => {
    setFetchData(FetchtemplateResponse.bulkimportData?.templatedetails || []);
  }, [FetchtemplateResponse.bulkimportData?.templatedetails]);

  const [selectedIds, setSelectedIds] = useState([]);

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
          id: "Edit",
          Header: "Action",
          Cell: ({ row }) => (
            <div
              className="dropdown"
              onClick={() => dispatch(getData(row.original.Templatename))}
            >
              <ActionInTable
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
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
