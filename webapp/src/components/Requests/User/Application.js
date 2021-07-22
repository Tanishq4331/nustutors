import { OverlayTrigger, Tooltip } from "react-bootstrap";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import { List, Image } from "semantic-ui-react";
import { ApplicationModal } from "./ApplicationModal";
import { useState } from "react";

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Verified Grade
  </Tooltip>
);

export default function Application({ application }) {
  const [open, setOpen] = useState(false);

  const modName = application.request.module.value;

  return (
    <>
      <ApplicationModal
        application={application}
        open={open}
        setOpen={setOpen}
      />{" "}
      <List.Item onClick={() => setOpen(true)}>
        {application.user.url && <Image avatar src={application.user.url} />}
        <List.Content>
          <List.Header>{application.user.name}</List.Header>
        </List.Content>
        <List.Content floated="right">
          <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <BeenhereIcon color="inherit" />
          </OverlayTrigger>
          {application.user.grades[modName]}
        </List.Content>
      </List.Item>
    </>
  );
}
