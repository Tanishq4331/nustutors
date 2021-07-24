import { useState, useEffect } from "react";
import { readIds } from "../hooks/useRequests";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";

const REQUESTS_PER_PAGE = 12;

export default function AllRequests() {
  const [setAllRequests] = useState([]);
  const [setLoading] = useState([]);
  const { currentUser } = useAuth();

  //retrieve user details from the tuteeId of each request and add them to the request
  async function addRequesterData(rawRequests, uids) {
    const userDetails = await readIds(db.collection("users"), uids);

    //add to each request the details of its corresponding user
    const expandedRequests = rawRequests.map((rawRequest, index) => {
      return { ...rawRequest, user: userDetails[index] };
    });

    setAllRequests(expandedRequests);
    setLoading(false);
  }

  //Retrieve relevant requests (for now all requests) excluding those by user
  useEffect(() => {
    const unsubscribe = db
      .collection("requests")
      .where("tuteeId", "!=", currentUser.uid)
      .limit(REQUESTS_PER_PAGE)
      .onSnapshot((snapshot) => {
        const rawRequests = snapshot.docs.map((doc) => doc.data());
        const uids = rawRequests.map((request) => request.tuteeId);
        addRequesterData(rawRequests, uids);
      });
    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return unsubscribe;
  }, []);

  return <div style={{ maxWidth: "100%" }}></div>;
}
