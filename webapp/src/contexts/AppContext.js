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
  const { currentUser, setAlert, userData, setUserData } = useAuth();

  async function makeRequest(request) {
    var newDocRef = db.collection("requests").doc();
    const combinedRequest = {
      ...request,
      uid: currentUser.uid,
      rid: newDocRef.id,
      createdAt: await firebase.firestore.FieldValue.serverTimestamp(),
    };
    return newDocRef.set(combinedRequest);
  }

  async function apply(request) {
    var newDocRef = db.collection("applications").doc();
    const grade = userData.grades[request.module.value] || null;
    const combinedApplication = {
      uid: currentUser.uid,
      rid: request.rid,
      aid: newDocRef.id,
      createdAt: await firebase.firestore.FieldValue.serverTimestamp(),
    };
    setUserData((prev) => {
      const newApplications = [...prev.applications, request.rid];
      return { ...prev, applications: newApplications };
    });
    return newDocRef.set(combinedApplication);
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

  // async function getRequest(requestId) {
  //   db.doc("/requests/{requestId}")
  //     .get()
  //     .then((doc) => {
  //       if (!doc.exists) {
  //         setAlert("The request does not exist");
  //       }
  //     });
  // }

  const value = {
    makeRequest,
    getAllRequests,
    apply,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
