import { Button, Row, Col, Card, Container } from "react-bootstrap";
import AvatarUpload from "../components/ProfileForms/AvatarUpload";
import CustomizeProfileForm from "../components/ProfileForms/CustomizeProfileForm";
import ChangeAccountDetails from "../components/ProfileForms/ChangeAccountDetails";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";

export default function Profile() {
  return (
    <>
      <div className="justify-content-center mb-5">
        <h2 className="text-center">Profile</h2>
      </div>
      <div className="align-items-center justify-content-center mb-4 ">
        <AvatarUpload />
      </div>

      <CustomizeProfileForm />
    </>
  );
}
