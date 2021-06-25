import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [inputState, setInputState] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputState({ ...inputState, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (inputState.password !== inputState.passwordConfirm) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(inputState.email, inputState.password);
      history.push("/"); //https://stackoverflow.com/questions/57762736/firebase-auth-createuserwithemailandpassword-prevent-login-until-email-is
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Email already in use");
          break;
        case "auth/invalid-email":
          setError("Invalid email");
          break;
        case "auth/operation-not-allowed":
          console.log(`${error.code}: ${error.message}`);
          setError("An unknown error occurred");
          break;
        case "auth/weak-password":
          setError("Password too weak");
          break;
        default:
          console.log(`${error.code}: ${error.message}`);
          setError("An unknown error occurred");
      }
    }
    setLoading(false);
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "450px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={inputState.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={inputState.password}
                  required
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  name="passwordConfirm"
                  value={inputState.passwordConfirm}
                  required
                  onChange={handleChange}
                />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </Container>
  );
}
