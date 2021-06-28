import React, { useState } from "react";
import { Card, Button, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import AvatarUpload from "../components/UploadForm/AvatarUpload";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center mb-4"
      style={{ minHeight: "100vh" }}
    >
      <AvatarUpload setError={setError}/>

      <div className="w-100" style={{ maxWidth: "450px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email:</strong> {currentUser.email}
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Update Profile
            </Link>
          </Card.Body>
        </Card>
        <div className="text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>
    </Container>
  );
}
