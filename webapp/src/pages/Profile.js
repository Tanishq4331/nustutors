import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import AvatarUpload from "../components/UploadForm/AvatarUpload";
import { useState, useEffect } from "react";
import AlertMessage from "../components/Alerts/AlertMessage";
import { personalValidation } from "../components/UserForm/validators";

export default function Profile() {
  const { userData, setUserData, setAlert } = useAuth();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formErrors, setFormErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [formState, setFormState] = useState({ ...userData });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormState({ ...formState, [name]: value });
  };

  useEffect(() => {
    //assuming ordering of data is same
    const changesMade = JSON.stringify(formState) === JSON.stringify(userData);
    setButtonDisabled(changesMade);
  });

  function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    const newErrors = personalValidation(
      formState.name,
      formState.phone,
      formState.dateOfBirth
    );
    setFormErrors(newErrors);

    const errorPresent = Object.values(newErrors).some((x) => x !== "");

    if (errorPresent) {
      setLoading(false);
      return;
    }
    setFormErrors(newErrors);

    setUserData(formState);
    setAlert({ message: "Profile successfully updated", success: true });
  }

  return (
    <>
      <div className="align-items-center justify-content-center mb-5">
        <h2 className="text-center mb-4">Profile</h2>
      </div>
      <div className="align-items-center justify-content-center mb-4 ">
        <AvatarUpload />
      </div>
      <Container
        className="d-flex justify-content-center mb-4"
        style={{ minHeight: "60vh" }}
      >
        <div className="w-100" style={{ maxWidth: "450px" }}>
          <Form onSubmit={handleSubmit}>
            <Card className=" mb-5 ">
              <Card.Body>
                <Form.Group id="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    isInvalid={!!formErrors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group id="dateOfBirth">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOfBirth"
                    value={formState.dateOfBirth}
                    onChange={handleChange}
                    isInvalid={!!formErrors.dateOfBirth}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.dateOfBirth}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group id="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    isInvalid={!!formErrors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="align-items-center justify-content-center mt-4 ">
                  <Button disabled={buttonDisabled} type="submit">
                    Save
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Form>{" "}
        </div>{" "}
      </Container>
      Click <Link to="/update-profile">here</Link> to change your login details
    </>
  );
}
