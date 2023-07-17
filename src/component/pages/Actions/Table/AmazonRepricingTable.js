import React, { useMemo, useState } from "react";
import {
  useTable,
  usePagination,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import INVENTRY_LISTINGS from "./INVENTRY_LISTINGS.json";
import { AmazonRepricingColumns } from "./AmazonRepricingColumns";
import { Checkbox } from "./Checkbox";
import { GlobalFilter } from "./GlobalFilter";
import { BsThreeDots } from "react-icons/bs";
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ActionInTable from "../../Popups/ActionInTable";
import Amazonrepricing from "../../../style/Actions/Amazonrepricing.module.css";

const AmazonRepricingTable = () => {
  const columns = useMemo(() => AmazonRepricingColumns, []);
  const data = useMemo(() => INVENTRY_LISTINGS, []);
  const [showRepricingLog, setShowRepricingLog] = useState(true);

  const RepricingLog_Handle = () => {
    setShowRepricingLog(!showRepricingLog);
  };

  const AmazonRepricing_Handle = () => {
    setShowRepricingLog(!showRepricingLog);
  };
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
      <div className={Amazonrepricing.AmazonrepricingselectBoxArea}>
        <div className="selectboxone">
          <div className={Amazonrepricing.lables}>Amazon Price Type</div>
          <select className={Amazonrepricing.formselect} defaultValue={"0"}>
            <option value="0">Lowest</option>
            <option value="1">Second Lowest</option>
            <option value="2">Third Lowest</option>
            <option value="3">Fourth Lowest</option>
            <option value="3">Fifth Lowest</option>
            <option value="3">Average of 5</option>
          </select>
        </div>
        <div className={Amazonrepricing.inputboxone}>
          <div className={Amazonrepricing.lables}>
            Drop Price Where difference is at most %
          </div>
          <input />
        </div>
        <div className="selectboxone">
          <div className={Amazonrepricing.lables}>Repricing Schedule</div>
          <select className={Amazonrepricing.formselect} defaultValue={"1"}>
            <option>24 hours</option>
            <option value="1">3 day</option>
            <option value="2">7 day</option>
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
              <button type="button" className={Amazonrepricing.savechanges}>
                Save Changes
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default AmazonRepricingTable;
