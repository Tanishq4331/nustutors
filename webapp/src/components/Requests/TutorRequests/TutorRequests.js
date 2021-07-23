import { Header, Segment } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import TutorRequestCard from "./TutorRequestCard";
import useRequests from "../../../hooks/useRequests";

const MAX_REQUESTS = 12;

export default function TutorRequests() {
  const { currentUser, userData, setUserData, setAlert } = useAuth();
  const { blacklist, applications } = userData;

  const { requests, loading } = useRequests({
    limit: 9,
    exclusions: [...blacklist, ...applications],
    // rate: userData.rate,
    // moduleOptions: userData.modules.map((x) => x.value),
  });

  function addToBlacklist(request) {
    setUserData((prev) => {
      const newBlacklist = [...prev.blacklist, request.requestId];
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
            {requests.map((request) => {
              //exclude any requests that have been applied to or blacklisted
              return (
                !blacklist.includes(request.requestId) &&
                !applications.includes(request.requestId) && (
                  <motion.div
                    layout
                    style={{
                      display: "inline-block",
                    }}
                    key={request.requestId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <TutorRequestCard
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
