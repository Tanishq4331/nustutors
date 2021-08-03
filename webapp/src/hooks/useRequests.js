import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";

export async function readIds(collection, ids) {
  const reads = ids.map((id) => collection.doc(id).get());
  const result = await Promise.all(reads);
  return result.map((v) => v.data());
}

export default function useRequests({ onlyShowRelevant, limit }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, userData } = useAuth();
  const LIMIT = limit ? limit : Infinity;

  //retrieve user details from the tuteeId of each request and add them to the request
  const addRequesterData = async (rawRequests, uids) => {
    const userDetails = await readIds(db.collection("users"), uids);
    //add to each request the details of its corresponding user
    const expandedRequests = rawRequests.map((rawRequest, index) => {
      return { ...rawRequest, user: userDetails[index] };
    });
    setRequests(expandedRequests);
    setLoading(false);
  };

  const preferredMods = userData.modules.map((mod) => mod.label);

  useEffect(() => {
    const unsubscribe = db
      .collection("requests")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        var rawRequests = snapshot.docs.map((doc) => doc.data());

        //exlude requests by tutor
        rawRequests = rawRequests.filter(
          (request) => request.tuteeId !== currentUser.uid
        );

        //exclude any requests that have been applied to
        rawRequests = rawRequests.filter(
          (request) => !userData.applications.includes(request.requestId)
        );

        if (onlyShowRelevant) {
          //show requests offering more than rate
          rawRequests = rawRequests.filter(
            (request) => request.rate >= userData.rate
          );

          //only show requests for tutor's preferred mods
          rawRequests = rawRequests.filter((request) =>
            preferredMods.includes(request.module.label)
          );
        }

        const uids = rawRequests.map((request) => request.tuteeId);

        addRequesterData(rawRequests, uids);
      });

    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return unsubscribe;
  }, [userData]);

  return { requests: requests, loading };
}
