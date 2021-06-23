import "@firebase/auth";
import "@firebase/firestore";
import AppShell from "./components/AppShell/AppShell";
import "./styles.css";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import UpdateProfile from "./pages/UpdateProfile";
import UpdateSuccessful from "./pages/UpdateSuccessful";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import React from "react";
import PrivateRoute from "./pages/PrivateRoute";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppShell />
        <main>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/update-successful" component={UpdateSuccessful} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/home" component={Home} />
            <Route path="/" component={Home} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </main>
      </AuthProvider>
    </Router>
  );
}
