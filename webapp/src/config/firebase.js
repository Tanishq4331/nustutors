import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
export const app = firebase.initializeApp({
  apiKey: "AIzaSyD-9sbPOkdWul7uTNiOQ_YrBGE6I3K2C-w",
  authDomain: "nus-tutors.firebaseapp.com",
  projectId: "nus-tutors",
  storageBucket: "nus-tutors.appspot.com",
  messagingSenderId: "242389888099",
  appId: "1:242389888099:web:a8026bb830244224e09c56",
});

export const auth = app.auth();
export default app;
