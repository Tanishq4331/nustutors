import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { emailValidator } from "../UserForm/validators";

export default function ChangeEmailModal(props) {
  const { updateEmail, setAlert, userData } = useAuth();

  const [loading, setLoading] = useState(false);

  const { formState, formErrors } = props;
  const setFormState = props.setFormState;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState({ ...formState, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const handleError = (error) => {
      switch (error.code) {
        case "auth/wrong-password":
          props.setFormErrors((prevErrors) => ({
            ...prevErrors,
            password: "Incorrect Password",
          }));
          break;
        default:
          setAlert({
            message: "An unknown error occurred. Please try again later",
            success: false,
          });
          console.log(error);
          console.log(`${error.code}: ${error.message}`);
      }
    };

    const emailError = () => {
      if (formState.email === userData.email) {
        return "You haven't made any changes";
      } else {
        return emailValidator(formState.email);
      }
    };

    const newErrors = {
      email: await emailError(),
      password: formState.password ? "" : "Current password is required",
    };

    props.setFormErrors(newErrors);

    const errorPresent = Object.values(newErrors).some((x) => x !== "");

    if (errorPresent) {
      setLoading(false);
      return;
    }

    await updateEmail(formState.email, formState.password).catch(handleError);
    setLoading(false);
    props.handleClose();
    setAlert({
      message: "Email successfully updated.",
      success: true,
    });
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Email
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <p>Update your email below.</p>
          <Form.Group id="password">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              isInvalid={!!props.formErrors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group id="email">
            <Form.Label>New Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              isInvalid={!!formErrors.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} className="w-100" type="submit">
            Save Email
          </Button>
        </Modal.Footer>
      </Form>{" "}
    </Modal>
  );
}
