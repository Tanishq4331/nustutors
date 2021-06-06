import { Button } from "@material-ui/core";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

export default function Login(props) {
  function handleLogin() {
      console.log("handling booty");
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(() => props.logIn());   

      //optional
      // .then((result) => {
      //   /** @type {firebase.auth.OAuthCredential} */
      //   var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
      //   var token = credential.accessToken;
        // The signed-in user info.
      //   var user = result.user;
        // ...
      // })
      // .catch((error) => {
        // Handle Errors here.
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
        // The email of the user's account used.
      //   var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
      //   var credential = error.credential;
        // ...
      // });

    }
  

  return (
    <>
      <h1>Login</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
      >
        Sign in with Google
      </Button>
    </>
  );
}

