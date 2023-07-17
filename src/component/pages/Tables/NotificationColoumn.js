export const NotificationColoumn = [
      {
        Header: 'Action Type',
        accessor: 'actionType',
        sticky: 'left'
    },
    {
        Header: 'Action Name',
        accessor: 'actionName',

    },
    {
        Header: 'Description',
        accessor: 'description'
    },
    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: 'Date',
        accessor:'date',
        Cell: ({ value }) => {
            return value.substring(0, 16);
          },
        sticky: 'right'
    }
]