import {
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";

import LogoutButton from "./LogoutButton";
import { useAuth } from "../../contexts/AuthContext";

export default function AppShell() {

  const { currentUser, redirect } = useAuth();

  const Menu = () => {
    if (currentUser) {
      return (
        <>
          <button onClick={() => redirect("Dashboard")}> Dashboard </button>
          <LogoutButton />
        </>
      );
    } else {
      return <></>;
    }   
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: "left" }}>
          <h3> NUSTutors </h3>
        </Typography>
          <Menu />
      </Toolbar>
    </AppBar>
  );
}



