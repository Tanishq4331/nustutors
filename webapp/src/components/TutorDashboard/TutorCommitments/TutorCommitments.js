import useTutorCommitments from "../../../hooks/useCommitments";
import { Segment, Header, Placeholder } from "semantic-ui-react";
import { ApplicationContainer } from "../SubmittedApplications/SubmittedApplications";
import { AnimatePresence, motion } from "framer-motion";
import { TutorCommitmentCard } from "./TutorCommitmentCard";
import { Icon } from "@material-ui/core";
import { useEffect } from "react";
import useCommitments from "../../../hooks/useCommitments";

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

export default function TutorCommitments() {
  const { commitments, loading } = useCommitments("tutor");

  return (
    <Segment color="blue" placeholder={!commitments.length}>
      {commitments.length !== 0 ? (
        <div>
          <div className="ml-2 mt-2">
            <Header as="h2">Tutor Commitments</Header>
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
                {commitments.map((commitment, index) => (
                  <motion.div
                    layout
                    key={commitment.applicationId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <TutorCommitmentCard tutorCommitment={commitment} />
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
