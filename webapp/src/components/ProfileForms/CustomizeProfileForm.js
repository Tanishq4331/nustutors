import { Form, Col } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { personalValidation } from "../UserForm/validators";

export default function CustomizeProfileForm() {
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

  return (
    <Form>
      <Form.Group id="name">
        <Form.Row>
          <Col sm={3}>
            <Form.Label>Name</Form.Label>
          </Col>
          <Col sm={9}>
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
          <Col sm={3}>
            <Form.Label>Date of Birth</Form.Label>
          </Col>
          <Col sm={9}>
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
          <Col sm={3}>
            <Form.Label>Phone Number</Form.Label>
          </Col>
          <Col sm={9}>
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
  );
}

function labelToName(label) {
  switch (label) {
    case "name":
      return "Name";
    case "dateOfBirth":
      return "Date of Birth";
    case "phone":
      return "Phone Number";
  }
}
