import { Header, Segment } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import RequestCard from "./RequestCard";

const MAX_REQUESTS = 12;

export default function Requests() {
  const { currentUser, userData, setUserData } = useAuth();
  const [allRequests, setAllRequests] = useState([]);
  const [relevantRequests, setRelevantRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myRequests, setMyRequests] = useState([]);

  const blacklist = userData.blacklist;

  useEffect(() => {
    const unsubscribe = db
      .collection("requests")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const requests = snapshot.docs.map((doc) => doc.data());

        //exclude any requests from the tutore 
        const relevantRequests = requests.filter(
          (req) => req.uid !== currentUser.uid
        );

        const myRequests = requests.filter(
          (req) => req.uid === currentUser.uid
        );

        //limit relevant requests to MAX_REQUESTS
        relevantRequests.length = Math.min(
          relevantRequests.length,
          MAX_REQUESTS
        );

        //limit myRequests to MAX_REQUESTS
        myRequests.length = Math.min(myRequests.length, MAX_REQUESTS);

        setAllRequests(requests);
        setRelevantRequests(relevantRequests);
        setMyRequests(myRequests);
        setLoading(false);
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
              //exclude any requests whose rid is in blacklist
              return (
                !blacklist.includes(request.rid) && <motion.div
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
              );
            })}
          </AnimatePresence>
        </div>
      </Segment>
    </>
  );
}
