import { Header } from "semantic-ui-react";
import { Container, Row, Col } from "react-bootstrap";
import TutorRequests from "../components/TutorDashboard/TutorRequests";
import SubmittedApplications from "../components/TutorDashboard/SubmittedApplications/SubmittedApplications";

export default function TutorDashboard() {
  return (
    <>
      <div className="text-center mb-5">
        <Header as="h1">Tutor Dashboard</Header>
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
