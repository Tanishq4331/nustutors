import { OverlayTrigger, Tooltip } from "react-bootstrap";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import { List, Image } from "semantic-ui-react";
import { ApplicationModal } from "./ApplicationModal";
import { useState } from "react";
import AvatarIcon from "../../AvatarIcon/AvatarIcon";

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
      />
      <List.Item onClick={() => setOpen(true)}>
        <List.Content>
          <div className="d-flex justify-content-between">
            <div>
              <AvatarIcon userData={application.user} />
              &nbsp;&nbsp;
              {application.user.name}
            </div>
            <div className="d-flex align-items-center">
              <OverlayTrigger
                placement="left"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <BeenhereIcon color="inherit" />
              </OverlayTrigger>
              {application.user.grades[modName]}
            </div>
          </div>
        </List.Content>
      </List.Item>
    </>
  );
}
