import React, { useMemo, useEffect, useState, useRef } from "react";
import {
  useTable,
  usePagination,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import _ from "lodash";
import INVENTRY_LISTINGS from "../Actions/Table/INVENTRY_LISTINGS.json";
import { NotificationColoumn } from "./NotificationColoumn";
import { Checkbox } from "../Actions/Table/Checkbox";
import { GlobalFilter } from "./NotificationFilter";
import { BsThreeDots } from "react-icons/bs";
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
// import ActionInTable from '../../Popups/ActionInTable'
import { NotificationData } from "../../../rtk/features/Notification/notificationSlice";
import { useSelector, useDispatch } from "react-redux";

const NotificationTable = () => {
  const columns = useMemo(() => NotificationColoumn, []);
  const Notificationn = useSelector((state) => state.Notification);
  const dispatch = useDispatch();
  const [fetchData, setFetchData] = useState([]);
  const data = useMemo(() => fetchData);
  console.log("Notificationn", Notificationn);

  useEffect(() => {
    // test();
    dispatch(NotificationData());
  }, []);

  // function test() {
  //   console.log("notification data", Notificationn);
  //   if (_.isEmpty(Notificationn.notificationData)) {
  //     setFetchData(Notificationn.notificationData.Notification);
  //   }
  // }

  useEffect(() => {
    setFetchData(Notificationn.notificationData?.Notification || []);
  }, [Notificationn]);


    // Add state variables for start and end dates
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Use useEffect to filter data based on start and end dates
  useEffect(() => {
    if (startDate && endDate) {
      const filteredData = Notificationn.notificationData?.Notification.filter((item) => {
        const itemDate = new Date(item.date);
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        return itemDate >= startDateObj && itemDate <= endDateObj;
      });
      setFetchData(filteredData);
    } else {
      setFetchData(Notificationn.notificationData?.Notification || []);
    }
  }, [Notificationn.notificationData?.Notification, startDate, endDate]);

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
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );
  const { globalFilter } = state;
  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}  startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate} />
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

export default NotificationTable;
