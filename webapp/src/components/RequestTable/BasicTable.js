import React, { useMemo } from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import { COLUMNS } from "./columns";
import { useAuth } from "../../contexts/AuthContext";
import { TutorRequestModal } from "../Requests/TutorRequests/TutorRequestModal";
import { useState } from "react";
import { Button } from "semantic-ui-react";
import { DefaultColumnFilter, Filter } from "./filters";
import "./Table_Responsive_v1/css/main.css";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import { TableSortLabel } from "@material-ui/core";
import { withStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

const StyledTableSortLabel = withStyles((theme: Theme) =>
  createStyles({
    root: {
      color: "white",
      "&:hover": {
        color: "white",
      },
      "&$active": {
        color: "white",
      },
    },
    active: {},
    icon: {
      color: "inherit !important",
    },
  })
)(TableSortLabel);

const generateSortingIndicator = (column) => {
  console.log(column)
  return (
    column.canSort && <StyledTableSortLabel
      active={column.isSorted}
      direction={column.isSortedDesc ? "asc" : "desc"}
    />
  );
};

function RenderRowSubComponent({ row }) {
  const { userData } = useAuth();
  const [open, setOpen] = useState(false);
  const request = row.original;
  const alreadyApplied = userData.applications.includes(request.requestId);

  return (
    <div className="d-flex justify-content-between">
      <TutorRequestModal request={request} open={open} setOpen={setOpen} />

      {alreadyApplied ? (
        <Button basic color="blue" Disabled>
          Applied
        </Button>
      ) : (
        <Button basic color="green" onClick={() => setOpen(true)}>
          Apply
        </Button>
      )}
      <AvatarIcon userData={request.user} />
    </div>
  );
}

export default function BasicTable({ data }) {
  const columns = useMemo(() => COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
    },
    useFilters,
    useSortBy
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restColumn } = column.getHeaderProps(
                    column.getSortByToggleProps()
                  );
                  return (
                    <th key={key} {...restColumn}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </th>
                  );
                })}
                <th>Status</th>
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <tr key={key} {...restRowProps}>
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td key={key} {...restCellProps}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                <td className="lastColumn">
                  <RenderRowSubComponent row={row} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
