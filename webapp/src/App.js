import { useState, useEffect } from "react";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import Body from "./components/Body";

import AppShell from "./components/AppShell";

import "./styles.css";
import React from "react";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: firebase.auth().currentUser,
    };
  }

  render() {
    return (
      <div className="App">
        <AppShell logOut={this.logOut.bind(this)} user={this.state.user} />
        <Body logIn={this.logIn.bind(this)} user={this.state.user} />
      </div>
    );
  }

  logOut() {
    this.setState({ user: null });
  }

  logIn(user) {
    this.setState({ user: user });
  }
}





