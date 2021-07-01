import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

//if restricted = true and logged in then redirect to dashboard
export default function PublicRoute({
  component: Component,
  restricted,
  ...rest
}) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser && restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
