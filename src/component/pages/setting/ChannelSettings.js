import React, { useMemo, useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataProvider";
import { COLUMNS } from "./columns";
import {
  useTable,
  usePagination,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import {
  TiArrowUnsorted,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import INVENTRY_LISTINGS from "../Actions/Table/INVENTRY_LISTINGS.json";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsPencilFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchConnection,
  deleteConnection,
  editConnection,
  channelconnectdisconnect,
} from "../../../rtk/features/Settings/ChannelSettingsSlice";
import { useNavigate } from "react-router-dom";

const ChannelSettings = () => {
  const columns = useMemo(() => COLUMNS, []);
  const [data, setData] = useState([]);
  const Navigate = useNavigate();
  const { sidenavbar } = useContext(DataContext);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.users.message) {
      const channeldata = [];
      user.users.message.map((val, i) => {
        Object.entries(val).forEach(([key, value]) => {
          channeldata.push({ yourchannel: key, status: value });
        });
      });
      setData(channeldata);
    }
  }, [user]);

  const handleConnectdiconnect = (data) => {
    console.log("data.status", data.status);
    if (data.status === "Connected") {
      dispatch(
        channelconnectdisconnect({
          status: "Disconnect",
          marketplacename: data.yourchannel,
        })
      );
    } else {
      dispatch(channelconnectdisconnect({ marketplacename: data.yourchannel }));
    }

    dispatch(fetchConnection());
  };

  useEffect(() => {
    dispatch(fetchConnection());
  }, []);
  const handleDelete = (data) => {
    dispatch(deleteConnection({ marketplacename: data.yourchannel }));
    dispatch(fetchConnection());
  };

  const handleEdit = (data) => {
    console.log("handle Edit", data.yourchannel);
    if (data.yourchannel == "Walmart") {
      Navigate("/walmartconnect");
      // console.log("data",dispatch(editConnection(data.yourchannel)))
      dispatch(editConnection({ marketplacename: data.yourchannel }));
    }
    if (data.yourchannel == "Newegg") {
      Navigate("/NewEgg");
      console.log("data", dispatch(editConnection(data.yourchannel)));
    }
    if (data.yourchannel == "Sears") {
      Navigate("/SearsConnect");
      console.log("data", dispatch(editConnection(data.yourchannel)));
    }
  };
  // const deleteUser = async id => {
  //     await axios.delete(`http://localhost:3003/users/${id}`);
  //     loadUsers();
  //   };
  // console.log("channelsConnectionData", user.users.message)

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
        ...columns,
        {
          id: "xy",
          Header: "Connected/Disconnected",
          Cell: ({ row }) => (
            <span
              style={
                row.original.status === "Connected"
                  ? { color: "black", fontWeight: "bold", cursor: "pointer" }
                  : { color: "red", fontWeight: "bold", cursor: "pointer" }
              }
              onClick={() => handleConnectdiconnect(row.original)}
            >
              {row.original.status}
            </span>
          ),
        },

        {
          Header: "Edit",
          Cell: ({ row }) => (
            <div className="dropdown">
              <BsPencilFill
                size={22}
                style={{ color: "#2f0145", cursor: "pointer" }}
                onClick={() => handleEdit(row.original)}
              />
            </div>
          ),
        },
        {
          id: "x",
          Header: "Delete",
          Cell: ({ row }) => (
            <div className="dropdown">
              <RiDeleteBin6Line
                size={25}
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => handleDelete(row.original)}
              />
            </div>
          ),
        },
      ]);
    }
  );

  return (
    <>
      <div
        className={sidenavbar ? "backgroundcontainer" : "backgroundcontainer2"}
      >
        <div className="headingbaronsetting">
          <div className="toptableheading">
            <div className="subtoptableheadingone">
              <div>Channels Settings</div>
            </div>
            <div className="subtoptableheadingone">
              <span>Settings</span>{" "}
              <span>
                <MdOutlineArrowForwardIos />
              </span>
              <span className="subMenu_subheading">Channels Settings</span>
            </div>
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
                      <td
                        style={{ paddingLeft: "8px" }}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ChannelSettings;
