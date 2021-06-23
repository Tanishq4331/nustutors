import { useAuth } from "../contexts/AuthContext";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UpdateSuccessful() {
  const { redirect } = useAuth();
  return (
    <div>
      <br></br>
      <h3 className="text-center mb-4"> Profile sucessfully updated </h3>
      <Link to="/login">Log In</Link>
    </div>
  );
}
