import { Segment, Header, Placeholder } from "semantic-ui-react";
import { ApplicationContainer } from "../../TutorDashboard/SubmittedApplications/SubmittedApplications";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@material-ui/core";
import useCommitments from "../../../hooks/useCommitments";
import { TuteeCommitmentCard } from "./TuteeCommitmentCard";

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
  const { commitments, loading } = useCommitments("tutee");

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
                {commitments.map((commitment, index) => (
                  <motion.div
                    layout
                    key={commitment.applicationId}
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
