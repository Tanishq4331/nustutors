import React, { useContext, useState, useEffect } from "react";
import { auth, db, storage } from "../config/firebase";
import { firebase } from "@firebase/app";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export async function emailAlreadyExists(email) {
  const snapshot = await db
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();
  return !snapshot.empty;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [alert, setAlert] = useState({
    message: "",
    success: true,
  });

  //   useEffect(() => {
  //     const unsubscribe = db.collection("requests").onSnapshot(snapshot => {
  //       const requests = snapshot.docs.map(doc => doc.data())
  //       //requests filtered based on relevance to user
  //       this.setRelevantRequests(requests)
  //     });

  //     //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
  //     return () => unsubscribe()
  // }, []);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function register(formState) {
    const { password, passwordConfirm, ...data } = formState;
    return signup(formState.email, formState.password).then((response) => {
      db.collection("users").doc(response.user.uid).set(data);
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
    return reauthenticate(password).then(() => {
      currentUser.updateEmail(newEmail);
      setUserData({ ...userData, email: newEmail });
    });
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
        setAlert({ message: "Unable to login", success: false });
        console.log(`${error.code}: ${error.message}`);
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

    return loggedIn;
  }

  //display any alert for 5 seconds
  useEffect(() => {
    let timer1 = setTimeout(
      () => setAlert({ message: "", successs: true }),
      5000
    );

    // this will clear Timeout once component unmounts
    return () => {
      clearTimeout(timer1);
    };
  }, [alert]);

  //if there is a change in user data update the database
  useEffect(() => {
    if (currentUser && userData) {
      const unsubscribe = db
        .collection("users")
        .doc(currentUser.uid)
        .set(userData);
      return unsubscribe;
    }
  }, [userData]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("logging in");

      //load/unload user data
      if (user) {
        //user logged in
        await db
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            //user isn't registered yet
            if (!doc.exists) {
              console.log("docs not found");
              history.push("/continue-registration");
            } else {
              setUserData(doc.data());
            }
          })
          .catch((error) => {
            console.log(`${error.code}: ${error.message}`);
            setAlert({ message: "Could not contact server", success: false });
          });
        setCurrentUser(user);
      } else {
        setCurrentUser(user);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    emailAlreadyExists,
    setUserData,
    alert,
    setAlert,
    loginWithGoogle,
    login,
    userData,
    register,
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
