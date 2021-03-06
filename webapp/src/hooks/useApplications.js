import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { readIds } from "./useRequests";

export default function useApplications({ limit }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const LIMIT = limit ? limit : Infinity;

  //retrieve user details from the tuteeId of each request and add them to the request
  const addRequesterData = async (rawApplications, requestIds) => {
    var requestDetails = await readIds(db.collection("requests"), requestIds);

    const tuteeIds = requestDetails.map((request) => request.tuteeId);

    //add to each request the data of its corresponding tutee
    const tuteeDetails = await readIds(db.collection("users"), tuteeIds);
    requestDetails = requestDetails.map((request, index) => {
      return { ...request, user: tuteeDetails[index] };
    });

    //add to each application the details of its corresponding request
    const expandedApplications = rawApplications.map(
      (rawApplication, index) => {
        return {
          ...rawApplication,
          request: requestDetails[index],
        };
      }
    );
    
    setApplications(expandedApplications);
    setLoading(false);
  };

  useEffect(() => {
    return db
      .collection("applications")
      .where("tutorId", "==", currentUser.uid)
      .onSnapshot((snapshot) => {
        var rawApplications = snapshot.docs.map((doc) => doc.data());

        const requestIds = rawApplications.map(
          (application) => application.requestId
        );

        addRequesterData(rawApplications, requestIds);
      });
  }, []);

  return { applications, loading };
}
