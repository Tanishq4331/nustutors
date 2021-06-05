import { StrictMode } from "react";
import ReactDOM from "react-dom";

import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import { config } from "./config/firebase";


import App from "./App";

// Initialize Firebase
firebase.initializeApp(config);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
      <App />
  </StrictMode>,
  rootElement
);
