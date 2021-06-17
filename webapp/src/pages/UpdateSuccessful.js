import { useAuth } from "../contexts/AuthContext";

export default function UpdateSuccessful() {
  const { redirect } = useAuth();
  return (
    <div>
      Profile sucessfully updated
      <button onClick={() => redirect("Login")}>
        Click here to log into your account
      </button>
    </div>
  );
}
