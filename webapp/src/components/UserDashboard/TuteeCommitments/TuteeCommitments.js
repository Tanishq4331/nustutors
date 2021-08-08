import { Segment, Header, Placeholder } from "semantic-ui-react";
import { ApplicationContainer } from "../../TutorDashboard/SubmittedApplications/SubmittedApplications";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@material-ui/core";
import { useState, useEffect } from "react";
import { TuteeCommitmentCard } from "./TuteeCommitmentCard";
import { readIds } from "../../../hooks/useRequests";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../contexts/AuthContext";

function NoCommitmentsPlaceholder() {
  return (
    <>
      <Header icon>
        <Icon name="search" />
        You do not have any commitments yet.
      </Header>
    </>
  );
}

export default function TuteeCommitments() {
  const [commitments, setCommitments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const updateCommitments = async (rawRequests) => {
    const tutorIds = rawRequests.map((request) => request.tutorId);
    const tutorDetails = await readIds(db.collection("users"), tutorIds);

    const newCommitments = rawRequests.map((request, index) => {
      return { request: rawRequests[index], user: tutorDetails[index] };
    });
    console.log(newCommitments)

    setCommitments(newCommitments);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = db
      .collection("requests")
      .where("tuteeId", "==", currentUser.uid)
      .onSnapshot((snapshot) => {
        // setLoading(true);
        var rawRequests = snapshot.docs.map((doc) => doc.data());

        //only show accepted requests
        rawRequests = rawRequests.filter(
          (request) => request.acceptedApplication
        );

        updateCommitments(rawRequests);
      });

    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return unsubscribe;
  }, []);

  return (
    <Segment color="blue" placeholder={!commitments.length}>
      {commitments.length !== 0 ? (
        <div>
          <div className="ml-2 mt-2">
            <Header as="h2">Your Commitments</Header>
          </div>
          <hr />

          {loading ? (
            <Placeholder>
              <Placeholder.Image rectangular />
            </Placeholder>
          ) : (
            <ApplicationContainer>
              <AnimatePresence>
                {/* limit items to MAX_REQUESTS */}
                {commitments.map((commitment) => (
                  <motion.div
                    layout
                    key={commitment.request.acceptedApplication}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <TuteeCommitmentCard userCommitment={commitment} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </ApplicationContainer>
          )}
        </div>
      ) : (
        <NoCommitmentsPlaceholder />
      )}
    </Segment>
  );
}
