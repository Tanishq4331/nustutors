
import { motion, AnimatePresence } from "framer-motion";
import useApplications from "../../../hooks/useApplications";
import styled from "styled-components";
import { ApplicationCard } from "./ApplicationCard";
import { Header, Segment, Placeholder, Icon } from "semantic-ui-react";

const LIMIT = 8;

const ApplicationContainer = styled.div`
  width: 100%;
  padding: 20px;

  /* scroll stuff */
  max-height: 30vh;
  box-sizing: border-box;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

function NoApplicationsPlaceholder() {
  return (
    <>
      <Header icon>
        <Icon name="search" />
        You do not have any applications yet.
      </Header>
    </>
  );
}

export default function TutorApplications() {
  const { applications, loading } = useApplications({ limit: LIMIT });

  return (
    <Segment color="blue" placeholder={!applications.length}>
      {applications.length !== 0 ? (
        <div>
          <div className="ml-2 mt-2">
            <Header as="h2">Applications</Header>
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
                {applications.map((application, index) => (
                  <motion.div
                    layout
                    key={application.applicationId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ApplicationCard application={application} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </ApplicationContainer>
          )}
        </div>
      ) : (
        <NoApplicationsPlaceholder />
      )}
    </Segment>
  );
}
