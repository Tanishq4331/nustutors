import {useState} from "react";
import { firebase } from "@firebase/app";

import {
  Avatar,
  Menu,
  MenuItem,
} from "@material-ui/core";

export default function LogoutButton(props) {
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