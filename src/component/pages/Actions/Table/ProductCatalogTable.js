import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  useTable,
  usePagination,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import { ColumnPcatalog } from "./ColumnPcatalog";
import { Checkbox } from "./Checkbox";
import { GlobalFilter } from "./PcatalogFilter";
import { BsThreeDots } from "react-icons/bs";
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ActionInTable from "../../Popups/ActionInTable";
import { fectchProductCatalogData } from "../../../../rtk/features/Action/productCatalogsSlice";
import {
  getData,
  getMultipleId,
} from "../../../../rtk/features/Action/testSlice";
import { useSelector, useDispatch } from "react-redux";
import DeleteListing from "../../Popups/ActionForDeleteAll";

const ProductCatalogTable = () => {
  const compoName = "singleProductCatalog";
  const compoNamemultidelete = "multiProductCatalog";
  const columns = useMemo(() => ColumnPcatalog, []);
  const ProductCatalogData = useSelector((state) => state.ProductCatalog);
  const dispatch = useDispatch();
  const [data, setFetchData] = useState(ProductCatalogData.users?.data || []);
  console.log("ProductCatalogData", ProductCatalogData);
  useEffect(() => {
    dispatch(fectchProductCatalogData());
    setSelectedIds([]);
  }, [ProductCatalogData.users?.status === "delete success"]);

  useEffect(() => {
    setFetchData(ProductCatalogData.users?.data || []);
  }, [ProductCatalogData.users?.data]);

  const [selectedIds, setSelectedIds] = useState([]);

  // Add state variables for start and end dates
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Use useEffect to filter data based on start and end dates
  useEffect(() => {
    if (startDate && endDate) {
      const filteredData = ProductCatalogData.users?.data.filter((item) => {
        const itemDate = new Date(item.date);
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        return itemDate >= startDateObj && itemDate <= endDateObj;
      });
      setFetchData(filteredData);
    } else {
      setFetchData(ProductCatalogData.users?.data || []);
    }
  }, [ProductCatalogData.users?.data, startDate, endDate]);

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
          accessor: "imageupload1",
          disableSortBy: true,
          Cell: ({ row }) => (
            <>
              {" "}
              <img src={row.original.imageupload1} width={30} alt="Player" />
            </>
          ),
        },
        {
          id: "Edit",
          Header: "Action",
          Cell: ({ row }) => (
            <div
              className="dropdown"
              onClick={() => dispatch(getData(row.original._id))}
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
      <GlobalFilter
        filter={globalFilter}
        setFilter={setGlobalFilter}
        multipleIdDelete={selectedIds}
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
                  {(column.Header === "Price" ||
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

export default ProductCatalogTable;
