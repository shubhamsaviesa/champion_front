import React, { useMemo } from "react";
import {
  useTable,
  usePagination,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import INVENTRY_LISTINGS from "./INVENTRY_LISTINGS.json";
import { RepricingLogsColumns } from "./RepricingLogsColumns";
import { BsThreeDots } from "react-icons/bs";
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Amazonrepricing from "../../../style/Actions/Amazonrepricing.module.css";

export const RepricingLogs = () => {
  const columns = useMemo(() => RepricingLogsColumns, []);
  const data = useMemo(() => INVENTRY_LISTINGS, []);

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
      hooks.visibleColumns.push((columns) => [...columns]);
    }
  );
  const { globalFilter } = state;
  return (
    <>
      <div className={Amazonrepricing.fdateonrepricinglogs}>
        <div className="productDate1">
          <span>From Date</span>{" "}
          <input
            type="date"
            style={{
              color: "#7D8D9D",
              textAlign: "center",
              paddingRight: "15px",
            }}
            placeholder="dd-mm-yyyy"
          />
          <span>To Date</span>{" "}
          <input
            type="date"
            style={{
              color: "#7D8D9D",
              textAlign: "center",
              paddingRight: "15px",
            }}
            placeholder="dd-mm-yyyy"
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
