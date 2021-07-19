import { Modal } from "react-bootstrap";
import { Button, Image, Header, Segment } from "semantic-ui-react";
import { Row, Col, Container } from "react-bootstrap";
import Schedule from "./Schedule";
import moment from "moment";

export function RequestModal({ request, setOpen, open }) {
  const startDate = moment(request.startDate).format("MMMM Do YYYY");
  const tuteeTimes = request.schedule.map((x) => x.toDate()); //convert firebase date to date

  return (
    <Modal
      size="lg"
      show={open}
      onHide={() => setOpen(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ padding: "3px" }}>
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="align-items-center">
            <Header>{request.name}</Header>
            {request.modules.label}
          </div>
          <Image
            floated="right"
            size="mini"
            src={
              "https://lh3.googleusercontent.com/a/AATXAJwmeH4S2dXjPxOAH3-s2m_YelfcieAYq4u9tZ-e=s96-c"
            }
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        {request.description && (
          <div className="mb-4">
            <Header as="h4">Description</Header>
            <Segment secondary>{request.description}</Segment>
          </div>
        )}
        <Container>
          <Row className="mb-2">
            <Col>
              <strong> Start Date </strong>
              <div>{startDate}</div>
            </Col>
            <Col>
              <strong> Offered Rate </strong>
              <div>${request.rate} / hour</div>
            </Col>
            <Col>
              <strong> Duration </strong>
              <div>{request.duration} months</div>
            </Col>
          </Row>
          <Schedule tuteeTimes={tuteeTimes} />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button color="black" onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Footer>
    </Modal>
  );
}
