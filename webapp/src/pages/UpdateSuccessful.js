import { useAuth } from "../contexts/AuthContext";
import { Button } from "react-bootstrap";

export default function UpdateSuccessful() {
  const { redirect } = useAuth();
  return (
    <div>
      <br></br>
      <h3 className="text-center mb-4"> Profile sucessfully updated </h3>
      <Button variant="success" onClick={() => redirect("Login")}>
        Click here to log into your account
      </Button>
    </div>
  );
}
