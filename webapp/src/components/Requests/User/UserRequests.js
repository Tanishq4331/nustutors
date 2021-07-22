import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Applications from "./Applications";
import { Container } from "react-bootstrap";
import { Paper } from "@material-ui/core";

const MAX_REQUESTS = 12;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

export default function UserRequests() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userRequests, setUserRequests] = useState([]);
  const classes = useStyles();

  //Add any requests by the user
  useEffect(() => {
    const unsubscribe = db
      .collection("requests")
      .where("uid", "==", currentUser.uid)
      .limit(MAX_REQUESTS)
      .onSnapshot((snapshot) => {
        setUserRequests(snapshot.docs.map((doc) => doc.data()));
        setLoading(false);
      });

    return unsubscribe;
  }, []);

  return (
    <Paper elevation={2}>
      <Container className={"p-3"}>
        <h2>Your requests</h2>
      </Container>
      <AnimatePresence>
        {userRequests.map((request) => {
          return (
            <motion.div
              layout
              key={request.rid}
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
  );
}
