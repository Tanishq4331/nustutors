import { Container, Row, Col } from "react-bootstrap";
import UserRequests from "../components/Requests/User/UserRequests";
import { Header, Segment, Card } from "semantic-ui-react";
import TutorRequests from "../components/Requests/TutorRequests";

export default function Dashboard() {
  return (
    <>
      <div className="text-center mb-5">
        <Header as="h1">Dashboard</Header>
      </div>

      <Container fluid className="d-flex justify-content-center">
        <Row>
          <Col style={{ maxWidth: "1000px" }}>
            <TutorRequests />
          </Col>
          <Col md="auto" style={{ maxWidth: "500px" }}>
            <UserRequests />
          </Col>
        </Row>
      </Container>
    </>
  );
}
