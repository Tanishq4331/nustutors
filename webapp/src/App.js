import "@firebase/auth";
import NavBar from "./components/NavBar/NavBar";
import "./styles.css";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Switch } from "react-router-dom";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import UpdateProfile from "./pages/UpdateProfile";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import React from "react";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <main>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <PublicRoute restricted={true} path="/signup" component={Signup} />
            <PublicRoute restricted={true} path="/login" component={Login} />
            <PublicRoute
              restricted={true}
              path="/forgot-password"
              component={ForgotPassword}
            />
            <PublicRoute restricted={false} path="/home" component={Home} />
            <PublicRoute restricted={false} path="/" component={Home} />
            <PublicRoute restricted={false} path="*" component={NoMatch} />
          </Switch>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}
