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

  function uploadDocuments(documents, uid) {
    // Create a storage reference from our storage service
    const userRef = storage.ref().child(`${uid}`);

    try {
      documents.forEach((doc) => {
        const docRef = userRef.child(doc.name);
        //upload doc to ref
        docRef.put(doc);
      });
    } catch (error) {
      console.log(`${error.code}: ${error.message}`);
    }
  }

  //adds additional tutor attributes to user object in firestore;
  function registerTutor(tutorFormState) {
    const { documents, ...data } = tutorFormState;
    const uid = currentUser.uid;
    setUserData({ ...userData, registeredTutor: true, data });
    uploadDocuments(documents, uid);
  }

  async function makeRequest(request) {
    const combinedRequest = { ...request, by: currentUser.uid };
    return db
      .collection("requests")
      .add(combinedRequest)
  }

  async function registerUser(userFormState, tutorFormState = null) {
    const { password, passwordConfirm, ...userData } = userFormState;
    let uid;
    let combinedData = userData;

    //if user is already authenticated through google, do not sign up
    if (currentUser) {
      uid = currentUser.uid;
    } else {
      await signup(userFormState.email, password).then((response) => {
        uid = response.user.uid;
      });
    }

    //both user and tutor registration
    if (tutorFormState) {
      const { documents, ...tutorData } = tutorFormState;
      uploadDocuments(documents, uid);
      combinedData = { ...userData, registeredTutor: true, ...tutorData };
    }
    await db.collection("users").doc(uid).set(combinedData);
    return setUserData(combinedData);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut().then(() => {
      setCurrentUser(null);
      history.push("/login");
    });
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

    const loggedIn = auth.signInWithPopup(googleAuthProvider).then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.P
      var user = result.user;
      // signedin = firebase.auth().currentUser != null;
      // ...
    });

    return loggedIn;
  }

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

  //subscribe to changes in database - does not detect changes in attributes
  // useEffect(() => {
  //   if (currentUser && userData) {
  //     const unsubscribe = db
  //       .collection("users")
  //       .doc(currentUser.uid)
  //       .onSnapshot((snapshot) => setUserData(snapshot.data()));
  //     return unsubscribe;
  //   }
  // }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      //load/unload user data
      if (user) {
        //user logged in
        await db
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            const data = doc.data();
            if (doc.exists) {
              setUserData({
                ...data,
                timings: data.timings.map((x) => x.toDate()), //convert firebase date to js date object
              });
            }
            setCurrentUser(user);
          })
          .catch((error) => {
            console.log(`${error.code}: ${error.message}`);
            setAlert({ message: "Could not contact server", success: false });
          });
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
    makeRequest,
    registerUser,
    uploadDocuments,
    registerTutor,
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
