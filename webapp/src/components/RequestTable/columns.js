import AvatarIcon from "../AvatarIcon/AvatarIcon";
import { TutorRequestModal } from "../TutorDashboard/TutorRequests/TutorRequestModal";
import { Button } from "semantic-ui-react";
import { useState } from "react";
import { Row } from "react-bootstrap";

export const COLUMNS = [
  {
    Header: "",
    accessor: "user",
    Cell: (props) => {        // custom function to format cell
      return <AvatarIcon userData={props.value} />;
    },
    disableFilters: true,
  },
  {
    Header: "Module",
    accessor: "moduleName",
    disableSortBy: true,
    disableFilters: true,
  },
  {
    Header: "Duration",
    accessor: "duration",
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
  {
    Header: "",
    accessor: "foo", //doesn't matter
    Cell: (props) => {
      const request = props.cell.row.original;
      return <ApplyButton request={request} />;
    },
    disableFilters: true,
  },
];

function ApplyButton({ request }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TutorRequestModal request={request} open={open} setOpen={setOpen} />

      <div>
        <Button basic color="green" onClick={() => setOpen(true)}>
          Apply
        </Button>
      </div>
    </>
  );
}
