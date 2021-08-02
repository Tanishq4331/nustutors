export const COLUMNS = [
  {
    Header: "Module",
    accessor: "moduleName",
    // provide custom function to format props
    Cell: (props) => `${props.value}`,

    disableSortBy: true,
    disableFilters: true,
  },
  {
    Header: "Duration",
    accessor: "duration",
    // provide custom function to format props
    Cell: (props) => `${props.value} months`,
    disableFilters: true,
  },
  {
    Header: "Start Date",
    accessor: "startDate",
    disableFilters: true,
  },
  {
    Header: "Rate",
    accessor: "rate",
    Cell: (props) => `$${props.value}`,
    disableFilters: true,
  },
];