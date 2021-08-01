import { Container, Row, Col } from "react-bootstrap";
import UserRequests from "../components/UserDashboard/UserRequests/UserRequests";
import { Header, Segment, Icon, Button } from "semantic-ui-react";
import TutorRequests from "../components/TutorDashboard/TutorRequests";
import SubmittedApplications from "../components/TutorDashboard/SubmittedApplications/SubmittedApplications";

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
          <Col md="auto" style={{ maxWidth: "450px", marginBottom: "20px" }}>
            <UserRequests />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col ml="6" style={{ marginBottom: "20px" }}>
            <SubmittedApplications />
          </Col>
        </Row>
      </Container>
    </>
  );
}
