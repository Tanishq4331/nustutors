import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "react-bootstrap";
import { Paper } from "@material-ui/core";
import { Segment, Header, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RequestTutorModal } from "../../RequestTutor/RequestTutorModal";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";
import RequestAccordion from "./RequestAccordion";
import Loading from "../../Loading/Loading";

//consider limiting a user's concurrent requests
const MAX_REQUESTS = 12;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

function MyPlaceholder({ setOpen }) {
  return (
    <Segment color="blue" placeholder>
      <Header icon>
        <Icon name="book" />
        You have not made a request yet.
      </Header>
      <Button color="green" onClick={() => setOpen(true)}>
        Request a Tutor
      </Button>
    </Segment>
  );
}

export default function UserRequests() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [userRequests, setUserRequests] = useState([]);
  const classes = useStyles();

  //Add any requests by the user
  useEffect(() => {
    const unsubscribe = db
      .collection("requests")
      .where("tuteeId", "==", currentUser.uid)
      .limit(MAX_REQUESTS)
      .onSnapshot((snapshot) => {
        setUserRequests(snapshot.docs.map((doc) => doc.data()));
        setLoading(false);
      });

    return unsubscribe;
  }, []);

  return (
    <>
      <RequestTutorModal open={open} setOpen={setOpen} />{" "}
      {/* <Loading loading={loading} /> */}
      {userRequests.length !== 0 ? (
        <Paper >
          <Container
            className={"d-flex p-3 justify-content-between align-items-center"}
          >
            <div>
              <h2>Your requests</h2>
            </div>
            <IconButton onClick={() => setOpen(true)}>
              <AddIcon />
            </IconButton>
          </Container>
          <AnimatePresence>
            {userRequests.map((request) => {
              return (
                <motion.div
                  layout
                  key={request.requestId}
                  className={classes.root}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <RequestAccordion request={request} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </Paper>
      ) : (
        <MyPlaceholder setOpen={setOpen} />
      )}
    </>
  );
}
