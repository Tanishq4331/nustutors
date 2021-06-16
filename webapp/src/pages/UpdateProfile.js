import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
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
    setDisplay,
    reauthenticate,
  } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
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

  useEffect(() => {
    setChangeEmail(emailRef.current.value !== currentUser.email);
    setChangePassword(newPasswordRef.current.value !== ""); //assuming password fields are reset on submit
  });

  function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setSuccess(true);
    setError("");
    const promises = [];

    const handleError = (error) => {
      setSuccess(false);
      switch (error.code) {
        case "auth/wrong-password":
          setError("Incorrect Password");
          break;
        default:
          console.log(`${error.code}: ${error.message}`);
      }
    };

    if (changeEmail || changePassword) {
      if (newPasswordRef.current.value === currentPasswordRef.current.value) {
        setSuccess(false);
        setError("New password is the same as the Current password");
      } else if (
        newPasswordRef.current.value !== passwordConfirmRef.current.value
      ) {
        setSuccess(false);
        setError("Passwords do not match");
      } else {
        if (changeEmail) {
          promises.push(
            reauthenticate(currentPasswordRef.current.value)
              .then(() => updateEmail(emailRef.current.value))
              .catch(handleError)
          );
        }

        if (changePassword) {
          promises.push(
            reauthenticate(currentPasswordRef.current.value)
              .then(() => updatePassword(newPasswordRef.current.value))
              .catch(handleError)
          );
        }
      }
    }

    Promise.all(promises).then(() => {
      setLoading(false);
    });
  }

  const StatusBar = () => {
    if (changeEmail || changePassword) {
      if (!loading && success) {
        return <Alert variant="success">Profile successfully updated</Alert>;
      } else {
        return <Alert variant="danger">{error}</Alert>;
      }
    } else {
      return null;
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          <StatusBar />
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
            <Button disabled={loading || provider!=="password"} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <button onClick={() => setDisplay("Dashboard")}>Cancel</button>
      </div>
    </>
  );
}
