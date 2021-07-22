import { Button, Row, Col, Container } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import ChangeEmailModal from "./ChangeEmailModal";

export default function ChangeAccountDetails() {
  const { userData } = useAuth();
  const [emailModalShow, setEmailModalShow] = useState(false);
  const [passwordModalShow, setPasswordModalShow] = useState(false);
  const [emailFormErrors, setEmailFormErrors] = useState("");
  const [emailFormState, setEmailFormState] = useState({
    email: userData.email,
    password: "",
  });
  const [passwordFormErrors, setPasswordFormErrors] = useState("");
  const [passwordFormState, setPasswordFormState] = useState({
    currPassword: "",
    newPassword: "",
    passwordConfirm: "",
  });

  const resetEmailForm = () => {
    setEmailFormErrors("");
    setEmailFormState({
      email: userData.email,
      password: "",
    });
  };

  const resetPasswordForm = () => {
    setPasswordFormErrors("");
    setPasswordFormState({
      currPassword: "",
      newPassword: "",
      passwordConfirm: "",
    });
  };

  return (
    <Container>
      <Row className="mt-3 mb-5">
        <Col sm={8} style={{ textAlign: "left" }}>
          <h6> Email </h6>
          <div>{userData.email}</div>
        </Col>
        <Col sm={4} style={{ textAlign: "right" }}>
          {" "}
          <Button onClick={() => setEmailModalShow(true)}>Change</Button>
          <ChangeEmailModal
            show={emailModalShow}
            onExit={resetEmailForm}
            handleClose={setEmailModalShow}
            setFormErrors={setEmailFormErrors}
            formErrors={emailFormErrors}
            setFormState={setEmailFormState}
            formState={emailFormState}
            onHide={() => setEmailModalShow(false)}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={8} style={{ textAlign: "left" }}>
          <h6> Change Password </h6>
          <div> Password must be at least 7 characters long</div>
        </Col>
        <Col sm={4} style={{ textAlign: "right" }}>
          {" "}
          <Button onClick={() => setPasswordModalShow(true)}>Change</Button>
          <ChangePasswordModal
            show={passwordModalShow}
            onExit={resetPasswordForm}
            handleClose={setPasswordModalShow}
            setFormErrors={setPasswordFormErrors}
            formErrors={passwordFormErrors}
            setFormState={setPasswordFormState}
            formState={passwordFormState}
            onHide={() => setPasswordModalShow(false)}
          />
        </Col>
      </Row>
    </Container>
  );
}
