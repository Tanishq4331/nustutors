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

function Body(props) {
  if (!props.user) {
    return <Login logIn={props.logIn.bind(this)} />;
  } else {
    return (
      <>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <AppPage />
        </div>
      </>
    );
  }
}

function AppShell(props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: "left" }}>
          Todo List
        </Typography>
        <LogoutButton user={props.user} logOut={props.logOut}/>
      </Toolbar>
    </AppBar>
  );
}

function LogoutButton(props) {
  const user = props.user;

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
    props.logOut();
  };

  if (props.user) {
    return (
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
    );
  } else {
    return <></>;
  }
}
