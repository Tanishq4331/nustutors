import { Header, Segment, Placeholder, Icon, Button } from "semantic-ui-react";
import { useAuth } from "../../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import TutorRequestCard from "./TutorRequestCard";
import useRequests from "../../../hooks/useRequests";
import { Link } from "react-router-dom";

const MAX_REQUESTS = 9;

function NoRequestsPlaceholder() {
  return (
    <>
      <Header icon>
        <Icon name="search" />
        No relevant requests found.
      </Header>
      <Link to="/all-requests">
        {" "}
        <Button primary>View All Requests</Button>
      </Link>
    </>
  );
}

function ViewAllFooter() {
  return (
    <div className="ui vertical footer segment form-page mb-3 mr-3">
      <span style={{ float: "right" }}>
        {" "}
        <Link to="/relevant-requests">View More...</Link>
      </span>
    </div>
  );
}

export default function TutorRequests() {
  const { currentUser, userData, setUserData, setAlert } = useAuth();
  const { blacklist, applications } = userData;

  const { requests, loading } = useRequests({
    onlyShowRelevant: true,
  });

  function addToBlacklist(request) {
    setUserData((prev) => {
      const newBlacklist = [...prev.blacklist, request.requestId];
      return { ...prev, blacklist: newBlacklist };
    });
  }

  //exclude any requests that have been applied to or blacklisted
  const filteredList = requests.filter(
    (request) =>
      !blacklist.includes(request.requestId) &&
      !applications.includes(request.requestId)
  );

  return (
    <Segment color="blue" placeholder={!filteredList.length}>
      {filteredList.length !== 0 ? (
        <div>
          <div className="ml-2 mt-2">
            <Header as="h2">Relevant requests</Header>
          </div>
          <hr className="mb-4"></hr>

          {loading ? (
            <Placeholder>
              <Placeholder.Image rectangular />
            </Placeholder>
          ) : (
            <div
              style={{
                display: "inline-block",
                marginLeft: "5px",
              }}
            >
              <AnimatePresence>
                {/* limit items to MAX_REQUESTS */}
                {filteredList.slice(0, MAX_REQUESTS).map((request) => {
                  return (
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
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {/* if there are more than MAX_REQUESTS show link to relevant-requests route */}
          {filteredList.length >= MAX_REQUESTS && <ViewAllFooter />}
        </div>
      ) : (
        <NoRequestsPlaceholder />
      )}
    </Segment>
  );
}
