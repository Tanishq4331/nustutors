import { Button, Row, Col, Container } from "react-bootstrap";
import AvatarUpload from "../components/ProfileForms/AvatarUpload";
import CustomizeProfileForm from "../components/ProfileForms/CustomizeProfileForm";
import ChangeAccountDetails from "../components/ProfileForms/ChangeAccountDetails";
export default function Profile() {
  return (
    <>
      <div className="align-items-center justify-content-center mb-5">
        <h2>Profile</h2>
      </div>
      <div className="align-items-center justify-content-center mb-4 ">
        <AvatarUpload />
      </div>
      <Container style={{ minHeight: "60vh" }}>
        <div className="w-100">
          <h5 className="text-center mb-4">Account Settings</h5>
          <ChangeAccountDetails />
          <hr />
          <h5 className="text-center mb-5">Customize Profile</h5>
          <CustomizeProfileForm />
        </div>{" "}
      </Container>
    </>
  );
}
