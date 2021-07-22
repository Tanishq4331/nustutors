import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";

export async function readIds(collection, ids) {
  const reads = ids.map((id) => collection.doc(id).get());
  const result = await Promise.all(reads);
  return result.map((v) => v.data());
}

export default function useRequests({
  // startDate,
  // modules,
  rate,
  // duration,
  // locations,
  // availableForOnline,
  // timings,
  moduleOptions,
  limit,
  exclusions,
}) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, userData } = useAuth();
  const LIMIT = limit ? limit : Infinity;

  //retrieve user details from the uid of each request and add them to the request
  const addRequesterData = async (rawRequests, uids) => {
    const userDetails = await readIds(db.collection("users"), uids);

    //add to each request the details of its corresponding user
    const expandedRequests = rawRequests.map((rawRequest, index) => {
      return { ...rawRequest, user: userDetails[index] };
    });

    setRequests(expandedRequests);
    setLoading(false);
  };

  //Excluding requests in exlclusion list
  useEffect(() => {
    var query = db.collection("requests").where("rid", "not-in", exclusions);

    const unsubscribe = query.onSnapshot((snapshot) => {
      var rawRequests = snapshot.docs.map((doc) => doc.data());

      //exlude requests by tutor
      rawRequests = rawRequests.filter(
        (request) => request.uid != currentUser.uid
      );

      //show requests offering more than rate
      if (rate) {
        rawRequests = rawRequests.filter((request) => request.rate >= rate);
      }

      //only show requests for moduleOptions
      if (moduleOptions) {
        rawRequests = rawRequests.filter((request) =>
          moduleOptions.includes(request.module)
        );
      }

      //limit result to LENGTH
      rawRequests.length = Math.min(rawRequests.length, LIMIT);

      const uids = rawRequests.map((request) => request.uid);
      addRequesterData(rawRequests, uids);
    });

    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return unsubscribe;
  }, []);

  return { requests, loading };
}
