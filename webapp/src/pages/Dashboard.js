import { Container, Row, Col } from "react-bootstrap";
import UserRequests from "../components/UserDashboard/UserRequests/UserRequests";
import { Header } from "semantic-ui-react";
import UserCommitments from "../components/UserDashboard/UserCommitments/UserSessions";

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
            <UserCommitments />
          </Col>
          <Col
            md="auto"
            style={{
              minWidth: "350px",
              maxWidth: "500px",
              marginBottom: "20px",
            }}
          >
            <UserRequests />
          </Col>
        </Row>
      </Container>
    </>
  );
}
