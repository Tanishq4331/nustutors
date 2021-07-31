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

  function deleteApplication(application) {
    return db
      .collection("applications")
      .doc(application.applicationId)
      .delete()
      .then(() => {
        setAlert({
          message: "Application successfully deleted.",
          success: true,
        });
      })
      .catch((error) => {
        setAlert({ message: "Unable to delete application.", success: false });
        console.log(`${error.code}: ${error.message}`);
      });
  }

  function rejectAppication(request, application) {
    return db
      .collection("request")
      .doc(request.requestId)
      .update({
        rejectedAppications: firebase.firestore.FieldValue.arrayAdd(
          application.applicationId
        ),
      })
      .catch((error) => {
        setAlert({ message: "Unable to reject application.", success: false });
        console.log(`${error.code}: ${error.message}`);
      });
  }

  function deleteRequest(request) {
    return db
      .collection("requests")
      .doc(request.requestId)
      .delete()
      .then(() => {
        setAlert({
          message: "Request successfully deleted.",
          success: true,
        });
      })
      .catch((error) => {
        setAlert({ message: "Unable to delete request.", success: false });
        console.log(`${error.code}: ${error.message}`);
      });
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
    //add requestId of application to user's applications
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
    deleteApplication,
    deleteRequest,
    apply,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
