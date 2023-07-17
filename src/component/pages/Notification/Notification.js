import React, { useContext } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import OrderTable from "../Actions/Table/OrderTable";
import NotificationTable from "../Tables/NotificationTable";
import { DataContext } from "../../context/DataProvider";

const Notification = () => {
  const { sidenavbar } = useContext(DataContext);

  return (
    <>
      <div>
        <div
          className={
            sidenavbar ? "backgroundcontainer" : "backgroundcontainer2"
          }
        >
          <div
            className={
              sidenavbar ? "headingbaronaction" : "headingbaronaction2"
            }
          >
          </div>
          <NotificationTable />
        </div>
      </div>
    </>
  );
};

export default Notification;
