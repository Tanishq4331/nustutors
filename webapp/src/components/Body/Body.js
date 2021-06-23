import { useAuth } from "../../contexts/AuthContext";
import Dashboard from "../../pages/Dashboard";
import Signup from "../../pages/Signup";
import ForgotPassword from "../../pages/ForgotPassword";
import Login from "../../pages/Login";
import UpdateProfile from "../../pages/UpdateProfile";
import UpdateSuccessful from "../../pages/UpdateSuccessful";
import AppShell from "../AppShell";
import Home from "../../pages/Home";

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
      case "Home":
        return <Home />;
    }
  };
  return (
    <div>
      <AppShell />
      <main>
        <Page />
      </main>
    </div>
  );
}
