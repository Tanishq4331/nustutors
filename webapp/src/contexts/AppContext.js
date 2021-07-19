import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { db, storage } from "../config/firebase";
import { useAuth } from "./AuthContext";
import firebase from "firebase";

const AppContext = React.createContext();

export function useData() {
  return useContext(AppContext);
}

export function DataProvider({ children }) {
  const { currentUser, setAlert, userData } = useAuth();

  async function makeRequest(request) {
    var newDocRef = db.collection('requests').doc();
    const combinedRequest = {
      ...request,
      uid: currentUser.uid,
      rid: newDocRef.id,
      name: userData.name,
      url: userData.url,
      createdAt: await firebase.firestore.FieldValue.serverTimestamp(),
      schedule: userData.timings,
    };
    return newDocRef.set(combinedRequest);
  }

  async function getAllRequests() {
    return db
      .collection("requests")
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        let requests = [];
        data.forEach((doc) => {
          requests.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      })
      .catch((error) => {
        console.log(`${error.code}: ${error.message}`);
        setAlert({ message: "Could not contact server", success: false });
      });
  }

  async function getRequest(requestId) {
    db.doc("/requests/{requestId}")
      .get()
      .then((doc) => {
        if (!doc.exists) {
          setAlert("The request does not exist");
        }
      });
  }

  const value = {
    makeRequest,
    getAllRequests,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
