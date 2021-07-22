import { Header, Segment } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import RequestCard from "./RequestCard";
import { readIds } from "../../contexts/AppContext";

const MAX_REQUESTS = 12;

export default function Requests() {
  const { currentUser, userData, setUserData, setAlert } = useAuth();

  const [relevantRequests, setRelevantRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const blacklist = userData.blacklist;
  const applications = userData.applications;

  //retrieve user details from the uid of each request and add them to the request
  async function addRequesterData(rawRequests, uids) {
    const userDetails = await readIds(db.collection("users"), uids);

    //add to each request the details of its corresponding user
    const expandedRequests = rawRequests.map((rawRequest, index) => {
      return { ...rawRequest, user: userDetails[index] };
    });

    setRelevantRequests(expandedRequests);
    setLoading(false);
  }

  //Retrieve relevant requests (for now all requests) excluding those by user
  useEffect(() => {
    const unsubscribe = db
      .collection("requests")
      .where("uid", "!=", currentUser.uid)
      .limit(MAX_REQUESTS)
      .onSnapshot((snapshot) => {
        const rawRequests = snapshot.docs.map((doc) => doc.data());
        const uids = rawRequests.map((request) => request.uid);
        addRequesterData(rawRequests, uids);
      });

    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return unsubscribe;
  }, []);

  function addToBlacklist(request) {
    setUserData((prev) => {
      const newBlacklist = [...prev.blacklist, request.rid];
      return { ...prev, blacklist: newBlacklist };
    });
  }

  return (
    <>
      <Segment color="blue" loading={loading} secondary padded>
        <Header as="h2">Relevant requests</Header>
        <hr className="mb-4"></hr>

        <div
          style={{
            display: "inline-block",
            marginLeft: "5px",
          }}
        >
          <AnimatePresence>
            {relevantRequests.map((request) => {
              //exclude any requests that have been applied to or blacklisted
              return (
                !blacklist.includes(request.rid) &&
                !applications.includes(request.rid) && (
                  <motion.div
                    layout
                    style={{
                      display: "inline-block",
                    }}
                    key={request.rid}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <RequestCard
                      request={request}
                      addToBlacklist={addToBlacklist}
                    />
                  </motion.div>
                )
              );
            })}
          </AnimatePresence>
        </div>
      </Segment>
    </>
  );
}
