export const OrderColoumns = [
  {
    Header: "Name",
    accessor: "productName",
    sticky: "left",
    disableSortBy: true,
  },
  {
    Header: "Order Id",
    accessor: "orderId",
    disableSortBy: true,
  },
  {
    Header: "Status",
    disableSortBy: true,
    //   accessor: 'channel'
  },
  {
    Header: "Order Date",
    accessor: "orderDate",
    disableSortBy: false,
  },
  {
    Header: "Channel",
    accessor: "marketplaces",
    disableSortBy: true,
  },
  {
    Header: "Price",
    accessor: "listedPrice",
    disableSortBy: false,
  },
  {
    Header: "Shipment Type",
    accessor: "identifier",
    disableSortBy: true,
  },
  {
    Header: "Shipping Address",
    accessor: "addressTwo",
    disableSortBy: true,
  },
];
