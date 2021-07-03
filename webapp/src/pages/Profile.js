import { Button, Row, Col, Card, Container } from "react-bootstrap";
import AvatarUpload from "../components/ProfileForms/AvatarUpload";
import CustomizeProfileForm from "../components/ProfileForms/CustomizeProfileForm";
import ChangeAccountDetails from "../components/ProfileForms/ChangeAccountDetails";

export default function Profile() {
  return (
    <>
      <div className="justify-content-center mb-5">
        <h2 className="text-center">Profile</h2>
      </div>
      <div className="align-items-center justify-content-center mb-5 ">
        <AvatarUpload />
      </div>
      <Container
        className="d-flex justify-content-center"
        style={{ minHeight: "60vh" }}
      >
        {" "}
        <div className="w-100" style={{ maxWidth: "800px" }}>
          <Card className="mb-4">
            <Card.Header>
              <strong>Customize Profile</strong>
            </Card.Header>
            <Card.Body>
              <CustomizeProfileForm />
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <strong>Account Settings</strong>
            </Card.Header>
            <Card.Body>
              <ChangeAccountDetails />
            </Card.Body>
          </Card>
        </div>{" "}
      </Container>
    </>
  );
}
