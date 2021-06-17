import { useAuth } from "../../contexts/AuthContext";
import Dashboard from "../../pages/Dashboard";
import Signup from "../../pages/Signup";
import ForgotPassword from "../../pages/ForgotPassword";
import Login from "../../pages/Login";
import UpdateProfile from "../../pages/UpdateProfile";
import UpdateSuccessful from "../../pages/UpdateSuccessful";

function ToRender() {
  const { display } = useAuth();
  switch (display) {
    case "Login":
      return <Login />;
    case "Dashboard":
      return <Dashboard />;
    case "Signup":
      return <Signup />;
    case "ForgotPassword":
      return <ForgotPassword />;
    case "UpdateProfile":
      return <UpdateProfile />;
    case "UpdateSuccessful":
      return <UpdateSuccessful />;
    default:
      return <Login />;
  }
}

export default function Body() {
  return (
    <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
      <div className="App">
        <header>
          {/* <div style={{ display: "flex", flexFlow: "row nowrap" }}>
          </div> */}
        </header>
        <main>
          <ToRender />
        </main>
      </div>
    </div>
  );
}
