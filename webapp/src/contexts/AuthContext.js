import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { firebase } from "@firebase/app";
import { ListItemText } from "@material-ui/core";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export async function emailAlreadyExists(email) {
  // console.log(db.collection("users").where("email", "==", email).get());
  const snapshot = await db
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();
  return !snapshot.empty;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [logoutMessage, setLogoutMessage] = useState("");

  function signup(email, password) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const user = {
          uid: response.user.uid,
          email: email,
        };
        db.collection("users").doc(user.uid).set(user);
      });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(newEmail, password) {
    return reauthenticate(password).then((user) => user.updateEmail(newEmail));
  }

  function updatePassword(currPassword, newPassword) {
    return reauthenticate(currPassword).then(() =>
      currentUser.updatePassword(newPassword)
    );
  }

  function reauthenticate(password) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    return currentUser.reauthenticateWithCredential(credential);
  }

  function loginWithGoogle() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    const loggedIn = auth
      .signInWithPopup(googleAuthProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.P
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
      });
    return loggedIn;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    emailAlreadyExists,
    logoutMessage,
    setLogoutMessage,
    loginWithGoogle,
    login,
    reauthenticate,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
