import { useState, useEffect } from "react";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

import {
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";

import Login from "./pages/Login";
import AppPage from "./pages/AppPage";
import "./styles.css";
import React from "react";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: firebase.auth().currentUser != null
    };
  }

  render() {
    if (!this.state.loggedin) {
      return <Login logIn={this.logIn.bind(this)} />;
    } else {
      return (
        <>
          <div className="App">
            <AppShell setLogout={this.logOut.bind(this)} />
            <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
              <AppPage />
            </div>
          </div>
        </>
      );
    }
  }

  logOut() {
    this.setState({loggedin: false}); 
  }

  logIn() {
    this.setState({loggedin: true});
  }
}

function AppShell(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (firebase) => {
    handleClose();
    firebase.auth().signOut();
    props.setLogout();
  };

  const user = firebase.auth().currentUser;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: "left" }}>
          Todo List
        </Typography>
        <div>
          <Avatar
            alt={user.displayName}
            src={user.photoURL}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleLogout(firebase)}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
