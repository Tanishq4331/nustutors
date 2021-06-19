import "bootstrap/dist/css/bootstrap.min.css";
import React, { useRef, useState } from "react";
import { Form, Card, Alert, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Container } from "react-bootstrap";

export default function LoginBody() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { loginWithGoogle, login, redirect } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      redirect("Dashboard");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          setError("Incorrect Password");
          break;
        case "auth/invalid-email":
          setError("Invalid Email");
          break;
        case "auth/user-not-found":
          setError("Invalid Email");
          break;
        default:
          console.log(`${error.code}: ${error.message}`);
      }
    }

    setLoading(false);
  }

  async function handleLoginWithGoogle() {
    try {
      setError("");
      setLoading(true);
      await loginWithGoogle();
      redirect("Dashboard");
    } catch {
      setError("Failed to log in");
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
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Log In
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Button
                variant="light"
                onClick={() => redirect("ForgotPassword")}
              >
                Forgot Password
              </Button>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Do not have an account?{" "}
          <a
            id={"signup"}
            onClick={() => redirect("Signup")}
            style={{ cursor: "pointer" }}
          >
            {" "}
            Sign Up{" "}
          </a>
          <br></br>
          <br></br>
          Or
          <br></br>
          <br></br>
          <Button variant="outline-primary" onClick={handleLoginWithGoogle}>
            Sign in with Google
          </Button>
        </div>
      </div>
    </Container>
  );
}
