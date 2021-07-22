import { Header, List, Image } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { db } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import { readIds } from "../../contexts/AppContext";
import styled from "styled-components";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const MAX_REQUESTS = 12;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Verified Grade
  </Tooltip>
);

function Applications({ request }) {
  const classes = useStyles();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  //retrieve user details from the uid of each request and add them to the request
  async function addApplicantData(rawApplications, uids, rids) {
    const promise1 = await readIds(db.collection("users"), uids);
    const promise2 = await readIds(db.collection("requests"), rids);
    const promises = [promise1, promise2];
    const [userDetails, requestDetails] = await Promise.all(promises);

    //add to each request the details of its corresponding user
    const expandedRequests = rawApplications.map((rawRequest, index) => {
      return {
        ...rawRequest,
        user: userDetails[index],
        request: requestDetails[index],
      };
    });

    setApplications(expandedRequests);
    setLoading(false);
  }

  useEffect(() => {
    console.log(request.rid);
    const unsubscribe = db
      .collection("applications")
      .where("rid", "==", request.rid)
      .onSnapshot((snapshot) => {
        const rawApplications = snapshot.docs.map((doc) => doc.data());
        const uids = rawApplications.map((request) => request.uid);
        const rids = rawApplications.map((request) => request.rid);
        addApplicantData(rawApplications, uids, rids);
      });

    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return unsubscribe;
  }, []);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>
          {request.module.label}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="w-100">
          <List animated selection verticalAlign="middle">
            {applications.map((application) => {
              //exclude any requests whose rid is in blacklist
              return (
                <List.Item key={application.aid}>
                  {application.user.url && <Image avatar src={application.user.url} />}
                  <List.Content>
                    <List.Header>{application.user.name}</List.Header>
                  </List.Content>
                  <List.Content floated="right">
                    <OverlayTrigger
                      placement="left"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                    >
                      <BeenhereIcon color="inherit" />
                    </OverlayTrigger>
                    {application.user.grades[request.module.value]}
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default function UserRequests() {
  const { currentUser, userData, setUserData, setAlert } = useAuth();
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
    <>
      <Header as="h2">Your requests</Header>
      <hr className="mb-4"></hr>
      <AnimatePresence>
        {userRequests.map((request) => {
          //exclude any requests whose rid is in blacklist
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
    </>
  );
}
