export const Palkocoloumn = [
  {
    Header: "ProductName",
    accessor: "ProductName",
    disableSortBy: true,
    Cell: ({ value }) => {
      return value?.substring(0, 35);
    },
  },
  {
    Header: "Brand",
    accessor: "Brand",
    disableSortBy: true,
  },
  {
    Header: "Manufracturer",
    accessor: "Manufracturer",
    disableSortBy: true,
  },
  {
    Header: "ManufracturerPartNum",
    accessor: "ManufracturerPartNum",
    disableSortBy: true,
  },
  {
    Header: "ASIN",
    accessor: "ASIN",
    disableSortBy: false,
  },
  {
    Header: "SKU",
    accessor: "SKU",
    disableSortBy: false,
  },
  {
    Header: "UPC",
    accessor: "UPC",
    disableSortBy: false,
  },
  {
    Header: "Quantity",
    accessor: "Quantity",
    disableSortBy: false,
  },
];
