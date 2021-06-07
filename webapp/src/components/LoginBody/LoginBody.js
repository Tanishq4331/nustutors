import { Button } from "@material-ui/core";

export default function LoginBody(props) {
    return (
        <>
          <h1>Login</h1>
          <Button variant="contained" color="primary" onClick={props.handleLogin}>
            Sign in with Google
          </Button>
        </>
      );
}
