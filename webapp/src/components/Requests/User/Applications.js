import { readIds } from "../../../hooks/useRequests";
import { useState, useEffect } from "react";
import { List } from "semantic-ui-react";

import { db } from "../../../config/firebase";

import Application from "./Application";

export default function Applications({ request }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  //retrieve user details from the tutorId of each request and add them to the request
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
      .where("requestId", "==", request.requestId)
      .onSnapshot((snapshot) => {
        const rawApplications = snapshot.docs.map((doc) => doc.data());
        const uids = rawApplications.map((request) => request.tutorId);
        const rids = rawApplications.map((request) => request.requestId);
        addApplicantData(rawApplications, uids, rids);
      });

    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return unsubscribe;
  }, []);

  return (
    <List animated selection verticalAlign="middle">
      <h4>Applications</h4>
      {applications.map((application) => {
        return (
          <Application
            key={application.applicationId}
            application={application}
          />
        );
      })}
      {!applications.length && (
        <List.Description>No applications yet</List.Description>
      )}
    </List>
  );
}
