import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import React from "react";

import { Avatar, Menu, MenuItem } from "@material-ui/core";

export default function LogoutButton() {
  const { currentUser, logout, redirect } = useAuth();

  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  async function handleLogout() {
    setError("");
    try {
      await logout();
    } catch {
      setError("Failed to log out");
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
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
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
