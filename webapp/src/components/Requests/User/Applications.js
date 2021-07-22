import { readIds } from "../../../contexts/AppContext";
import { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core";
import { Row, Col, Container } from "react-bootstrap";
import moment from "moment";
import { db } from "../../../config/firebase";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Application from "./Application";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Applications({ request }) {
  const classes = useStyles();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const startDate = moment(request.startDate).format("MMMM Do");

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
    <Accordion square>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>
          <h4> {request.module.label} </h4>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="w-100">
          <Container className="mb-5">
            <Row>
              <Col>
                <strong> Start Date </strong>
                <div>{startDate}</div>
              </Col>
              <Col>
                <strong> Rate </strong>
                <div>${request.rate} / hour</div>
              </Col>
              <Col>
                <strong> Duration </strong>
                <div>{request.duration} months</div>
              </Col>
            </Row>
          </Container>
          <List animated selection verticalAlign="middle">
            <h4>Applications</h4>
            {applications.map((application) => {
              return (
                <Application key={application.aid} application={application} />
              );
            })}
            {!applications.length && (
              <List.Description>No applications yet</List.Description>
            )}
          </List>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}