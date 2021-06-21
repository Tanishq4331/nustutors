import { useState } from "react";
import { NavDropdown, Nav, Navbar, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./AppShell.module.css";
import blankProfile from "./blank_profile.png";

export default function AppShell() {
  const { currentUser, redirect, logout } = useAuth();

  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    try {
      logout().then(() => redirect("Login"));
    } catch {
      setError("Failed to log out");
    }
  }

  const Menu = () => {
    if (currentUser) {
      return (
        <Nav>
          <NavDropdown
            title={
              <img
                className={styles["avatar"]}
                alt={currentUser.displayName}
                src={currentUser.photoURL}
              />
            }
            id={styles["collasible-nav-dropdown"]}
            class={styles["dropdown-menu"]}
          >
            <NavDropdown.Item href="#action/3.2">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
    } else {
      return (
        <Nav>
          <NavDropdown
            title={
              <img
                className={styles["avatar"]}
                alt="Not logged in"
                src={blankProfile}
              />
            }
            id={styles["collasible-nav-dropdown"]}
            class={styles["dropdown-menu"]}
          >
            <NavDropdown.Item onClick={() => redirect("Login")}>
              Login
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
    }
  };

  const Restricted = () => {
    if (currentUser) {
      return (
        <Nav>
          <Nav.Link onClick={() => redirect("Dashboard")}>Dashboard</Nav.Link>
        </Nav>
      );
    } else {
      return null;
    }
  };

  const Public = () => {
    return (
      <Nav className="mr-auto">
        <Nav.Link onClick={() => redirect("Home")}>Home</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
    );
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="#home">NUSTutors</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Public />
          <Restricted />
          <Menu />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
