import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import ReceivedApplications from "./ReceivedApplications";
import { Row, Col, Container } from "react-bootstrap";
import moment from "moment";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { IconButton } from "@material-ui/core";
import { useData } from "../../../contexts/AppContext";
import styled from "styled-components";
import { Collapse } from "antd";

const { Panel } = Collapse;

const StyledPanel = styled(Panel)`
  &&& {
    border: none;
    border-radius: 0px;
    align-items: center;
    background-color: white;
    border: 1px solid rgb(248, 242, 242);
    box-shadow: none;
  }
`;

export default function RequestAccordion({ request }) {
  const startDate = moment(request.startDate).format("MMMM Do");
  const { deleteRequest } = useData();

  const onClickDelete = (event) => {
    event.stopPropagation();
    deleteRequest(request);
  };

  const DeleteIcon = () => (
    <IconButton onClick={onClickDelete}>
      <DeleteOutlineIcon />
    </IconButton>
  );

  return (
    <Collapse
      style={{ width: "450px" }}
      bordered={false}
      expandIconPosition={"right"}
      accordion
    >
      <StyledPanel
        header={
          <Grid container spacing={2}>
            <Grid item md={10} sm={10}>
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
        }
        key="1"
      >
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
      </StyledPanel>
    </Collapse>
  );
}
