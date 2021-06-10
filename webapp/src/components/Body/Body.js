import { useAuth } from "../../contexts/AuthContext";
import Dashboard from "../../pages/Dashboard";
import Signup from "../../pages/Signup";
import ForgotPassword from "../../pages/ForgotPassword";
import Login from "../../pages/Login";

function ToRender() {
  const { display } = useAuth();
  console.log(display);
  switch (display) {
    case "Login":
      return <Login />;
    case "Dashboard":
      return <Dashboard />;
    case "Signup":
      return <Signup />;
    case "ForgotPassword":
      return <ForgotPassword />;
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
