import { StrictMode } from "react";
import ReactDOM from "react-dom";

import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
// import { config } from "./config/firebase";

import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"

// // Initialize Firebase
// firebase.initializeApp(config);

// console.log(config);
console.log(process.env.REACT_APP_FIREBASE_API_KEY);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
