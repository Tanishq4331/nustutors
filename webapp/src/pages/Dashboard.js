import Requests from "../components/Requests/Requests";
import { Container, Row, Col } from "react-bootstrap";
import UserRequests from "../components/Requests/UserRequests";
import { Header, Segment, Card } from "semantic-ui-react";

export default function Dashboard() {
  return (
    <>
      <div className="text-center mb-5">
        <Header as="h1">Dashboard</Header>
      </div>

      <Container fluid>
        <Row className="d-flex justify-content-center">
          <Col style={{ maxWidth: "1000px" }}>
            <Requests />
          </Col>
          <Col style={{ maxWidth: "500px" }}>
            <UserRequests />
          </Col>
        </Row>
      </Container>
    </>
  );
}
