import { Button } from "@material-ui/core";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
import LoginBody from "../components/LoginBody";

export default function Login(props) {
  const handleLogin = () => {
    console.log("handling");
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    // var signedin = false;
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // signedin = firebase.auth().currentUser != null;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        <p> {errorMessage} </p>;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      })
      .then(() => {
        const user = firebase.auth().currentUser;
        if (user) {
          props.logIn(user);
        }
      });
  }

  return <LoginBody handleLogin={handleLogin} />
}
