import { Avatar } from "@material-ui/core";
import { List } from "semantic-ui-react";
import { ReceivedApplicationModal } from "./ReceivedApplicationModal";
import { useState } from "react";
import AvatarIcon from "../../AvatarIcon/AvatarIcon";
import { Container, Row, Col } from "react-bootstrap";
import { makeStyles } from "@material-ui/core";
import { useData } from "../../../contexts/AppContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  custom: (props) => ({
    width: theme.spacing(3.5),
    fontSize: "13px",
    height: theme.spacing(3.5),
    color: theme.palette.getContrastText("#F2F7FF"),
    border: `1px solid ${theme.palette.getContrastText("#F2F7FF")}`,
    backgroundColor: "#F2F7FF",
  }),
}));

export default function ReceivedApplication({ request, application }) {
  const [open, setOpen] = useState(false);
  const { rejectApplication } = useData();
  const modName = application.request.module.value;
  const grade = application.user.grades[modName];
  const classes = useStyles();

  const onReject = () => {
    setOpen(false);
    rejectApplication(request, application);
  };

  return (
    <>
      <ReceivedApplicationModal
        application={application}
        open={open}
        setOpen={setOpen}
        onReject={onReject}
      />
      <List.Item onClick={() => setOpen(true)}>
        <List.Content>
          <Container>
            <Row className="align-items-center">
              <Col md="2">
                <AvatarIcon userData={application.user} small />
              </Col>
              <Col md="auto">{application.user.name}</Col>
              <Col className="d-flex justify-content-end">
                {classes && (
                  <Avatar variant="rounded" className={classes.custom}>
                    {grade}
                  </Avatar>
                )}
              </Col>
            </Row>
          </Container>
        </List.Content>
      </List.Item>
    </>
  );
}
