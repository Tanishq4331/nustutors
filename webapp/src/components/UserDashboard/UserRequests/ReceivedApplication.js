import { Avatar, styled } from "@material-ui/core";
import { List, Image } from "semantic-ui-react";
import { ReceivedApplicationModal } from "./ReceivedApplicationModal";
import { useState } from "react";
import AvatarIcon from "../../AvatarIcon/AvatarIcon";
import { Container, Row, Col } from "react-bootstrap";
import { makeStyles } from "@material-ui/core";
import { purple, blue, green, yellow } from "@material-ui/core/colors/";
import { useData } from "../../../contexts/AppContext";

const gradeToColor = {
  "A+": purple,
  A: blue,
  "A-": green,
  "B+": yellow,
};

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
    color: theme.palette.getContrastText(gradeToColor[props.grade][700]),
    border: `2px solid white`,
    backgroundColor: gradeToColor[props.grade][700],
  }),
}));

export default function ReceivedApplication({ request, application  }) {
  const [open, setOpen] = useState(false);
  const { rejectApplication } = useData();
  const modName = application.request.module.value;
  const grade = application.user.grades[modName];
  const classes = grade && useStyles({ grade });

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
