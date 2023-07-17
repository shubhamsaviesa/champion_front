import React, { useEffect, useMemo, useState } from "react";
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
  const columns = useMemo(() => ColumnPcatalog, []);
  const ProductCatalogData = useSelector((state) => state.ProductCatalog);
  const dispatch = useDispatch();
  const [data1, setData1] = useState([]);
  const data = useMemo(() => data1);

  useEffect(() => {
    dispatch(fectchProductCatalogData());
  }, []);

  useEffect(() => {
    console.log("productcatalogdata", ProductCatalogData);
    if (ProductCatalogData.users) {
      setData1(ProductCatalogData.users.data);
    }
  }, [ProductCatalogData]);
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
              onClick={() => dispatch(getMultipleId(row.original._id))}
              {...row.getToggleRowSelectedProps()}
            />
          ),
        },
        ...columns,
        {
          id: "Images",
          Header: "Images",
          accessor: "image_upload",
          disableFilters: true,
          Cell: ({ row }) => (
            <>
              {" "}
              <img src={row.original.image_upload} width={30} alt="Player" />
              <a style={{ color: "black", textDecoration: "none" }}>test</a>
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
              <ActionInTable />
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
          <DeleteListing />
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

export default ProductCatalogTable;
