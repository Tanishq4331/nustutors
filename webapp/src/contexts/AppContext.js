import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { db, storage } from "../config/firebase";
import { useAuth } from "./AuthContext";
import firebase from "firebase";

const AppContext = React.createContext();

export function useData() {
  return useContext(AppContext);
}

export function alreadyAppliedTo(request) {
  return useContext(AppContext);
}

export function deleteRequest(request) {
  return db
    .collection("requests")
    .doc(request.requestId)
    .delete()
    .catch((error) => {
      console.log("Error removing document: ", error);
    });
}

export function deleteApplication(application) {
  return db
    .collection("applications")
    .doc(application.applicationId)
    .delete()
    .catch((error) => {
      console.log("Error removing document: ", error);
    });
}

export function DataProvider({ children }) {
  const { currentUser, setAlert, userData, setUserData } = useAuth();

  async function makeRequest(request) {
    var newDocRef = db.collection("requests").doc();
    const combinedRequest = {
      ...request,
      tuteeId: currentUser.uid,
      requestId: newDocRef.id,
      createdAt: await firebase.firestore.FieldValue.serverTimestamp(),
    };
    return newDocRef.set(combinedRequest);
  }

  async function apply(request) {
    var newDocRef = db.collection("applications").doc();
    const grade = userData.grades[request.module.value] || null;
    const combinedApplication = {
      tutorId: currentUser.uid,
      requestId: request.requestId,
      applicationId: newDocRef.id,
      createdAt: await firebase.firestore.FieldValue.serverTimestamp(),
    };
    setUserData((prev) => {
      const newApplications = [...prev.applications, request.requestId];
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

  const value = {
    makeRequest,
    getAllRequests,
    apply,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
