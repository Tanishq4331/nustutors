import { useAuth } from "../../contexts/AuthContext";
import Dashboard from "../../pages/Dashboard";
import Signup from "../../pages/Signup";
import ForgotPassword from "../../pages/ForgotPassword";
import Login from "../../pages/Login";
import UpdateProfile from "../../pages/UpdateProfile";
import UpdateSuccessful from "../../pages/UpdateSuccessful";
import AppShell from "../AppShell";

export default function Body() {
  const Page = () => {
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
  };
  return (
    <div>
      <header>
        <div style={{ display: "flex", flexFlow: "row nowrap" }}></div>
        <AppShell />
      </header>
      <main>
        <Page />
      </main>
    </div>
  );
}
