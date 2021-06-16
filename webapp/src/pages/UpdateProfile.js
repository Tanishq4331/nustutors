import React, { useRef, useState } from "react";
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
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    if (newPasswordRef.current.value !== passwordConfirmRef.current.value) {
      setSuccess(false);
      return setError("Passwords do not match");
    } else if (
      newPasswordRef.current.value === currentPasswordRef.current.value
    ) {
      setSuccess(false);
      return setError("New password is the same as the Current password");
    }

    const promises = [];
    const resetEmail = emailRef.current.value !== currentUser.email;
    const resetPassword = newPasswordRef.current.value;
    setLoading(true);
    setError("");

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

    if (resetEmail) {
      promises.push(
        reauthenticate(currentPasswordRef.current.value)
          .then(() => updateEmail(emailRef.current.value))
          .catch(handleError)
      );
    }

    if (resetPassword) {
      promises.push(
        reauthenticate(currentPasswordRef.current.value)
          .then(() => updatePassword(newPasswordRef.current.value))
          .catch(handleError)
      );
    }

    Promise.all(promises).then(() => {
      if (resetPassword || resetEmail) {
        setMessage(success && "Profile successfully updated");
      }
      setLoading(false);
    });
  }

  //   firebase
  // .auth()
  // .currentUser.reauthenticateWithPopup(new firebase.auth.GoogleAuthProvider())
  // .then((UserCredential) => {
  //     console.log("re-outh", UserCredential);
  // });

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
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
            <Button disabled={loading} className="w-100" type="submit">
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
