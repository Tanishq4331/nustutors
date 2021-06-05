import { useState , useEffect} from "react";
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

function CheckAndLoadMain() {
  if (firebase.auth().currentUser) {
      return <AppPage />;
    } else {
      return <Login />;
    }          
}

// useEffect(() => {
//   const unsubscribe = firebase.auth().onAuthStateChanged((user) => { // detaching the listener
//       if (user) {
//         return <AppPage />;
//       } else {
//         return <Login />;
//       }
//   });
//   return () => unsubscribe(); // unsubscribing from the listener when the component is unmounting. 
// }, []);


// useEffect(() => {
//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       return <AppPage />;
//     } else {
//       return <Login />;
//     }
//   });
// }, [user]);


export default function App() {
  return (
    <div className="App">
        <AppShell />
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <CheckAndLoadMain />
      </div>
    </div>
  );
}

function AppShell() {
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
  };

  function CheckAndLoad() {
    if (firebase.auth().currentUser) {
      return (<div>
      <Avatar
        alt={firebase.auth().currentUser.displayName}
        src={firebase.auth().currentUser.photoURL}
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
        <MenuItem onClick={() => handleLogout(firebase)}>
          Logout
        </MenuItem>
      </Menu>
    </div>)           
    }
    return ("");
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: "left" }}>
          nus-tutors
        </Typography>
        <CheckAndLoad />
      </Toolbar>
    </AppBar>
  );
}



