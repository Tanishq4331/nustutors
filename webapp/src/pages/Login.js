import { Button } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function LoginBody() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { loginWithGoogle, login, setDisplay} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setDisplay("Dashboard")
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  async function handleLoginWithGoogle() {

    try {
      setError("");
      setLoading(true);
      await loginWithGoogle();
      setDisplay("Dashboard")
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }  

  return (
    <>
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
            <button onClick={() => setDisplay("ForgotPassword")}>
              Forgot Password
            </button>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account?{" "}
        <button onClick={() => setDisplay("Signup")}>Sign Up</button>
      </div>
      <Button variant="contained" color="primary" onClick={handleLoginWithGoogle}>
        Sign in with Google
      </Button>
    </>
  );
}
