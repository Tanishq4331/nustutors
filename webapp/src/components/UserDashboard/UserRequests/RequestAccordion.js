import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReceivedApplications from "./ReceivedApplications";
import { Row, Col, Container } from "react-bootstrap";
import moment from "moment";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { IconButton } from "@material-ui/core";
import { useData } from "../../../contexts/AppContext";
import { Grid } from "@material-ui/core";

export default function RequestAccordion({ request }) {
  const startDate = moment(request.startDate).format("MMMM Do");
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
        <Grid container spacing={2}>
          <Grid item sm={10}>
            <Typography>
              <h4> {request.module.label} </h4>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={onClickDelete}>
              <DeleteOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
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
