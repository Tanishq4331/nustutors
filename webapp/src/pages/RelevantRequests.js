import BasicTable from "../components/RequestTable/BasicTable";
import Loading from "../components/Loading/Loading";
import useRequests from "../hooks/useRequests";
import { Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Header, Segment, Icon, Button } from "semantic-ui-react";

function NotTutorPlaceholder() {
  return (
    <Segment color="blue" placeholder>
      <Header icon>
        <Icon name="address book outline" />
        You need to register as a tutor to view requests.
      </Header>
      <Link to="/register">
        {" "}
        <Button primary>Register as Tutor</Button>
      </Link>
    </Segment>
  );
}

export default function RelevantRequests() {
  const { userData } = useAuth();

  const { requests, loading } = useRequests({
    onlyShowRelevant: true,
  });

  const toDisplay = requests.map((request) => {
    return { ...request, moduleName: request.module.label };
  });

  return (
    <>
      <Loading loading={loading} />

      {userData.registeredTutor ? (
        <>
          <div className="text-center mb-5">
            <Header as="h1">Relevant Requests</Header>
          </div>

          <Container
            className="d-flex mt-4"
            style={{ minHeight: "50vh", maxHeight: "70vh", maxWidth: "900px" }}
          >
            <div className="wrap-table100">
              {toDisplay && <BasicTable data={toDisplay} />}
            </div>
          </Container>

          <Container
            className="mt-4"
            style={{ minHeight: "10vh", maxWidth: "900px" }}
          ></Container>
        </>
      ) : (
        <NotTutorPlaceholder />
      )}
    </>
  );
}
