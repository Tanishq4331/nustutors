import {
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";

import LogoutButton from "./LogoutButton"

export default function AppShell(props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: "left" }}>
          <h3> NUSTutors </h3>
        </Typography>
        <LogoutButton user={props.user} logOut={props.logOut}/>
      </Toolbar>
    </AppBar>
  );
}

