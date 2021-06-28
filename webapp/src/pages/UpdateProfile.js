import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function UpdateProfile() {
  const history = useHistory();

  const { currentUser, updatePassword, updateEmail, logout, setLogoutMessage } =
    useAuth();

  const [inputState, setInputState] = useState({
    email: currentUser.email,
    currPasword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState("");

  //set the provider state to the sign in provider
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

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputState({ ...inputState, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();

    var success = true;
    setLoading(true);
    setError("");

    const handleError = (error) => {
      success = false;
      switch (error.code) {
        case "auth/wrong-password":
          setError("Incorrect Password");
          break;
        default:
          setError("An unknown error occurred");
          console.log(`${error.code}: ${error.message}`);
      }
    };

    const promises = [];
    const email = inputState.email;
    const newPassword = inputState.newPassword;
    const currentPassword = inputState.currPasword;
    const passwordConfirm = inputState.confirmPassword;

    if (newPassword || passwordConfirm) {
      if (newPassword === currentPassword) {
        success = false;
        setError("New password is the same as the Current password");
      } else if (newPassword !== passwordConfirm) {
        success = false;
        setError("Passwords do not match");
      } else if (newPassword.length < 6) {
        success = false;
        setError("Weak password");
      } else {
        promises.push(
          updatePassword(currentPassword, newPassword).catch(handleError)
        );
      }
    } else if (email === currentUser.email) {
      success = false;
      setError("You haven't made any changes");
    }

    if (email !== currentUser.email) {
      promises.push(updateEmail(email, passwordConfirm).catch(handleError));
    }

    Promise.all(promises).then(() => {
      setLoading(false);
      if (success) {
        try {
          logout().then(() => setLogoutMessage("Profile sucessfully updated"));
        } catch {
          setError("Unable to update profile");
          console.log("Unable to log out");
        }
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
                  name="email"
                  required
                  value={inputState.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group id="current-passsword">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  name="currPasword"
                  required="true"
                  value={inputState.currPasword}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={inputState.newPassword}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  name={"confirmPassword"}
                  value={inputState.passwordConfirm}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                disabled={loading || provider !== "password"}
                className="w-100"
                type="submit"
              >
                Update
              </Button>
            </Form>{" "}
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <div className="w-100 text-center mt-2">
            <Link to="/update-profile">Cancel</Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
