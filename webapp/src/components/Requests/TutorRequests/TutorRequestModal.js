import { Modal } from "react-bootstrap";
import { Button, Image, Header, Segment } from "semantic-ui-react";
import { Row, Col, Container } from "react-bootstrap";
import Schedule from "../Schedule";
import moment from "moment";
import { useData } from "../../../contexts/AppContext";
import Loading from "../../Loading/Loading";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

export function TutorRequestModal({ request, setOpen, open }) {
  const { setAlert } = useAuth();
  const { apply } = useData();
  const [loading, setLoading] = useState(false);
  
  const startDate = moment(request.startDate).format("MMMM Do YYYY");
  const tuteeTimes = request.user.timings.map((x) => x.toDate()); //convert firebase date to date

  const onApply = async () => {
    setLoading(true);
    try {
      await apply(request);
      setLoading(false);
      setAlert({
        message: `Application successfully submitted`,
        success: true,
      });
      setOpen(false);
    } catch (error) {
      setLoading(false);
      setAlert({ message: "An unexpected error occurred", success: false });
      console.log(`${error.code}: ${error.message}`);
    }
  };

  return (
    <Modal
      size="lg"
      show={open}
      onHide={() => setOpen(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Loading loading={loading} />
      <Modal.Header style={{ padding: "3px" }}>
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="align-items-center">
            <Header>{request.user.name}</Header>
            {request.module.label}
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
          content="Apply"
          labelPosition="right"
          icon="checkmark"
          onClick={onApply}
          positive
        />
      </Modal.Footer>
    </Modal>
  );
}
