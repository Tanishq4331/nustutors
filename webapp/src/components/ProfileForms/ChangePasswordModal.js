import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useState, setShow, useEffect } from "react";
import { passwordValidator } from "../RegistrationForm/validators";

export default function ChangePasswordModal(props) {
  const { updatePassword, setAlert } = useAuth();

  const [loading, setLoading] = useState(false);

  const { formState, formErrors } = props;
  const setFormState = props.setFormState;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const handleError = (error) => {
      switch (error.code) {
        case "auth/wrong-password":
          props.setFormErrors((prevErrors) => ({
            ...prevErrors,
            currPassword: "Incorrect Password",
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

    const newErrors = {
      currPassword: formState.currPassword
        ? ""
        : "Current password is required",
      newPassword: passwordValidator(formState.newPassword),
      passwordConfirm:
        formState.newPassword === formState.passwordConfirm
          ? ""
          : "Passwords do not match",
    };

    props.setFormErrors(newErrors);

    const errorPresent = Object.values(newErrors).some((x) => x !== "");

    if (errorPresent) {
      setLoading(false);
      return;
    }

    await updatePassword(formState.currPassword, formState.newPassword).catch(
      handleError
    );
    setLoading(false);
    props.handleClose();
    setAlert({
      message: "Password sucessfully updated.",
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
          Change Password
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <p>Update your password below.</p>
          <Form.Group id="currPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              name="currPassword"
              value={formState.currPassword}
              onChange={handleChange}
              isInvalid={!!formErrors.currPassword}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.currPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group id="newPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={formState.newPassword}
              onChange={handleChange}
              isInvalid={!!formErrors.newPassword}
            />
            <Form.Control.Feedback type="invalid">
              {props.formErrors.newPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group id="passwordConfirm">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              type="password"
              name="passwordConfirm"
              value={formState.passwordConfirm}
              onChange={handleChange}
              isInvalid={!!formErrors.passwordConfirm}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.passwordConfirm}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} className="w-100" type="submit">
            Save Password
          </Button>
        </Modal.Footer>
      </Form>{" "}
    </Modal>
  );
}
