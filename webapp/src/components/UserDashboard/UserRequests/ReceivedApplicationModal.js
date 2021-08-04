import { Modal, Container } from "react-bootstrap";
import { Button, Header, Segment } from "semantic-ui-react";
import Schedule from "../../Schedule";
import { Icon } from "semantic-ui-react";
import { useData } from "../../../contexts/AppContext";
import Loading from "../../Loading/Loading";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import AvatarIcon from "../../AvatarIcon/AvatarIcon";

export function ReceivedApplicationModal({ application, setOpen, open }) {
  const { setAlert } = useAuth();
  const { apply, rejectApplication, acceptApplication } = useData();
  const { request, user } = application;
  const [loading, setLoading] = useState(false);

  const onReject = () => {
    setOpen(false);
    rejectApplication(application);
  };

  const tutorTimes = user.timings.map((x) => x.toDate()); //convert firebase date to date

  const onAccept = async () => {
    setLoading(true);
    try {
      await acceptApplication(request, application);
      setLoading(false);
      setAlert({
        message: "Application successfully accepted.",
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
          <div className="float-right">
            <AvatarIcon userData={user} />
          </div>
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
        <Button color="red" onClick={onReject}>
          <Icon name="remove" /> Reject
        </Button>
        <Button
          content="Accept"
          labelPosition="right"
          icon="checkmark"
          onClick={onAccept}
          positive
        />
      </Modal.Footer>
    </Modal>
  );
}
