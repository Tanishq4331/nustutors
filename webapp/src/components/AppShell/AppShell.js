import { useState } from "react";
import { NavDropdown, Nav, Navbar, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./AppShell.module.css";
import blankProfile from "./blank_profile.png";

export default function AppShell() {
  const { currentUser, logout } = useAuth();

  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    try {
      logout();
    } catch {
      setError("Failed to log out");
    }
  }

  const Tabs = () => {
    return (
      <>
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav>
        <Nav>{currentUser && <Nav.Link href="/">Dashboard</Nav.Link>}</Nav>
      </>
    );
  };

  const Menu = () => {
    if (currentUser) {
      return (
        <Nav>
          <NavDropdown
            alignRight
            flip
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
            <NavDropdown.Item href="/Dashboard">Profile</NavDropdown.Item>
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
            <NavDropdown.Item href="/login">Login</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
    }
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="/home">NUSTutors</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Tabs />
          <Menu />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
