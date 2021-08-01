import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReceivedApplications from "./ReceivedApplications";
import { Row, Col, Container } from "react-bootstrap";
import { makeStyles } from "@material-ui/core";
import moment from "moment";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { IconButton } from "@material-ui/core";
import { useData } from "../../../contexts/AppContext";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function RequestAccordion({ request }) {
  const startDate = moment(request.startDate).format("MMMM Do");
  const classes = useStyles();
  const { deleteRequest } = useData();

  const onClickDelete = (event) => {
    event.stopPropagation();
    deleteRequest(request);
  };

  return (
    <Accordion square>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Container fluid>
          <Row>
            <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
              <Typography className={classes.heading}>
                <h4> {request.module.label} </h4>
              </Typography>
            </Col>
            <Col md="2">
              <IconButton onClick={onClickDelete}>
                <DeleteOutlineIcon />
              </IconButton>
            </Col>
          </Row>
        </Container>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ minWidth: "95%" }}>
          <Container>
            <Row className="d-flex justify-content-between mb-5 text-center">
              <Col>
                <strong> Start Date </strong>
                <br />
                <span>{startDate}</span>
              </Col>
              <Col>
                <strong> Rate </strong>
                <br />
                <span>${request.rate} / hour</span>
              </Col>
              <Col>
                <strong> Duration </strong>
                <br />
                <span>{request.duration} months</span>
              </Col>
            </Row>
          </Container>
          <ReceivedApplications request={request} />
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
