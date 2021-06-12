import { StrictMode } from "react";
import ReactDOM from "react-dom";
import React from 'react';

import "@firebase/auth";
import "@firebase/firestore";

import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
