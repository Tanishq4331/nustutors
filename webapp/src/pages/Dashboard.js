import { Container, Row, Col } from "react-bootstrap";
import UserRequests from "../components/Requests/User/UserRequests";
import { Header, Segment, Icon, Button } from "semantic-ui-react";
import TutorRequests from "../components/Requests/TutorRequests";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  return (
    <>
      <div className="text-center mb-5">
        <Header as="h1">Dashboard</Header>
      </div>

      <Container fluid className="d-flex justify-content-center ">
        <Row>
          {/* bottom margin provides a gutter when columns are stacked */}
          <Col
            className="md-4"
            style={{ maxWidth: "1000px", marginBottom: "20px" }}
          >
            <TutorRequests />
          </Col>
          <Col md="md-4" style={{ maxWidth: "450px" }}>
            <UserRequests />
          </Col>
        </Row>
      </Container>
    </>
  );
}
