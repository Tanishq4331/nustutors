import "@firebase/auth";
import NavBar from "./components/NavBar/NavBar";
import "./styles.css";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Switch } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import React from "react";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import AlertMessage from "./components/Alerts/AlertMessage";
import Registration from "./pages/Registration";
import { DataProvider } from "./contexts/AppContext";
import AllRequests from "./pages/AllRequests";
import RelevantRequests from "./pages/RelevantRequests";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <NavBar />
          <AlertMessage />
          <main className="mt-4">
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute
                exact
                path="/all-requests"
                component={AllRequests}
              />
              <PrivateRoute
                exact
                path="/relevant-requests"
                component={RelevantRequests}
              />
              <PublicRoute
                restricted={false}
                path="/register"
                component={Registration}
              />
              <PublicRoute restricted={true} path="/login" component={Login} />
              <PublicRoute
                restricted={true}
                path="/forgot-password"
                component={ForgotPassword}
              />
              <PublicRoute
                restricted={false}
                exact
                path="/home"
                component={Home}
              />
              <PublicRoute restricted={false} exact path="/" component={Home} />
              <PublicRoute restricted={false} path="*" component={NoMatch} />
            </Switch>
          </main>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
