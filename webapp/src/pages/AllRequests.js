import BasicTable from "../components/RequestTable/BasicTable";
import Loading from "../components/Loading/Loading";
import useRequests from "../hooks/useRequests";
import { Header } from "semantic-ui-react";
import { Container } from "react-bootstrap";

export default function AllRequests() {
  const { requests, loading } = useRequests({
    // limit: 9,
    // rate: userData.rate,
    // moduleOptions: userData.modules.map((x) => x.value),
  });

  const toDisplay = requests.map((request) => {
    return { ...request, module: request.module.label };
  });

  return (
    <>
      <Loading loading={loading} />

      <div className="text-center mb-5">
        <Header as="h1">All Requests</Header>
      </div>

      <Container
        className="d-flex mt-4 container-table100"
        style={{ minHeight: "50vh", maxWidth: "900px" }}
      >
        <div className="wrap-table100">
          {toDisplay && <BasicTable data={toDisplay} />}
        </div>
      </Container>
    </>
  );
}
