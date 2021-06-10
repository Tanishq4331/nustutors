import { useState, useEffect } from "react";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import Body from "./components/Body";
import "./styles.css";
import { AuthProvider } from "./contexts/AuthContext";
import AppShell from "./components/AppShell";
import React from "react";
import { useAuth } from "./contexts/AuthContext";


export default function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppShell />
        <Body />
      </div>
    </AuthProvider>
  );
}
