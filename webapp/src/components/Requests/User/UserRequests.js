import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Applications from "./Applications";
import { Container } from "react-bootstrap";
import { Paper } from "@material-ui/core";
import { Segment, Header, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const MAX_REQUESTS = 12;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

function MyPlaceholder() {
  return (
    <Segment color="blue" placeholder>
      <Header icon>
        <Icon name="book" />
        You have not made a request yet.
      </Header>
      <Link to="/request-tutor">
        {" "}
        <Button primary>Make a Request</Button>
      </Link>
    </Segment>
  );
}

export default function UserRequests() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
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

  return userRequests.length !== 0 ? (
    <Paper elevation={2}>
      <Container className={"p-3"}>
        <h2>Your requests</h2>
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
              <Applications request={request} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </Paper>
  ) : (
    <MyPlaceholder />
  );
}
