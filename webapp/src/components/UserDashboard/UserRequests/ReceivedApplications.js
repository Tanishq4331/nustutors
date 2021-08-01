import { readIds } from "../../../hooks/useRequests";
import { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import { useAuth } from "../../../contexts/AuthContext";
import { db } from "../../../config/firebase";

import ReceivedApplication from "./ReceivedApplication";

export default function ReceivedApplications({ request }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useAuth();

  //retrieve user details from the tutorId of each request and add them to the request
  async function addApplicantData(rawApplications, tutorIds) {
    const tutorDetails = await readIds(db.collection("users"), tutorIds);

    //add to each request the details of its corresponding user
    const expandedApplications = rawApplications.map(
      (rawApplication, index) => {
        return {
          ...rawApplication,
          user: tutorDetails[index],
          request: request,
        };
      }
    );

    setApplications(expandedApplications);
    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = db
      .collection("applications")
      .where("requestId", "==", request.requestId)
      .onSnapshot((snapshot) => {
        var rawApplications = snapshot.docs.map((doc) => doc.data());
        rawApplications = rawApplications.filter((application) => {
          return !userData.rejectedApplications.includes(
            application.applicationId
          );
        });
        const tutorIds = rawApplications.map((request) => request.tutorId);
        addApplicantData(rawApplications, tutorIds);
      });

    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return unsubscribe;
  }, [userData]);

  return (
    <List animated selection verticalAlign="middle">
      <h4>Applications</h4>
      {applications.map((application) => {
        return (
          <ReceivedApplication
            key={application.applicationId}
            application={application}
            request={request}
          />
        );
      })}
      {!applications.length && (
        <List.Description>No applications yet</List.Description>
      )}
    </List>
  );
}
