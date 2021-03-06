import { NavDropdown, Nav, Navbar } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./NavBar.module.css";
import AvatarIcon from "../AvatarIcon/AvatarIcon";

export default function NavBar() {
  const { currentUser, logout, userData, setAlert } = useAuth();

  async function handleLogout() {
    try {
      logout();
    } catch {
      setAlert({ message: "Failed to log out", success: false });
    }
  }

  const Tabs = () => {
    return (
      <>
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav>
        <Nav>
          {userData && (
            <>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              {userData.registeredTutor && <Nav.Link href="/tutor-dashboard">Tutor Dashboard</Nav.Link>}
              {userData.registeredTutor && (
                <Nav.Link href="/all-requests">View All Requests</Nav.Link>
              )}
            </>
          )}
        </Nav>
      </>
    );
  };

  const Menu = () => {
    if (userData) {
      return (
        <Nav>
          <NavDropdown
            alignRight
            flip
            title={<AvatarIcon userData={userData} />}
            id={styles["collasible-nav-dropdown"]}
            class={styles["dropdown-menu"]}
          >
            <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
    } else if (!currentUser) {
      return (
        <Nav>
          <Nav className="mr-auto">
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        </Nav>
      );
    } else {
      return (
        <>
          <Nav>
            <Nav.Link href="/register">Continue Registration</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
          </Nav>
        </>
      );
    }
  };

  return (
    <>
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
