import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function UpdateProfile() {
  const emailRef = useRef();
  const newPasswordRef = useRef();
  const passwordConfirmRef = useRef();
  const currentPasswordRef = useRef();
  const {
    currentUser,
    updatePassword,
    updateEmail,
    redirect,
    reauthenticate,
    logout,
  } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [provider, setProvider] = useState("google.com");

  useEffect(() => {
    currentUser
      .getIdTokenResult()
      .then((idToken) => {
        setProvider(idToken.signInProvider);
      })
      .catch((error) => {
        console.log(`${error.code}: ${error.message}`);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    var success = true;

    setLoading(true);
    setError("");
    const promises = [];

    const handleError = (error) => {
      console.log("some error");
      success = false;
      switch (error.code) {
        case "auth/wrong-password":
          setError("Incorrect Password");
          break;

        default:
          console.log(`${error.code}: ${error.message}`);
      }
    };

    if (newPasswordRef.current.value === currentPasswordRef.current.value) {
      success = false;
      setError("New password is the same as the Current password");
    } else if (
      newPasswordRef.current.value !== passwordConfirmRef.current.value
    ) {
      success = false;
      setError("Passwords do not match");
    } else if (newPasswordRef.current.value.length < 6) {
      success = false;
      setError("Weak password");
    } else {
      if (emailRef.current.value !== currentUser.email) {
        promises.push(
          reauthenticate(currentPasswordRef.current.value)
            .then(() => updateEmail(emailRef.current.value))
            .catch(handleError)
        );
      }

      if (newPasswordRef.current.value !== "") {
        promises.push(
          reauthenticate(currentPasswordRef.current.value)
            .then(() => updatePassword(newPasswordRef.current.value))
            .catch(handleError)
        );
      }
    }

    Promise.all(promises).then(() => {
      setLoading(false);
      if (success) {
        console.log("success");
        logout();
        redirect("UpdateSuccessful");
      }
    });
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "450px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Update Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  defaultValue={currentUser.email}
                />
              </Form.Group>
              <Form.Group id="current-passsword">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={currentPasswordRef}
                  placeholder="Enter your current password"
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={newPasswordRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Button
                disabled={loading || provider !== "password"}
                className="w-100"
                type="submit"
              >
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button
            variant="outline-secondary"
            onClick={() => redirect("Dashboard")}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Container>
  );
}
