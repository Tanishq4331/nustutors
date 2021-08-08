import React, { useContext } from "react";
import { db } from "../config/firebase";
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

  function acceptApplication(request, application) {
    return db.collection("requests")
      .doc(request.requestId)
      .update({ acceptedApplication: application.applicationId, tutorId: application.tutorId });
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

  const value = {
    makeRequest,
    deleteApplication,
    acceptApplication,
    deleteRequest,
    apply,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
