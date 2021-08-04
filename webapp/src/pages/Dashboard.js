import { Container, Row, Col } from "react-bootstrap";
import UserRequests from "../components/UserDashboard/UserRequests/UserRequests";
import { Header } from "semantic-ui-react";
import TuteeCommitments from "../components/UserDashboard/TuteeCommitments/TuteeCommitments";

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
            md="auto"
            style={{ maxWidth: "1000px", marginBottom: "20px" }}
          >
            <TuteeCommitments />
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
