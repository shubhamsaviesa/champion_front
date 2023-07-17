import React, { useMemo } from "react";
import Reportscss from "../../../style/Reports/reports.module.css";
import {
  useTable,
  usePagination,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import { ReportSkuColumn } from "./ReportSkuColumn";
import { BsThreeDots } from "react-icons/bs";
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BiExport } from "react-icons/bi";

const ReportTableSku = () => {
  const columns = useMemo(() => ReportSkuColumn, []);
  const data = useMemo(() => [], []);

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
      <div className={Reportscss.reportExportbutton}>
        <button className={Reportscss.exportbtn}>
          Export
          <BiExport size={20} />
        </button>
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
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ReportTableSku;
