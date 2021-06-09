import { useState, useEffect } from "react";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import Body from "./components/Body";
import "./styles.css";
import { AuthProvider } from "./contexts/AuthContext";
import AppShell from "./components/AppShell";
import React from "react";

export default function App() {
  const [user, setUser] = useState(firebase.auth().currentUser);
  const [display, setDisplay] = useState("Login");

  const logOut = () => {
    setUser(null);
  };

  const logIn = (user) => {
    setUser(user);
  };

  return (
    <AuthProvider>
      <div className="App">
        <AppShell logOut={logOut} user={user} setDisplay={setDisplay} />
        <Body logIn={logIn} user={user} display={display} />
      </div>
    </AuthProvider>
  );
}
