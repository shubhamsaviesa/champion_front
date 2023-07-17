export const ColumnPcatalog = [
  {
    Header: "Name",
    accessor: "productname",
    disableSortBy: true,
    Cell: ({ value }) => {
      return value.substring(0, 35);
    },
  },
  {
    Header: "Identifier",
    accessor: "condition",
    disableSortBy: true,
  },
  {
    Header: "Category",
    accessor: "category",
    disableSortBy: true,
  },
  {
    Header: "Variants",
    disableSortBy: true,
  },
  {
    Header: "Quantity",
    accessor: "availableqty",
    disableSortBy: false,
  },
  // {
  //   Header: "Price",
  //   accessor: "costprice",
  //   disableSortBy: false,
  // },
  {
    Header: "Price",
    accessor: "costprice",
    disableSortBy: false,
    // Cell: ({ value }) => `$${value.toFixed(2)}`, // add $ sign and format as currency
  },

  {
    Header: "Last Modified",
    accessor: "date",
    disableSortBy: false,
    Cell: ({ value }) => {
      return value.substring(0, 10);
    },
  },
  {
    Header: "Status",
    disableSortBy: true,
  },
];
