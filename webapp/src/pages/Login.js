import "bootstrap/dist/css/bootstrap.min.css";
import React, { useRef, useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../components/Loading/Loading";

export default function LoginBody() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState();
  const { loginWithGoogle, login, setAlert } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          setAlert({ message: "Incorrect Password", success: false });
          break;
        case "auth/invalid-email":
          setAlert({ message: "Invalid Email", success: false });
          break;
        case "auth/user-not-found":
          setAlert({ message: "Invalid Email", success: false });
          break;
        default:
          console.log(`${error.code}: ${error.message}`);
      }
    }

    setLoading(false);
  }

  function handleLoginWithGoogle() {
    setLoading(true);

    loginWithGoogle()
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false);
        setAlert({ message: "Unable to login", successs: false });
        console.log(`${error.code}: ${error.message}`);
      });
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "90vh" }}
    >
      <Loading loading={loading} />
      <div className="w-100" style={{ maxWidth: "450px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button className="w-100 mt-2" type="submit">
                Log In
              </Button>
            </Form>
            <div className="w-100 text-center mt-2">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Do not have an account? <Link to="/register">Register</Link>
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
