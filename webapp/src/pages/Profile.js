import {
  Form,
  Button,
  Card,
  Alert,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import AvatarUpload from "../components/UploadForm/AvatarUpload";
import { useState, useEffect, useRef } from "react";
import AlertMessage from "../components/Alerts/AlertMessage";
import { personalValidation } from "../components/UserForm/validators";
import { useForkRef } from "@material-ui/core";

export default function Profile() {
  const { userData, setUserData, setAlert } = useAuth();
  const [formErrors, setFormErrors] = useState("");
  const [noChangesMade, setNoChangesMade] = useState(true);
  const [formState, setFormState] = useState({ ...userData });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState({ ...formState, [name]: value });
  };

  useEffect(() => {
    //assuming ordering of data is same
    setNoChangesMade(JSON.stringify(formState) === JSON.stringify(userData));
  });

  function submit(e) {
    const label = e.target.name;

    if (noChangesMade) {
      return;
    }

    const newErrors = personalValidation(
      formState.name,
      formState.phone,
      formState.dateOfBirth
    );

    setFormErrors(newErrors);

    const errorPresent = Object.values(newErrors).some((x) => x !== "");

    if (errorPresent) {
      return;
    }

    setUserData({ ...formState });

    setAlert({
      message: `${labelToName(label)} successfully updated`,
      success: true,
    });
  }

  function labelToName(label) {
    switch (label) {
      case "name":
        return "Name";
      case "dateOfBirth":
        return "Date of Birth";
      case "phone":
        return "Phone";
    }
  }

  const AccountDetails = () => {
    return (
      <Container>
        <Row className="mb-5">
          <Col sm={8} style={{ textAlign: "left" }}>
            <h6> Email </h6>
            <div>{userData.email}</div>
          </Col>
          <Col sm={4} style={{ textAlign: "right" }}>
            {" "}
            <Button>Change</Button>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col sm={8} style={{ textAlign: "left" }}>
            <h6> Change Password </h6>
            <div> Password must be at least 8 characters long</div>
          </Col>
          <Col sm={4} style={{ textAlign: "right" }}>
            {" "}
            <Button>Change</Button>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <>
      <div className="align-items-center justify-content-center mb-5">
        <h2>Profile</h2>
      </div>
      <div className="align-items-center justify-content-center mb-4 ">
        <AvatarUpload />
      </div>
      <Container style={{ minHeight: "60vh" }}>
        <div className="w-100">
          <h5 className="text-center mb-4">Account Settings</h5>
          <AccountDetails />
          <hr />
          <h5 className="text-center mb-5">Customize Profile</h5>
          <Form>
            <Form.Group id="name">
              <Form.Row>
                <Col sm={4}>
                  <Form.Label>Name</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    onBlur={submit}
                    isInvalid={!!formErrors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.name}
                  </Form.Control.Feedback>
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group id="dateOfBirth">
              <Form.Row>
                <Col sm={4}>
                  <Form.Label>Date of Birth</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control
                    type="date"
                    value={formState.dateOfBirth}
                    name="dateOfBirth"
                    onChange={handleChange}
                    onBlur={submit}
                    isInvalid={!!formErrors.dateOfBirth}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.dateOfBirth}
                  </Form.Control.Feedback>
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group id="phone">
              <Form.Row>
                <Col sm={4}>
                  <Form.Label>Phone Number</Form.Label>
                </Col>
                <Col sm={8}>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    onBlur={submit}
                    isInvalid={!!formErrors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.phone}
                  </Form.Control.Feedback>
                </Col>
              </Form.Row>
            </Form.Group>
          </Form>
        </div>{" "}
      </Container>
    </>
  );
}
