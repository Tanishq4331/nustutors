import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function UpdateSuccessful() {
  const { currentUser } = useAuth();
  const history = useHistory();

  if (currentUser) {
    history.push("/");
  }

  return (
    <div> 
      <br></br>
      <h3 className="text-center mb-4"> Profile sucessfully updated </h3>
      <Link to="/login">Log In</Link>
    </div>
  );
}
