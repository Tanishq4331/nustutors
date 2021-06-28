import React from "react";
import { Route, Redirect, useLocation, useParams } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

// If not logged in, redirect to login
export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    ></Route>
  );
}
