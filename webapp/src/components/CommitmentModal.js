import { Modal } from "react-bootstrap";
import { Button, Icon, Header, Segment } from "semantic-ui-react";
import { Row, Col, Container } from "react-bootstrap";
import Schedule from "./Schedule";
import moment from "moment";
import { useData } from "../contexts/AppContext";
import Loading from "./Loading/Loading";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AvatarIcon from "./AvatarIcon/AvatarIcon";

export function CommitmentModal({ request, setOpen, open, user }) {
  const { setAlert } = useAuth();

  const [loading, setLoading] = useState(false);

  const startDate = moment(request.startDate).format("MMMM Do YYYY");
  const userTimes = user.timings.map((x) => x.toDate()); //convert firebase date to date

  // const { terminate } = useData();

  // const onTerminate = () => {
  //   setOpen(false);
  //   terminate(tutorCommitment);
  // };

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
            <Header>{user.name}</Header>
            {request.module.label}
          </div>
          <AvatarIcon userData={user} />
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
          <Header as="h4">Request Information</Header>
          <hr />
          <Row className="d-flex mt-4 mb-5">
            <Col>
              <div className="subheading"> Start Date </div>
              <div className="text-muted">{startDate}</div>
            </Col>
            <Col>
              <div className="subheading"> Offered Rate </div>
              <div className="text-muted">${request.rate} / hour</div>
            </Col>
            <Col>
              <div className="subheading"> Duration </div>
              <div className="text-muted">{request.duration} months</div>
            </Col>
          </Row>

          <Header as="h4">Contact Information</Header>
          <hr />
          <Row className="mt-4 mb-5">
            <Col>
              <div className="subheading"> Email </div>
              <div className="text-muted">{user.email}</div>
            </Col>
            <Col>
              <div className="subheading"> Phone </div>
              <div className="text-muted">{user.phone}</div>
            </Col>
          </Row>
          
          <Schedule tuteeTimes={userTimes} />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="red"
          // onClick={onTerminate}
        >
          <Icon name="remove" /> Terminate Commitment
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
