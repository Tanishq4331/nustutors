import { useState, useEffect } from "react";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import Body from "./components/Body";

import AppShell from "./components/AppShell";

import "./styles.css";
import React from "react";

export default function App() {

  const [user, setUser] = useState(firebase.auth().currentUser)

  const logOut = () => {
    setUser(null);
  };

  const logIn = (user) => {
    setUser(user);
  };

  return (
    <div className="App">
      <AppShell logOut={logOut} user={user} />
      <Body logIn={logIn} user={user} />
    </div>
  );

}





