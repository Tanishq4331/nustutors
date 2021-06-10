import {useState} from "react";
import { useAuth } from "../../contexts/AuthContext";

import {
  Avatar,
  Menu,
  MenuItem,
} from "@material-ui/core";

export default function LogoutButton() {
  const { currentUser, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    return (
      <div>
        <Avatar
          alt={currentUser.displayName}
          src={currentUser.photoURL}
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
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>
    );
}