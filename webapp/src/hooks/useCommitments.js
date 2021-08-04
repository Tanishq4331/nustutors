import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { readIds } from "./useRequests";

export default function useCommitments(type) {
  const [commitments, setCommitments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, userData } = useAuth();

  //retrieve user details from the tuteeId of each request and add them to the request
  const addRequesterData = async (rawCommitments) => {
    const requestIds = rawCommitments.map((commitment) => commitment.requestId);
    var requestDetails = await readIds(db.collection("requests"), requestIds);

    var userIds = rawCommitments.map((commitment) => commitment.tutorId);
    if (type === "tutor") {
      userIds = rawCommitments.map((commitment) => commitment.tuteeId);
    }
    const userDetails = await readIds(db.collection("users"), userIds);

    //add to each commitment the details of its corresponding request and other user
    const expandedCommitments = rawCommitments.map((rawCommitment, index) => {
      return {
        ...rawCommitment,
        request: requestDetails[index],
        user: userDetails[index],
      };
    });

    setCommitments(expandedCommitments);
    setLoading(false);
  };

  useEffect(() => {
    var query = db.collection("commitments");

    if (type === "tutor") {
      query = query.where("tutorId", "==", currentUser.uid);
    } else {
      query = query.where("tuteeId", "==", currentUser.uid);
    }

    query.onSnapshot((snapshot) => {
      var rawCommitments = snapshot.docs.map((doc) => doc.data());

      addRequesterData(rawCommitments);
    });
  }, []);

  return { commitments: commitments, loading };
}
