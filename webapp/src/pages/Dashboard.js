import { Container, Row, Col } from "react-bootstrap";
import UserRequests from "../components/Requests/User/UserRequests";
import { Header, Segment, Icon, Button } from "semantic-ui-react";
import TutorRequests from "../components/Requests/TutorRequests";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function NotTutorPlaceholder() {
  return (
    <Segment color="blue" placeholder>
      <Header icon>
        <Icon name="address book outline" />
        You need to register as a tutor to view requests.
      </Header>
      <Link to="/register">
        {" "}
        <Button primary>Register as Tutor</Button>
      </Link>
    </Segment>
  );
}

export default function Dashboard() {
  const { userData } = useAuth();

  return (
    <>
      <div className="text-center mb-5">
        <Header as="h1">Dashboard</Header>
      </div>

      <Container fluid className="d-flex justify-content-center">
        <Row>
          {/* bottom margin provides a gutter when columns are stacked */}
          <Col
            className="md-4"
            style={{ maxWidth: "1000px", marginBottom: "20px" }}
          >
            {userData.registeredTutor ? (
              <TutorRequests />
            ) : (
              <NotTutorPlaceholder />
            )}
          </Col>
          <Col md="auto" style={{ maxWidth: "500px" }}>
            <UserRequests />
          </Col>
        </Row>
      </Container>
    </>
  );
}
