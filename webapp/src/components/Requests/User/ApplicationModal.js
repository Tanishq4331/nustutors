import { Modal } from "react-bootstrap";
import { Button, Image, Header, Segment } from "semantic-ui-react";
import { Row, Col, Container } from "react-bootstrap";
import Schedule from "../Schedule";
import moment from "moment";
import { useData } from "../../../contexts/AppContext";
import Loading from "../../Loading/Loading";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

export function ApplicationModal({ application, setOpen, open }) {
  const { setAlert } = useAuth();
  const { apply } = useData();
  const { request, user } = application;
  const [loading, setLoading] = useState(false);

  const tutorTimes = user.timings.map((x) => x.toDate()); //convert firebase date to date

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
            <Header>{user.name}</Header>
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
        {user.experiences && (
          <div className="mb-4">
            <Header as="h4">Experiences</Header>
            <Segment secondary>{user.experiences}</Segment>
          </div>
        )}
        <Container>
          <Schedule tuteeTimes={tutorTimes} switcheroo />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button color="black" onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Accept"
          labelPosition="right"
          icon="checkmark"
          onClick={onApply}
          positive
        />
      </Modal.Footer>
    </Modal>
  );
}
