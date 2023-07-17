import React, { useMemo, useState, useEffect, useCallback } from "react";

import {
  useTable,
  usePagination,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import INVENTRY_LISTINGS from "./INVENTRY_LISTINGS.json";
import { Palkocoloumn } from "./Palkocoloumn";
import { Checkbox } from "./Checkbox";
import { GlobalFilter } from "./PalkoFilter";
import { BsThreeDots } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ActionInTable from "../../Popups/ActionInTable";
import ListingTable from "../../../layout/Poppers/ListingTable";
import Listings from "../../../style/Actions/Listings.module.css";
import Popover from "@mui/material/Popover";

import { BiExport } from "react-icons/bi";

const Palkotemplatetable = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const [open, setOpen] = useState(false);
  const columns = useMemo(() => Palkocoloumn, []);
  const UploadFileData = useSelector(
    (state) => state.bulkimport?.bulkimportData?.data
  );
  console.log("data aa raha hai kay palkotemplateme", UploadFileData);

  const dispatch = useDispatch();
  const [data, setFetchData] = useState(UploadFileData || []);

  useEffect(() => {
    setFetchData(UploadFileData || []);
  }, [UploadFileData]);

  const handleExportPopper = () => {
    if (selectedIds.length > 0) {
      return <ListingTable />;
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                https://www.google.com
              </a>
            </>
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
            <td>
              <div className="bottamcontainer">
                <div className="exportboxcontainer">
                  <div>
                    <button
                      type="button"
                      className={Listings.exportbtn}
                      onClick={handleExportPopper}
                    >
                      {selectedIds.length > 0 ? (
                        <ListingTable selectedIds={selectedIds} />
                      ) : (
                        <span>
                          Export Listings <BiExport size={20} />
                        </span>
                      )}
                    </button>
                  </div>
                </div>
                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <div style={{ padding: "10px" }}>
                    Please select at least one item for export.
                  </div>
                </Popover>
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

export default Palkotemplatetable;
