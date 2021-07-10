import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

// If not logged in, redirect to login
export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser, userData, setAlert } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser) {
          //if authenticated but registration not complete
          if (!userData) {
            console.log("authenticated but no data")
            setAlert({
              message:
                "You have been logged in. Please complete the registration to use the app",
              success: true,
            });
            return <Redirect to="/register" />;
          } else {
            return <Component {...props} />;
          }
        } else {
          return <Redirect to="/login" />;
        }
      }}
    ></Route>
  );
}
