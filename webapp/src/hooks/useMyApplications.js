import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { readIds } from "./useRequests";

export default function useMyApplications({ limit }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, userData } = useAuth();
  const LIMIT = limit ? limit : Infinity;

  //retrieve user details from the tuteeId of each request and add them to the request
  const addRequesterData = async (rawApplications, requestIds) => {
    const requestDetails = await readIds(db.collection("requests"), requestIds);

    //add to each request the details of its corresponding user
    const expandedApplications = rawApplications.map(
      (rawApplication, index) => {
        return { ...rawApplication, request: requestDetails[index] };
      }
    );
    setApplications(expandedApplications);
    setLoading(false);
  };

  var query = db.collection("requests");

  useEffect(() => {
    return query.onSnapshot((snapshot) => {
      var rawApplications = snapshot.docs.map((doc) => doc.data());

      const requestIds = rawApplications.map(
        (application) => application.requestId
      );

      addRequesterData(rawApplications, requestIds);
    });
  }, []);

  return { applications, loading };
}
